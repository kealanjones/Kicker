# API Routes & Stripe Webhook Plan

## API Route Structure

```
/api
├── /auth                    # Authentication
├── /users                   # User management
├── /venues                  # Venue operations
├── /pitches                 # Pitch management
├── /bookings                # Booking operations
├── /payments                # Payment processing
├── /teams                   # Team management
├── /leagues                 # League operations
├── /notifications           # Notification management
├── /webhooks                # External webhooks
└── /admin                   # Admin operations
```

---

## Authentication Routes

```
POST   /api/auth/register           # Email/password registration
POST   /api/auth/login              # Email/password login
POST   /api/auth/magic-link         # Send magic link email
GET    /api/auth/magic-link/verify  # Verify magic link token
POST   /api/auth/logout             # Logout (clear session)
POST   /api/auth/refresh            # Refresh access token
POST   /api/auth/forgot-password    # Request password reset
POST   /api/auth/reset-password     # Reset password with token
GET    /api/auth/me                 # Get current user
DELETE /api/auth/me                 # Delete account (GDPR)
GET    /api/auth/me/export          # Export user data (GDPR)
```

---

## User Routes

```
GET    /api/users/:id               # Get user profile (public)
PATCH  /api/users/:id               # Update user profile
GET    /api/users/:id/bookings      # Get user's bookings
GET    /api/users/:id/teams         # Get user's teams
GET    /api/users/:id/leagues       # Get user's leagues
GET    /api/users/:id/notifications # Get notifications
PATCH  /api/users/:id/notifications/:notifId # Mark notification read
POST   /api/users/:id/notifications/read-all  # Mark all read
```

---

## Venue Routes

```
# Public
GET    /api/venues                  # List venues (with filters)
GET    /api/venues/:id              # Get venue details
GET    /api/venues/:slug            # Get venue by slug
GET    /api/venues/:id/pitches      # Get venue's pitches
GET    /api/venues/:id/availability # Get availability grid

# Venue Admin
POST   /api/venues                  # Create venue
PATCH  /api/venues/:id              # Update venue
DELETE /api/venues/:id              # Deactivate venue

# Pitches
POST   /api/venues/:id/pitches      # Add pitch
PATCH  /api/venues/:id/pitches/:pitchId   # Update pitch
DELETE /api/venues/:id/pitches/:pitchId   # Remove pitch

# Pricing
GET    /api/venues/:id/pricing-rules      # Get pricing rules
POST   /api/venues/:id/pricing-rules      # Create pricing rule
PATCH  /api/venues/:id/pricing-rules/:ruleId # Update rule
DELETE /api/venues/:id/pricing-rules/:ruleId # Delete rule

# Closures
GET    /api/venues/:id/closures           # Get closures
POST   /api/venues/:id/closures           # Create closure
PATCH  /api/venues/:id/closures/:closureId # Update closure
DELETE /api/venues/:id/closures/:closureId # Cancel closure

# Issues
GET    /api/venues/:id/issues             # Get issues
POST   /api/venues/:id/issues             # Report issue
PATCH  /api/venues/:id/issues/:issueId    # Update issue status

# Analytics
GET    /api/venues/:id/analytics          # Get venue analytics
GET    /api/venues/:id/analytics/utilisation
GET    /api/venues/:id/analytics/revenue
GET    /api/venues/:id/analytics/bookings

# Staff
GET    /api/venues/:id/staff              # Get staff list
POST   /api/venues/:id/staff              # Add staff member
DELETE /api/venues/:id/staff/:staffId     # Remove staff
GET    /api/venues/:id/check-in           # Today's check-in list
POST   /api/venues/:id/check-in/:bookingId # Check in booking
```

---

## Booking Routes

```
# Search & Availability
GET    /api/availability            # Search availability
       ?location=SW1A1AA
       &date=2024-01-15
       &time=18:00
       &pitchSize=5v5
       &surface=3g
       &indoor=true
       &maxPrice=6000

# Booking Flow
POST   /api/bookings/hold           # Create slot hold (10 min)
DELETE /api/bookings/hold/:holdId   # Release hold
GET    /api/bookings/hold/:holdId   # Check hold status

POST   /api/bookings                # Create booking
GET    /api/bookings/:id            # Get booking details
PATCH  /api/bookings/:id            # Update booking
DELETE /api/bookings/:id            # Cancel booking

# Split-Pay
GET    /api/bookings/:id/participants        # Get participants
POST   /api/bookings/:id/participants        # Add participant
DELETE /api/bookings/:id/participants/:pId   # Remove participant
POST   /api/bookings/:id/participants/:pId/remind # Send reminder
GET    /api/bookings/:id/share-link          # Get split-pay share link

# Participant Payment (public - uses token)
GET    /api/pay/:token              # Get booking details for participant
POST   /api/pay/:token              # Process participant payment

# Waitlist
POST   /api/waitlist                # Join waitlist for slot
DELETE /api/waitlist/:entryId       # Leave waitlist
GET    /api/waitlist/my             # Get user's waitlist entries

# Rebook
POST   /api/bookings/:id/rebook     # One-tap rebook (next week)

# QR & Check-in
GET    /api/bookings/:id/qr         # Get QR code data
POST   /api/bookings/verify-qr      # Verify QR code (staff)
```

---

## Payment Routes

```
# Payment Intent
POST   /api/payments/create-intent  # Create Stripe PaymentIntent
       Body: { bookingId, amount, type: "full|deposit|split" }

# Wallet
GET    /api/wallet                  # Get user's credit wallet
GET    /api/wallet/transactions     # Get transaction history

# Refunds (admin/venue)
POST   /api/refunds                 # Process refund
       Body: { bookingId, amount, type: "refund|credit", reason }

# Promo Codes
POST   /api/promo-codes/validate    # Validate promo code
       Body: { code, venueId, amount }
```

---

## Team Routes

```
# Teams
GET    /api/teams                   # List user's teams
POST   /api/teams                   # Create team
GET    /api/teams/:id               # Get team details
PATCH  /api/teams/:id               # Update team
DELETE /api/teams/:id               # Deactivate team

# Members
GET    /api/teams/:id/members       # Get members
POST   /api/teams/:id/members       # Add member (direct)
PATCH  /api/teams/:id/members/:memberId  # Update role
DELETE /api/teams/:id/members/:memberId  # Remove member

# Invites
GET    /api/teams/:id/invites       # Get pending invites
POST   /api/teams/:id/invites       # Send invite
DELETE /api/teams/:id/invites/:inviteId  # Revoke invite

# Invite Response (uses token)
GET    /api/invites/:token          # Get invite details
POST   /api/invites/:token/accept   # Accept invite
POST   /api/invites/:token/decline  # Decline invite

# Availability
GET    /api/teams/:id/availability/:fixtureId  # Get availability for fixture
POST   /api/teams/:id/availability/:fixtureId  # Submit my availability
GET    /api/teams/:id/availability-summary/:fixtureId  # Get summary

# Bench List
GET    /api/teams/:id/bench         # Get bench list
POST   /api/teams/:id/bench         # Add to bench
DELETE /api/teams/:id/bench/:entryId # Remove from bench
POST   /api/teams/:id/bench/:entryId/invite  # Invite bench player

# Player Finder
GET    /api/player-finder           # List open posts
       ?location=SW1A1AA
       &date=2024-01-15
       &skillLevel=intermediate
POST   /api/player-finder           # Create post
GET    /api/player-finder/:id       # Get post details
PATCH  /api/player-finder/:id       # Update post
DELETE /api/player-finder/:id       # Cancel post
POST   /api/player-finder/:id/accept # Accept & pay to join
```

---

## League Routes

```
# Public
GET    /api/leagues                 # List public leagues
GET    /api/leagues/:id             # Get league details
GET    /api/leagues/:id/standings   # Get standings table
GET    /api/leagues/:id/fixtures    # Get fixtures
GET    /api/leagues/:id/results     # Get results
GET    /api/leagues/:id/stats       # Get league stats

# Organiser
POST   /api/leagues                 # Create league
PATCH  /api/leagues/:id             # Update league
DELETE /api/leagues/:id             # Cancel league

# Teams
GET    /api/leagues/:id/teams       # Get registered teams
POST   /api/leagues/:id/teams       # Register team
DELETE /api/leagues/:id/teams/:teamId # Remove team

# Fixtures
POST   /api/leagues/:id/fixtures/generate  # Generate fixtures
PATCH  /api/leagues/:id/fixtures/:fixtureId # Reschedule fixture
DELETE /api/leagues/:id/fixtures/:fixtureId # Cancel fixture

# Results
POST   /api/leagues/:id/results     # Submit result
       Body: { fixtureId, homeScore, awayScore, goalScorers, cards }
GET    /api/leagues/:id/results/:resultId        # Get result details
POST   /api/leagues/:id/results/:resultId/confirm # Confirm result
POST   /api/leagues/:id/results/:resultId/dispute # Dispute result

# Disputes
GET    /api/leagues/:id/disputes    # Get disputes
GET    /api/leagues/:id/disputes/:disputeId  # Get dispute details
POST   /api/leagues/:id/disputes/:disputeId/evidence  # Upload evidence
POST   /api/leagues/:id/disputes/:disputeId/resolve   # Resolve dispute

# Discipline
GET    /api/leagues/:id/discipline  # Get discipline events
GET    /api/leagues/:id/bans        # Get active bans
POST   /api/leagues/:id/discipline  # Add discipline event
PATCH  /api/leagues/:id/bans/:banId # Update ban (appeal outcome)
```

---

## Notification Routes

```
GET    /api/notifications           # Get user notifications
PATCH  /api/notifications/:id       # Mark as read
POST   /api/notifications/read-all  # Mark all as read
DELETE /api/notifications/:id       # Delete notification

# Preferences
GET    /api/notification-preferences
PATCH  /api/notification-preferences
```

---

## Webhook Routes

```
POST   /api/webhooks/stripe         # Stripe webhook handler
POST   /api/webhooks/postmark       # Email delivery webhooks
```

---

## Stripe Integration Plan

### Payment Flows

#### 1. Full Payment

```
User selects slot → Hold created → Payment page

Client:
  POST /api/bookings/hold { slotId }
  → { holdId, expiresAt }

  POST /api/payments/create-intent { holdId, type: "full" }
  → { clientSecret, amount }

  Stripe.confirmPayment(clientSecret)
  → Success/Failure

Server (webhook):
  payment_intent.succeeded → Create booking, release hold
  payment_intent.payment_failed → Release hold
```

#### 2. Deposit Payment

```
Same as full, but:
  POST /api/payments/create-intent { holdId, type: "deposit" }
  → { clientSecret, amount: depositAmount }

Booking created with:
  depositPaid: true
  fullAmountPaid: false
```

#### 3. Split-Pay Flow

```
Captain creates booking with split-pay:
  POST /api/bookings { ..., paymentType: "SPLIT_PAY", playerCount: 10 }
  → Booking created with SPLIT_PENDING status

Captain pays their share:
  POST /api/payments/create-intent { bookingId, type: "split", participantId: captainId }
  → Captain's share charged

Share link generated:
  GET /api/bookings/:id/share-link
  → { url: "https://kicker.co.uk/pay/abc123" }

Participant clicks link:
  GET /api/pay/abc123
  → { booking details, shareAmount }

Participant pays:
  POST /api/pay/abc123 { paymentMethodId }
  → Payment processed

Auto-reminders (cron):
  T-48h, T-24h → Send reminders to unpaid

Deadline reached (cron):
  IF all paid → Booking CONFIRMED
  IF autoCharge enabled → Charge captain remainder
  ELSE → Release booking, notify waitlist
```

### Stripe Webhook Events

```typescript
// /api/webhooks/stripe/route.ts

const relevantEvents = [
  // Payment lifecycle
  'payment_intent.created',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.canceled',

  // Charges
  'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'charge.dispute.created',

  // Connect (for venue payouts)
  'account.updated',
  'payout.paid',
  'payout.failed',
];

// Handler logic
switch (event.type) {
  case 'payment_intent.succeeded':
    const { bookingId, type, participantId } = event.data.object.metadata;

    if (type === 'full') {
      await confirmBooking(bookingId);
      await releaseHold(bookingId);
      await sendConfirmationEmail(bookingId);
    } else if (type === 'deposit') {
      await updateBooking(bookingId, { depositPaid: true, status: 'CONFIRMED' });
      await releaseHold(bookingId);
      await sendConfirmationEmail(bookingId);
    } else if (type === 'split') {
      await markParticipantPaid(participantId);
      await checkSplitPayComplete(bookingId);
      await notifyCaptain(bookingId);
    }
    break;

  case 'payment_intent.payment_failed':
    await handlePaymentFailure(event.data.object);
    break;

  case 'charge.refunded':
    await processRefundCompletion(event.data.object);
    break;

  case 'charge.dispute.created':
    await handleDispute(event.data.object);
    await alertOps(event.data.object);
    break;
}
```

### Stripe Connect for Venues

```typescript
// Venue onboarding
POST /api/venues/:id/stripe-connect
→ Redirect to Stripe Connect onboarding

// On completion
GET /api/webhooks/stripe/connect/callback
→ Store stripe_account_id on venue

// Payment distribution
// When booking is paid:
await stripe.paymentIntents.create({
  amount: bookingAmount,
  currency: 'gbp',
  payment_method_types: ['card'],
  application_fee_amount: platformFee, // Our cut
  transfer_data: {
    destination: venue.stripeAccountId,
  },
  metadata: {
    bookingId,
    venueId,
    type,
  },
});
```

### Refund Processing

```typescript
// Refund to original payment method
POST /api/refunds
{
  bookingId,
  amount: 5500, // In pence
  type: "refund",
  reason: "Customer requested cancellation"
}

// Server
const payment = await getBookingPayment(bookingId);
const refund = await stripe.refunds.create({
  payment_intent: payment.stripePaymentIntentId,
  amount: amount,
  reason: 'requested_by_customer',
});

// Or credit to wallet
{
  type: "credit",
  bonusPercent: 10 // 10% bonus for choosing credit
}

// Server
const creditAmount = amount * 1.10; // With bonus
await addCredit(userId, creditAmount, {
  type: 'CANCELLATION_CREDIT',
  bookingId,
  expiresAt: addMonths(now, 12),
});
```

---

## Background Jobs (Cron)

```typescript
// jobs/index.ts

// Every minute
scheduleJob('release-expired-holds', '* * * * *', async () => {
  await releaseExpiredHolds();
});

// Every 5 minutes
scheduleJob('split-pay-reminders', '*/5 * * * *', async () => {
  await sendSplitPayReminders();
  await processSplitPayDeadlines();
});

// Every hour
scheduleJob('waitlist-notifications', '0 * * * *', async () => {
  await processWaitlistNotifications();
});

// Daily at 6am
scheduleJob('booking-reminders', '0 6 * * *', async () => {
  await sendBookingReminders();
});

// Daily at midnight
scheduleJob('credit-expiry', '0 0 * * *', async () => {
  await processExpiringCredits();
});

// Daily at 2am
scheduleJob('analytics-rollup', '0 2 * * *', async () => {
  await rollupVenueAnalytics();
});
```

---

## Rate Limiting

```typescript
// middleware/rateLimit.ts

const limits = {
  // Auth endpoints
  '/api/auth/login': { window: '15m', max: 5 },
  '/api/auth/register': { window: '1h', max: 3 },
  '/api/auth/magic-link': { window: '1h', max: 5 },

  // Payment endpoints
  '/api/payments/*': { window: '1m', max: 10 },

  // Search
  '/api/availability': { window: '1m', max: 60 },

  // Default
  default: { window: '1m', max: 100 },
};
```

---

## Error Response Format

```typescript
// Standard error response
{
  error: {
    code: "BOOKING_SLOT_UNAVAILABLE",
    message: "This slot is no longer available",
    details: {
      slotId: "slot_123",
      currentStatus: "HELD"
    }
  }
}

// Error codes
enum ErrorCode {
  // Auth
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',

  // Booking
  SLOT_UNAVAILABLE = 'SLOT_UNAVAILABLE',
  HOLD_EXPIRED = 'HOLD_EXPIRED',
  BOOKING_NOT_FOUND = 'BOOKING_NOT_FOUND',
  CANCELLATION_NOT_ALLOWED = 'CANCELLATION_NOT_ALLOWED',

  // Payment
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  INVALID_PROMO_CODE = 'INVALID_PROMO_CODE',

  // Team
  TEAM_NOT_FOUND = 'TEAM_NOT_FOUND',
  ALREADY_TEAM_MEMBER = 'ALREADY_TEAM_MEMBER',
  INVITE_EXPIRED = 'INVITE_EXPIRED',

  // League
  LEAGUE_NOT_FOUND = 'LEAGUE_NOT_FOUND',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  RESULT_ALREADY_CONFIRMED = 'RESULT_ALREADY_CONFIRMED',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // Server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}
```
