# Data Model Schema

## Entity Relationship Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KICKER DATA MODEL                                  │
└─────────────────────────────────────────────────────────────────────────────┘

USER DOMAIN                    VENUE DOMAIN                 BOOKING DOMAIN
┌──────────┐                  ┌──────────┐                 ┌──────────┐
│   User   │                  │  Venue   │                 │ Booking  │
├──────────┤                  ├──────────┤                 ├──────────┤
│ Profile  │                  │  Pitch   │                 │BookingHold│
│ Role     │                  │AvailSlot │                 │Participant│
│ AuditLog │                  │PriceRule │                 │ Payment  │
│          │                  │ Closure  │                 │ Deposit  │
└──────────┘                  └──────────┘                 │ Refund   │
     │                              │                      │CreditWallet│
     │                              │                      └──────────┘
     │                              │                           │
     ▼                              ▼                           ▼
TEAM DOMAIN                    LEAGUE DOMAIN              COMMUNICATION
┌──────────┐                  ┌──────────┐                 ┌──────────┐
│   Team   │                  │  League  │                 │Notification│
├──────────┤                  ├──────────┤                 │ShareLink │
│ Member   │                  │ Season   │                 │CalendarTkn│
│ Invite   │                  │ Division │                 └──────────┘
│AvailResp │                  │ Fixture  │
│BenchList │                  │ Result   │
│          │                  │ Dispute  │
│PlayerFind│                  │Discipline│
└──────────┘                  └──────────┘
```

---

## Schema Definition (Prisma Format)

### User & Authentication

```prisma
// User account
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  emailVerified     DateTime?
  phone             String?  @unique
  phoneVerified     DateTime?
  passwordHash      String?
  name              String
  avatar            String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  lastLoginAt       DateTime?

  // GDPR
  marketingConsent  Boolean  @default(false)
  dataExportedAt    DateTime?
  deletedAt         DateTime? // Soft delete

  // Relations
  profile           Profile?
  roles             UserRole[]
  accounts          Account[]  // OAuth accounts
  sessions          Session[]
  auditLogs         AuditLog[]
  notifications     Notification[]

  // Booking relations
  bookings          Booking[]
  bookingParticipants BookingParticipant[]
  creditWallet      CreditWallet?

  // Team relations
  teamMemberships   TeamMember[]
  teamInvitesSent   TeamInvite[] @relation("InviteSender")
  teamInvitesReceived TeamInvite[] @relation("InviteRecipient")
  availabilityResponses AvailabilityResponse[]

  // League relations
  leaguesOrganised  League[] @relation("LeagueOrganiser")
  resultsSubmitted  Result[] @relation("ResultSubmitter")
  disputesRaised    Dispute[] @relation("DisputeRaiser")
  disciplineEvents  DisciplineEvent[]

  // Venue relations
  venuesManaged     VenueStaff[]
  issuesReported    Issue[] @relation("IssueReporter")

  // Player finder
  playerFinderPosts PlayerFinderPost[]
  playerFinderAcceptances PlayerFinderAcceptance[]
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  // Player info
  skillLevel      SkillLevel @default(INTERMEDIATE)
  preferredPosition String?
  bio             String?

  // Location (for nearby searches)
  postcode        String?
  latitude        Float?
  longitude       Float?

  // Stats
  gamesPlayed     Int      @default(0)
  goalsScored     Int      @default(0)
  assists         Int      @default(0)

  // Loyalty
  bookingStreak   Int      @default(0)
  totalBookings   Int      @default(0)
  memberSince     DateTime @default(now())

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum SkillLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  SEMI_PRO
}

model UserRole {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  role      Role
  scopeType ScopeType?
  scopeId   String?   // venueId, leagueId, teamId depending on scopeType
  createdAt DateTime @default(now())

  @@unique([userId, role, scopeType, scopeId])
}

enum Role {
  PLAYER
  TEAM_CAPTAIN
  LEAGUE_ORGANISER
  VENUE_OPERATOR
  VENUE_STAFF
  PLATFORM_ADMIN
}

enum ScopeType {
  VENUE
  LEAGUE
  TEAM
}

model AuditLog {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  action      String   // e.g., "booking.created", "refund.processed"
  entityType  String   // e.g., "Booking", "User"
  entityId    String
  oldValues   Json?
  newValues   Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())

  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
}
```

### Venue Domain

```prisma
model Venue {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  description     String?

  // Address
  addressLine1    String
  addressLine2    String?
  city            String
  county          String?
  postcode        String
  country         String   @default("GB")
  latitude        Float
  longitude       Float

  // Contact
  phone           String?
  email           String?
  website         String?

  // Media
  photos          String[] // Array of URLs
  logo            String?

  // Amenities
  amenities       String[] // parking, changing_rooms, bar, cafe, spectator_area

  // Hours
  openingHours    Json     // { monday: { open: "08:00", close: "22:00" }, ... }

  // Settings
  isActive        Boolean  @default(true)
  stripeAccountId String?  // Stripe Connect account

  // Policies
  cancellationPolicy Json  // { windows: [{ hoursBeforeL 48, refundPercent: 100 }, ...] }
  creditPolicy    Json     // { validityMonths: 12, bonusPercent: 10 }
  depositPolicy   Json     // { defaultPercent: 25, rules: [...] }

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  pitches         Pitch[]
  pricingRules    PricingRule[]
  closures        Closure[]
  staff           VenueStaff[]
  bookings        Booking[]
  issues          Issue[]
  leagues         League[]
}

model Pitch {
  id              String   @id @default(cuid())
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])

  name            String   // "Pitch 1", "Main Arena"
  description     String?

  // Configuration
  size            PitchSize
  surface         Surface
  isIndoor        Boolean  @default(false)
  hasFloodlights  Boolean  @default(true)

  // Capacity
  minPlayers      Int      @default(10)
  maxPlayers      Int      @default(14)
  spectatorCapacity Int?

  // Pricing
  baseHourlyRate  Int      // In pence (e.g., 5500 = £55.00)
  slotDurationMins Int     @default(60)

  // Status
  isActive        Boolean  @default(true)
  maintenanceUntil DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  availabilitySlots AvailabilitySlot[]
  bookings        Booking[]
  closures        Closure[]
  issues          Issue[]
}

enum PitchSize {
  FIVE_A_SIDE
  SIX_A_SIDE
  SEVEN_A_SIDE
  ELEVEN_A_SIDE
}

enum Surface {
  GRASS
  ASTRO_3G
  ASTRO_4G
  INDOOR
  HYBRID
}

model AvailabilitySlot {
  id              String   @id @default(cuid())
  pitchId         String
  pitch           Pitch    @relation(fields: [pitchId], references: [id])

  date            DateTime @db.Date
  startTime       DateTime @db.Time
  endTime         DateTime @db.Time

  // Calculated price (with rules applied)
  price           Int      // In pence

  // Status
  status          SlotStatus @default(AVAILABLE)

  // Relations
  booking         Booking?
  hold            BookingHold?
  waitlistEntries WaitlistEntry[]

  @@unique([pitchId, date, startTime])
  @@index([date, status])
}

enum SlotStatus {
  AVAILABLE
  HELD
  BOOKED
  BLOCKED
  MAINTENANCE
}

model PricingRule {
  id              String   @id @default(cuid())
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])

  name            String   // "Peak hours", "Early bird"
  type            PricingRuleType

  // Conditions
  conditions      Json     // { dayOfWeek: [1,2,3,4,5], timeStart: "17:00", timeEnd: "21:00" }

  // Adjustment
  adjustmentType  AdjustmentType
  adjustmentValue Int      // Percentage or fixed pence amount

  // Priority (higher = applied later)
  priority        Int      @default(0)

  // Validity
  isActive        Boolean  @default(true)
  validFrom       DateTime?
  validUntil      DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum PricingRuleType {
  TIME_BASED      // Peak/off-peak hours
  DAY_BASED       // Weekend/weekday
  ADVANCE_BOOKING // Early bird / last minute
  BOOKING_TYPE    // League / corporate / casual
  PROMOTIONAL     // Promo codes, first booking
  USER_BASED      // Loyalty tiers
}

enum AdjustmentType {
  PERCENTAGE
  FIXED_AMOUNT
}

model Closure {
  id              String   @id @default(cuid())
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])
  pitchId         String?  // Null = entire venue
  pitch           Pitch?   @relation(fields: [pitchId], references: [id])

  reason          ClosureReason
  description     String?

  startDate       DateTime
  endDate         DateTime

  // Affected bookings handling
  affectedBookingsNotified Boolean @default(false)

  createdAt       DateTime @default(now())
  createdBy       String   // userId
}

enum ClosureReason {
  MAINTENANCE
  WEATHER
  PRIVATE_EVENT
  HOLIDAY
  OTHER
}

model VenueStaff {
  id              String   @id @default(cuid())
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  role            VenueStaffRole
  isActive        Boolean  @default(true)

  createdAt       DateTime @default(now())

  @@unique([venueId, userId])
}

enum VenueStaffRole {
  OWNER
  MANAGER
  STAFF
}

model Issue {
  id              String   @id @default(cuid())
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])
  pitchId         String?
  pitch           Pitch?   @relation(fields: [pitchId], references: [id])
  bookingId       String?
  booking         Booking? @relation(fields: [bookingId], references: [id])

  reportedById    String
  reportedBy      User     @relation("IssueReporter", fields: [reportedById], references: [id])

  category        IssueCategory
  severity        IssueSeverity
  description     String
  photos          String[] // URLs

  status          IssueStatus @default(OPEN)
  resolution      String?
  resolvedAt      DateTime?
  resolvedById    String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum IssueCategory {
  EQUIPMENT
  SURFACE
  LIGHTING
  FACILITIES
  SAFETY
  CLEANLINESS
  OTHER
}

enum IssueSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum IssueStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

### Booking Domain

```prisma
model Booking {
  id              String   @id @default(cuid())
  reference       String   @unique // KCK-2024-XXXX

  // Relations
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  venueId         String
  venue           Venue    @relation(fields: [venueId], references: [id])
  pitchId         String
  pitch           Pitch    @relation(fields: [pitchId], references: [id])
  slotId          String   @unique
  slot            AvailabilitySlot @relation(fields: [slotId], references: [id])

  // Booking details
  name            String?  // "Tuesday Kickabout"
  date            DateTime @db.Date
  startTime       DateTime @db.Time
  endTime         DateTime @db.Time

  // Players
  expectedPlayers Int      @default(10)

  // Pricing
  basePrice       Int      // Original price in pence
  finalPrice      Int      // After discounts/adjustments
  creditsApplied  Int      @default(0)
  promoCode       String?
  promoDiscount   Int      @default(0)

  // Payment
  paymentType     PaymentType
  depositAmount   Int?
  depositPaid     Boolean  @default(false)
  fullAmountPaid  Boolean  @default(false)

  // Split-pay
  isSplitPay      Boolean  @default(false)
  splitPayDeadline DateTime?
  autoChargeOnDeadline Boolean @default(false)

  // Status
  status          BookingStatus @default(PENDING)
  checkedInAt     DateTime?
  checkedInBy     String?   // Staff userId

  // QR code token (for check-in)
  qrToken         String   @unique @default(cuid())

  // Cancellation
  cancelledAt     DateTime?
  cancellationReason String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  participants    BookingParticipant[]
  payments        Payment[]
  refunds         Refund[]
  issues          Issue[]

  // League fixture (if applicable)
  fixture         Fixture?
}

enum PaymentType {
  FULL
  DEPOSIT
  SPLIT_PAY
}

enum BookingStatus {
  PENDING         // Created but not paid
  CONFIRMED       // Paid (or deposit paid)
  SPLIT_PENDING   // Waiting for split-pay participants
  CHECKED_IN      // Customer arrived
  COMPLETED       // Game finished
  CANCELLED       // Cancelled
  NO_SHOW         // Didn't show up
}

model BookingHold {
  id              String   @id @default(cuid())
  slotId          String   @unique
  slot            AvailabilitySlot @relation(fields: [slotId], references: [id])
  userId          String

  expiresAt       DateTime

  createdAt       DateTime @default(now())

  @@index([expiresAt])
}

model BookingParticipant {
  id              String   @id @default(cuid())
  bookingId       String
  booking         Booking  @relation(fields: [bookingId], references: [id])

  // Participant info (may or may not have user account)
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])
  email           String?
  phone           String?
  name            String?

  // Payment
  shareAmount     Int      // In pence
  paymentStatus   ParticipantPaymentStatus @default(PENDING)
  paidAt          DateTime?
  paymentId       String?

  // Invite
  inviteToken     String   @unique @default(cuid())
  invitedAt       DateTime @default(now())
  reminderSentAt  DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum ParticipantPaymentStatus {
  PENDING
  PAID
  REFUNDED
  WAIVED
}

model Payment {
  id              String   @id @default(cuid())
  bookingId       String
  booking         Booking  @relation(fields: [bookingId], references: [id])

  // Stripe
  stripePaymentIntentId String @unique
  stripeChargeId  String?

  amount          Int      // In pence
  currency        String   @default("GBP")
  status          PaymentStatus

  // Metadata
  type            PaymentTransactionType
  participantId   String?  // If split-pay participant payment

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCEEDED
  FAILED
  CANCELLED
  REFUNDED
}

enum PaymentTransactionType {
  FULL_PAYMENT
  DEPOSIT
  REMAINING_BALANCE
  SPLIT_PAY_SHARE
  AUTO_CHARGE      // Captain auto-charged for unpaid shares
}

model Refund {
  id              String   @id @default(cuid())
  bookingId       String
  booking         Booking  @relation(fields: [bookingId], references: [id])
  paymentId       String

  // Stripe
  stripeRefundId  String?  @unique

  amount          Int      // In pence
  type            RefundType
  reason          String?

  status          RefundStatus @default(PENDING)
  processedAt     DateTime?

  createdAt       DateTime @default(now())
}

enum RefundType {
  FULL
  PARTIAL
  CREDIT_CONVERSION // Converted to credit instead
}

enum RefundStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

model CreditWallet {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])

  balance         Int      @default(0) // In pence

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  transactions    CreditTransaction[]
}

model CreditTransaction {
  id              String   @id @default(cuid())
  walletId        String
  wallet          CreditWallet @relation(fields: [walletId], references: [id])

  type            CreditTransactionType
  amount          Int      // Positive for credit, negative for debit
  balance         Int      // Balance after transaction

  // Reference
  bookingId       String?
  refundId        String?
  description     String

  // Expiry (for credits)
  expiresAt       DateTime?

  createdAt       DateTime @default(now())
}

enum CreditTransactionType {
  CANCELLATION_CREDIT
  REFUND_TO_CREDIT
  PROMOTIONAL_CREDIT
  BOOKING_DEBIT
  EXPIRED
  ADMIN_ADJUSTMENT
}

model WaitlistEntry {
  id              String   @id @default(cuid())
  slotId          String
  slot            AvailabilitySlot @relation(fields: [slotId], references: [id])
  userId          String

  position        Int
  notifiedAt      DateTime?
  expiresAt       DateTime? // After notification, time to claim
  claimedAt       DateTime?

  createdAt       DateTime @default(now())

  @@unique([slotId, userId])
  @@index([slotId, position])
}
```

### Team Domain

```prisma
model Team {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique

  // Info
  description     String?
  logo            String?
  primaryColour   String?  // Hex code
  secondaryColour String?

  // Config
  sport           Sport    @default(FIVE_A_SIDE)
  homeVenueId     String?

  // Contact
  contactEmail    String?

  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  members         TeamMember[]
  invites         TeamInvite[]
  availabilityResponses AvailabilityResponse[]
  benchList       BenchListEntry[]

  // League participation
  leagueTeams     LeagueTeam[]
  homeFixtures    Fixture[] @relation("HomeTeam")
  awayFixtures    Fixture[] @relation("AwayTeam")

  // Player finder
  playerFinderPosts PlayerFinderPost[]
}

enum Sport {
  FIVE_A_SIDE
  SIX_A_SIDE
  SEVEN_A_SIDE
  ELEVEN_A_SIDE
}

model TeamMember {
  id              String   @id @default(cuid())
  teamId          String
  team            Team     @relation(fields: [teamId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  role            TeamMemberRole @default(PLAYER)
  jerseyNumber    Int?
  position        String?

  joinedAt        DateTime @default(now())
  leftAt          DateTime?
  isActive        Boolean  @default(true)

  @@unique([teamId, userId])
}

enum TeamMemberRole {
  CAPTAIN
  VICE_CAPTAIN
  PLAYER
}

model TeamInvite {
  id              String   @id @default(cuid())
  teamId          String
  team            Team     @relation(fields: [teamId], references: [id])

  // Sender
  senderId        String
  sender          User     @relation("InviteSender", fields: [senderId], references: [id])

  // Recipient (may not have account yet)
  recipientId     String?
  recipient       User?    @relation("InviteRecipient", fields: [recipientId], references: [id])
  recipientEmail  String?
  recipientPhone  String?

  token           String   @unique @default(cuid())
  status          InviteStatus @default(PENDING)

  expiresAt       DateTime
  respondedAt     DateTime?

  createdAt       DateTime @default(now())
}

enum InviteStatus {
  PENDING
  ACCEPTED
  DECLINED
  EXPIRED
  REVOKED
}

model AvailabilityResponse {
  id              String   @id @default(cuid())
  teamId          String
  team            Team     @relation(fields: [teamId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  fixtureId       String
  fixture         Fixture  @relation(fields: [fixtureId], references: [id])

  status          AvailabilityStatus
  note            String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([teamId, userId, fixtureId])
}

enum AvailabilityStatus {
  IN
  MAYBE
  OUT
  NO_RESPONSE
}

model BenchListEntry {
  id              String   @id @default(cuid())
  teamId          String
  team            Team     @relation(fields: [teamId], references: [id])
  userId          String

  // Not a full member, but available to fill gaps
  name            String
  email           String?
  phone           String?

  notes           String?
  lastPlayedAt    DateTime?

  createdAt       DateTime @default(now())
}

model PlayerFinderPost {
  id              String   @id @default(cuid())

  // Posted by user or team
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])
  teamId          String?
  team            Team?    @relation(fields: [teamId], references: [id])

  // Booking reference (if for a specific booking)
  bookingId       String?

  // Details
  title           String   // "Need 2 players tonight"
  description     String?

  venueId         String?
  location        String?
  date            DateTime
  time            DateTime @db.Time

  spotsNeeded     Int
  spotsFilled     Int      @default(0)
  pricePerPerson  Int?     // In pence
  skillLevel      SkillLevel?

  status          PlayerFinderStatus @default(OPEN)

  createdAt       DateTime @default(now())
  expiresAt       DateTime

  // Relations
  acceptances     PlayerFinderAcceptance[]
}

enum PlayerFinderStatus {
  OPEN
  FILLED
  CANCELLED
  EXPIRED
}

model PlayerFinderAcceptance {
  id              String   @id @default(cuid())
  postId          String
  post            PlayerFinderPost @relation(fields: [postId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  status          AcceptanceStatus @default(PENDING)
  paymentId       String?

  createdAt       DateTime @default(now())
  confirmedAt     DateTime?
}

enum AcceptanceStatus {
  PENDING
  CONFIRMED
  REJECTED
  CANCELLED
}
```

### League Domain

```prisma
model League {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  description     String?

  // Organiser
  organiserId     String
  organiser       User     @relation("LeagueOrganiser", fields: [organiserId], references: [id])

  // Venue
  venueId         String?
  venue           Venue?   @relation(fields: [venueId], references: [id])

  // Config
  sport           Sport    @default(FIVE_A_SIDE)
  format          LeagueFormat @default(ROUND_ROBIN)

  // Rules
  matchDurationMins Int    @default(50)
  pointsForWin    Int      @default(3)
  pointsForDraw   Int      @default(1)
  pointsForLoss   Int      @default(0)
  tiebreakers     String[] // ["goal_diff", "goals_scored", "head_to_head"]

  // Registration
  minTeams        Int      @default(4)
  maxTeams        Int      @default(12)
  entryFee        Int?     // In pence
  registrationDeadline DateTime?

  // Discipline rules
  yellowsForBan   Int      @default(5)
  redCardBanGames Int      @default(1)

  // Scheduling
  preferredDays   Int[]    // 0=Sunday, 1=Monday, etc.
  kickoffWindowStart String? // "18:00"
  kickoffWindowEnd   String? // "21:00"

  // Status
  status          LeagueStatus @default(DRAFT)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  seasons         Season[]
  teams           LeagueTeam[]
}

enum LeagueFormat {
  ROUND_ROBIN
  DOUBLE_ROUND_ROBIN
  KNOCKOUT
  GROUP_AND_KNOCKOUT
}

enum LeagueStatus {
  DRAFT
  REGISTRATION_OPEN
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model Season {
  id              String   @id @default(cuid())
  leagueId        String
  league          League   @relation(fields: [leagueId], references: [id])

  name            String   // "2024 Spring Season"
  startDate       DateTime
  endDate         DateTime?

  status          SeasonStatus @default(UPCOMING)

  createdAt       DateTime @default(now())

  // Relations
  divisions       Division[]
  fixtures        Fixture[]
}

enum SeasonStatus {
  UPCOMING
  IN_PROGRESS
  COMPLETED
}

model Division {
  id              String   @id @default(cuid())
  seasonId        String
  season          Season   @relation(fields: [seasonId], references: [id])

  name            String   // "Division 1", "Group A"
  tier            Int      @default(1) // 1 = top

  // Relations
  teams           LeagueTeam[]
  fixtures        Fixture[]
}

model LeagueTeam {
  id              String   @id @default(cuid())
  leagueId        String
  league          League   @relation(fields: [leagueId], references: [id])
  teamId          String
  team            Team     @relation(fields: [teamId], references: [id])
  divisionId      String?
  division        Division? @relation(fields: [divisionId], references: [id])

  // Registration
  registeredAt    DateTime @default(now())
  registrationPaid Boolean @default(false)

  // Stats (denormalised for performance)
  played          Int      @default(0)
  won             Int      @default(0)
  drawn           Int      @default(0)
  lost            Int      @default(0)
  goalsFor        Int      @default(0)
  goalsAgainst    Int      @default(0)
  points          Int      @default(0)

  // Constraints
  cannotPlayAfter String?  // "20:00"
  blackoutDates   DateTime[]

  @@unique([leagueId, teamId])
}

model Fixture {
  id              String   @id @default(cuid())
  seasonId        String
  season          Season   @relation(fields: [seasonId], references: [id])
  divisionId      String?
  division        Division? @relation(fields: [divisionId], references: [id])

  // Teams
  homeTeamId      String
  homeTeam        Team     @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeamId      String
  awayTeam        Team     @relation("AwayTeam", fields: [awayTeamId], references: [id])

  // Schedule
  scheduledDate   DateTime
  scheduledTime   DateTime @db.Time
  venueId         String?
  pitchId         String?

  // Booking (if pitch booked through platform)
  bookingId       String?  @unique
  booking         Booking? @relation(fields: [bookingId], references: [id])

  // Match week
  matchWeek       Int?

  // Status
  status          FixtureStatus @default(SCHEDULED)

  // Postponement
  postponedAt     DateTime?
  postponementReason String?
  rescheduledTo   DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  result          Result?
  availabilityResponses AvailabilityResponse[]
}

enum FixtureStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  POSTPONED
  CANCELLED
  VOID
}

model Result {
  id              String   @id @default(cuid())
  fixtureId       String   @unique
  fixture         Fixture  @relation(fields: [fixtureId], references: [id])

  // Score
  homeScore       Int
  awayScore       Int

  // Submission
  submittedById   String
  submittedBy     User     @relation("ResultSubmitter", fields: [submittedById], references: [id])
  submittedAt     DateTime @default(now())

  // Confirmation
  status          ResultStatus @default(PENDING_CONFIRMATION)
  confirmedAt     DateTime?
  confirmedById   String?

  // Additional data
  goalScorers     Json?    // [{ playerId, teamId, minute?, isOwnGoal }]
  notes           String?

  // Relations
  dispute         Dispute?
  disciplineEvents DisciplineEvent[]
}

enum ResultStatus {
  PENDING_CONFIRMATION
  CONFIRMED
  DISPUTED
  ADMIN_RESOLVED
}

model Dispute {
  id              String   @id @default(cuid())
  resultId        String   @unique
  result          Result   @relation(fields: [resultId], references: [id])

  // Disputing party
  raisedById      String
  raisedBy        User     @relation("DisputeRaiser", fields: [raisedById], references: [id])
  raisedAt        DateTime @default(now())

  // Dispute details
  reason          DisputeReason
  claimedHomeScore Int?
  claimedAwayScore Int?
  description     String

  // Evidence
  evidence        DisputeEvidence[]

  // Resolution
  status          DisputeStatus @default(OPEN)
  resolution      String?
  resolvedAt      DateTime?
  resolvedById    String?
  finalHomeScore  Int?
  finalAwayScore  Int?
}

enum DisputeReason {
  WRONG_SCORE
  WRONG_CARDS
  MATCH_DID_NOT_HAPPEN
  OTHER
}

enum DisputeStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  REJECTED
}

model DisputeEvidence {
  id              String   @id @default(cuid())
  disputeId       String
  dispute         Dispute  @relation(fields: [disputeId], references: [id])

  type            EvidenceType
  url             String   // File URL
  description     String?

  uploadedById    String
  uploadedAt      DateTime @default(now())
}

enum EvidenceType {
  PHOTO
  SCREENSHOT
  VIDEO
  DOCUMENT
}

model DisciplineEvent {
  id              String   @id @default(cuid())
  resultId        String?
  result          Result?  @relation(fields: [resultId], references: [id])

  // Player
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  teamId          String

  // Event
  type            DisciplineType
  reason          String?
  minute          Int?

  // Auto-generated consequences
  banId           String?  @unique
  ban             Ban?
  fineAmount      Int?     // In pence
  finePaid        Boolean  @default(false)

  createdAt       DateTime @default(now())
}

enum DisciplineType {
  YELLOW_CARD
  RED_CARD
  FINE
  WARNING
}

model Ban {
  id              String   @id @default(cuid())
  disciplineEventId String @unique
  disciplineEvent DisciplineEvent @relation(fields: [disciplineEventId], references: [id])

  userId          String
  teamId          String

  // Ban details
  type            BanType
  gamesRemaining  Int
  reason          String

  // Appeal
  appealDeadline  DateTime?
  appealedAt      DateTime?
  appealOutcome   String?

  isActive        Boolean  @default(true)

  createdAt       DateTime @default(now())
  expiresAt       DateTime?
}

enum BanType {
  AUTO_YELLOWS      // Accumulated yellows
  RED_CARD          // Direct red card
  EXTENDED          // Organiser extended ban
  MISCONDUCT        // Off-pitch misconduct
}
```

### Communication Domain

```prisma
model Notification {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])

  type            NotificationType
  title           String
  body            String
  data            Json?    // Additional context

  // Linking
  entityType      String?  // "Booking", "Fixture", etc.
  entityId        String?
  actionUrl       String?

  // Status
  read            Boolean  @default(false)
  readAt          DateTime?

  // Delivery
  emailSent       Boolean  @default(false)
  emailSentAt     DateTime?
  pushSent        Boolean  @default(false)
  pushSentAt      DateTime?

  createdAt       DateTime @default(now())

  @@index([userId, read])
  @@index([createdAt])
}

enum NotificationType {
  // Booking
  BOOKING_CONFIRMED
  BOOKING_REMINDER
  BOOKING_CANCELLED
  SPLIT_PAY_INVITE
  SPLIT_PAY_REMINDER
  SPLIT_PAY_PAID
  SPLIT_PAY_DEADLINE
  WAITLIST_AVAILABLE

  // Team
  TEAM_INVITE
  TEAM_JOINED
  AVAILABILITY_REQUEST
  PLAYER_FINDER_INTEREST

  // League
  FIXTURE_SCHEDULED
  FIXTURE_REMINDER
  RESULT_SUBMITTED
  RESULT_CONFIRM_REQUEST
  DISPUTE_RAISED
  DISPUTE_RESOLVED
  DISCIPLINE_EVENT
  BAN_ISSUED

  // Venue (for operators)
  ISSUE_REPORTED
  CLOSURE_AFFECTED

  // General
  WELCOME
  CREDIT_RECEIVED
  CREDIT_EXPIRING
}

model ShareLink {
  id              String   @id @default(cuid())
  type            ShareLinkType

  // Reference
  bookingId       String?
  fixtureId       String?
  teamId          String?

  // Token for URL
  token           String   @unique @default(cuid())

  // Content
  platform        SharePlatform
  previewTitle    String
  previewBody     String

  // Tracking
  clickCount      Int      @default(0)
  lastClickedAt   DateTime?

  createdAt       DateTime @default(now())
  expiresAt       DateTime?
}

enum ShareLinkType {
  BOOKING
  SPLIT_PAY_INVITE
  FIXTURE
  TEAM_INVITE
  PLAYER_FINDER
}

enum SharePlatform {
  WHATSAPP
  EMAIL
  COPY_LINK
  TWITTER
  FACEBOOK
}

model CalendarEventToken {
  id              String   @id @default(cuid())
  token           String   @unique @default(cuid())

  // Reference
  bookingId       String?
  fixtureId       String?

  // Calendar type
  calendarType    CalendarType

  // Content (for .ics generation)
  title           String
  description     String?
  location        String?
  startTime       DateTime
  endTime         DateTime

  createdAt       DateTime @default(now())
}

enum CalendarType {
  ICS_DOWNLOAD
  GOOGLE_CALENDAR
  APPLE_CALENDAR
  OUTLOOK
}
```

---

## Indexes and Performance Considerations

```prisma
// Additional indexes for common queries

// Availability search
@@index([AvailabilitySlot.date, AvailabilitySlot.status])

// Booking lookups
@@index([Booking.userId, Booking.status])
@@index([Booking.venueId, Booking.date])
@@index([Booking.reference])

// Team member lookups
@@index([TeamMember.userId, TeamMember.isActive])

// League standings
@@index([LeagueTeam.leagueId, LeagueTeam.points])

// Notification feeds
@@index([Notification.userId, Notification.read, Notification.createdAt])

// Credit expiry
@@index([CreditTransaction.expiresAt])
```
