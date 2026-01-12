# User Flows

## 1. Booking Flow (with Split-Pay, Waitlist, Credits)

### 1.1 Standard Booking Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BOOKING FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

[Landing Page]
      │
      ▼
[Search] ──────────────────────────────────────────────────────────────────────
      │  • Enter location (postcode/town) or use current location
      │  • Select date (default: today/tomorrow)
      │  • Filter: pitch size (5v5/7v7), surface, indoor/outdoor
      │  • Price range (optional)
      ▼
[Availability Grid] ───────────────────────────────────────────────────────────
      │  • List of venues with distance
      │  • Time slots in 1-hour blocks
      │  • Visual: Available (green) / Limited (amber) / Full (grey)
      │  • Price per slot shown
      │  • Skeleton loaders while fetching
      ▼
[Select Slot] ─────────────────────────────────────────────────────────────────
      │  • Tap slot → immediate hold initiated
      │  • "Held for 10:00" countdown starts
      │  • Slot locked for other users (shows "Held")
      │  • Animation: slot pulses, then locks with timer
      ▼
[Booking Details] ─────────────────────────────────────────────────────────────
      │  • Confirm: venue, pitch, date, time, duration
      │  • Add booking name (optional: "Tuesday Kickabout")
      │  • Number of players expected
      │  • Select: Pay full / Pay deposit / Split-pay
      │  • Apply credits (if available in wallet)
      │  • Promo code field
      ▼
[Payment] ─────────────────────────────────────────────────────────────────────
      │  IF full payment or deposit:
      │    • Stripe payment form (card / Apple Pay / Google Pay)
      │    • Show breakdown: subtotal, credits applied, deposit amount, total
      │  IF split-pay:
      │    • Captain pays their share OR full deposit
      │    • Set payment deadline (default: 24h before kickoff)
      │    • Optional: auto-charge captain if others don't pay
      │  • Loading state with progress
      │  • Error handling with retry option
      ▼
[Confirmation] ────────────────────────────────────────────────────────────────
      │  • Success animation (confetti subtle)
      │  • Booking reference code
      │  • QR code for check-in
      │  • Key details summary
      │  • Action buttons:
      │    ├── Share to WhatsApp
      │    ├── Add to Calendar
      │    ├── Invite Players (split-pay)
      │    └── View Booking
      ▼
[Post-Booking Actions]
      ├── [WhatsApp Share] → Pre-filled message with venue, time, link
      ├── [Calendar] → .ics download or Google/Apple calendar deep link
      └── [Split-Pay Invites] → See flow 1.2
```

### 1.2 Split-Pay Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SPLIT-PAY FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

[Captain Initiates Split-Pay]
      │
      ▼
[Invite Participants] ─────────────────────────────────────────────────────────
      │  • Enter number of players (e.g., 10)
      │  • System calculates share per person (£60 ÷ 10 = £6 each)
      │  • Generate unique payment links
      │  • Share options:
      │    ├── Copy link
      │    ├── WhatsApp (pre-filled with details)
      │    ├── Email invites (enter addresses)
      │    └── Share from team roster (if team exists)
      ▼
[Participant Receives Link] ───────────────────────────────────────────────────
      │  • Opens link → landing with booking details
      │  • "You're invited to [Booking Name]"
      │  • Date, time, venue, share amount
      │  • "Pay £6 to confirm your spot"
      ▼
[Participant Pays] ────────────────────────────────────────────────────────────
      │  • Quick payment (Apple Pay / Google Pay preferred)
      │  • Or card payment
      │  • Confirmation + Add to Calendar
      ▼
[Captain Dashboard] ───────────────────────────────────────────────────────────
      │  • Real-time payment status
      │  • List of participants: Paid ✓ / Pending ⏳
      │  • Send reminder button (per person or all pending)
      │  • Deadline countdown
      ▼
[Deadline Approaches] ─────────────────────────────────────────────────────────
      │  T-48h: Automatic reminder to unpaid
      │  T-24h: Final reminder, warning of cancellation
      │  T-deadline:
      │    IF all paid → ✓ Booking confirmed
      │    IF captain opted for auto-charge → Charge captain remainder
      │    IF not → Release booking, notify waitlist
      ▼
[Settlement]
      • All payments transferred to venue (minus platform fee)
      • If partial + auto-charge: captain charged difference
```

### 1.3 Waitlist Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          WAITLIST FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

[Slot Unavailable]
      │
      ▼
[Join Waitlist CTA] ───────────────────────────────────────────────────────────
      │  • "This slot is taken. Join waitlist?"
      │  • One-tap to join (if logged in)
      │  • Shows position in queue
      ▼
[Slot Becomes Available] ──────────────────────────────────────────────────────
      │  Triggers:
      │    • Booking cancelled
      │    • Split-pay deadline passed, auto-released
      │    • Hold timer expired
      ▼
[Notify Waitlist #1] ──────────────────────────────────────────────────────────
      │  • Push notification (if PWA)
      │  • Email: "A slot you wanted is now available!"
      │  • SMS (if opted in)
      │  • 15-minute window to claim
      ▼
[First to Confirm + Pay Wins] ─────────────────────────────────────────────────
      │  • Click link → slot held for them (10 min)
      │  • Complete payment
      │  • IF no action in 15 min → notify next in queue
      ▼
[Booking Confirmed or Queue Exhausted]
```

### 1.4 Credits & Refunds Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CREDITS & REFUNDS FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

[User Requests Cancellation]
      │
      ▼
[Check Venue Policy] ──────────────────────────────────────────────────────────
      │  Policy rules (configurable per venue):
      │    • > 48h before: Full refund OR full credit
      │    • 24-48h before: 50% refund OR full credit
      │    • < 24h before: No refund, full credit
      │    • < 2h before: No refund, 50% credit
      ▼
[Present Options] ─────────────────────────────────────────────────────────────
      │  • "Cancel and get £30 credit" (recommended)
      │  • "Cancel and request £15 refund" (if eligible)
      │  • Credits highlighted as faster + bonus (e.g., +10%)
      ▼
[User Chooses]
      │
      ├── [Credit] ────────────────────────────────────────────────────────────
      │         │  • Instant credit to wallet
      │         │  • "£30 added to your wallet"
      │         │  • Valid for 12 months
      │         │  • Can use on next booking
      │         ▼
      │    [Wallet Updated]
      │
      └── [Refund] ────────────────────────────────────────────────────────────
                │  • 3-5 business days to original payment method
                │  • Confirmation email
                ▼
           [Stripe Refund Processed]

[Using Credits at Checkout]
      │
      ▼
[Booking Payment Screen] ──────────────────────────────────────────────────────
      │  • Wallet balance shown: "You have £30 credit"
      │  • Toggle: "Use credits" (default ON if available)
      │  • Amount applied automatically
      │  • Pay remaining balance (if any)
      ▼
[Credit Deducted + Booking Confirmed]
```

---

## 2. League Management Flow

### 2.1 Create League Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CREATE LEAGUE FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[League Organiser Dashboard]
      │
      ▼
[Create New League] ───────────────────────────────────────────────────────────
      │  Step 1: Basic Info
      │    • League name
      │    • Sport: 5-a-side (default), 7-a-side
      │    • Venue(s) selection
      │    • Season: dates (start/end) or ongoing
      ▼
[Configure Format] ────────────────────────────────────────────────────────────
      │  Step 2: Rules & Format
      │    • Format: Round Robin / Knockout / Group + Knockout
      │    • Teams: min/max (e.g., 6-12)
      │    • Matches per team per week: 1
      │    • Match duration: 50 mins (configurable)
      │    • Points: Win 3, Draw 1, Loss 0
      │    • Tiebreakers: Goal diff → Goals scored → H2H
      ▼
[Fixture Constraints] ─────────────────────────────────────────────────────────
      │  Step 3: Scheduling
      │    • Preferred days: Mon, Tue, Wed (multi-select)
      │    • Kick-off window: 18:00 - 21:00
      │    • Blackout dates (holidays, venue closures)
      │    • Team constraints: "Team A can't play after 20:00"
      ▼
[Registration Settings] ───────────────────────────────────────────────────────
      │  Step 4: Teams & Fees
      │    • Entry fee per team
      │    • Registration deadline
      │    • Payment: upfront / per-match / split
      │    • Require roster submission
      ▼
[Discipline Rules] ────────────────────────────────────────────────────────────
      │  Step 5: Discipline
      │    • Yellow card: 5 = 1 match ban (configurable)
      │    • Red card: automatic 1 match ban + review
      │    • Fine rules (optional)
      ▼
[Review & Create]
      │
      ▼
[League Created] ──────────────────────────────────────────────────────────────
      │  • Shareable registration link
      │  • Admin dashboard ready
      │  • Pending: team registrations
```

### 2.2 Fixture Generation Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FIXTURE GENERATION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

[Registration Closes / Organiser Triggers]
      │
      ▼
[Generate Fixtures] ───────────────────────────────────────────────────────────
      │  Algorithm:
      │    • Round robin: each team plays each other (home/away optional)
      │    • Respect constraints: blackout dates, time preferences
      │    • Balance: distribute late games fairly
      │    • Assign to available venue slots
      ▼
[Review Draft] ────────────────────────────────────────────────────────────────
      │  • Calendar view of all fixtures
      │  • Highlight conflicts or warnings
      │  • Manual adjustment: drag & drop reschedule
      │  • Swap teams between slots
      ▼
[Publish Fixtures] ────────────────────────────────────────────────────────────
      │  • Notify all team captains
      │  • Add to team calendars
      │  • WhatsApp share option
      │  • Fixtures visible on public league page
      ▼
[Ongoing Management]
      ├── [Postponement Request] → See 2.3
      └── [Fixture Update] → Notify affected teams
```

### 2.3 Result Submission & Verification Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RESULT SUBMISSION FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Match Concludes]
      │
      ▼
[Home Captain Submits Result] ─────────────────────────────────────────────────
      │  • Score: Home [3] - [2] Away
      │  • Goal scorers (optional)
      │  • Cards issued (yellow/red with player names)
      │  • MVP nomination (optional)
      │  • Notes (optional)
      ▼
[Away Captain Notified] ───────────────────────────────────────────────────────
      │  • Push/email: "Confirm result for [Match]"
      │  • Has 24 hours to respond
      ▼
[Away Captain Reviews]
      │
      ├── [Confirms] ──────────────────────────────────────────────────────────
      │         │  • Result finalised
      │         │  • Table updated
      │         │  • Stats recorded
      │         │  • Both captains see "Confirmed ✓"
      │         ▼
      │    [Result Published]
      │
      └── [Disputes] ──────────────────────────────────────────────────────────
                │  • Select reason: wrong score / wrong cards / other
                │  • Submit their version of events
                │  • Upload evidence (photos, messages)
                ▼
           [Dispute Flow] → See 2.4

[No Response in 24h]
      │
      ▼
[Auto-Accept with Warning] ────────────────────────────────────────────────────
      │  • Result stands as submitted
      │  • Away captain flagged for non-response
      │  • Can still dispute within 48h with evidence
```

### 2.4 Dispute Resolution Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DISPUTE RESOLUTION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

[Dispute Raised]
      │
      ▼
[Organiser Notified] ──────────────────────────────────────────────────────────
      │  • Dashboard alert: "Dispute: Team A vs Team B"
      │  • Both versions visible side-by-side
      │  • Evidence attachments viewable
      ▼
[Review Evidence] ─────────────────────────────────────────────────────────────
      │  • Photos, screenshots
      │  • Previous communication
      │  • Match notes from both sides
      │  • Historical dispute rate for teams
      ▼
[Organiser Decision]
      │
      ├── [Accept Home Version] ───────────────────────────────────────────────
      │         │  • Result = Home captain's submission
      │         │  • Notify both teams
      │         │  • Record decision reason
      │         ▼
      │    [Table Updated]
      │
      ├── [Accept Away Version] ───────────────────────────────────────────────
      │         │  • Result = Away captain's submission
      │         │  • Notify both teams
      │         │  • Record decision reason
      │         ▼
      │    [Table Updated]
      │
      └── [Custom Resolution] ─────────────────────────────────────────────────
                │  • Enter custom score
                │  • Void match (0-0, no points)
                │  • Award win to one side (forfeit)
                │  • Deduct points
                │  • Issue warnings/fines
                ▼
           [Resolution Applied]
```

### 2.5 Discipline Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DISCIPLINE FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

[Card Recorded in Result]
      │
      ▼
[System Checks Rules] ─────────────────────────────────────────────────────────
      │  Yellow Card:
      │    • Increment player's yellow count
      │    • Check threshold (e.g., 5 yellows = 1 ban)
      │    • If threshold met → Auto-ban generated
      │  Red Card:
      │    • Automatic 1-match ban
      │    • Flag for review (possible extended ban)
      ▼
[Auto-Ban Applied]
      │
      ├── [Notify Player] ─────────────────────────────────────────────────────
      │         • "You've received a 1-match ban"
      │         • Reason: 5th yellow card / Red card
      │         • Applicable matches
      │
      └── [Notify Captain] ────────────────────────────────────────────────────
                • "Player X is banned for next match"
                • Plan roster accordingly

[Extended Ban Review] (Red cards, violent conduct)
      │
      ▼
[Organiser Reviews] ───────────────────────────────────────────────────────────
      │  • View incident details
      │  • Evidence from captains
      │  • Set ban length: 1-10 matches or season ban
      │  • Optional fine
      ▼
[Appeal Process] (if enabled)
      │  • Player can submit appeal within 48h
      │  • Organiser reviews and decides
      │  • Decision is final
```

---

## 3. Venue Operations Flow

### 3.1 Venue Setup Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VENUE SETUP FLOW                                      │
└─────────────────────────────────────────────────────────────────────────────┘

[Venue Operator Onboarding]
      │
      ▼
[Create Venue Profile] ────────────────────────────────────────────────────────
      │  • Venue name
      │  • Address (UK format with postcode)
      │  • Contact details
      │  • Description
      │  • Amenities: parking, changing rooms, bar, etc.
      │  • Photos
      │  • Opening hours (default + exceptions)
      ▼
[Add Pitches] ─────────────────────────────────────────────────────────────────
      │  For each pitch:
      │    • Name: "Pitch 1", "Main Arena", etc.
      │    • Size: 5v5, 7v7, 11v11
      │    • Surface: 3G, 4G, grass, indoor
      │    • Indoor/outdoor
      │    • Features: floodlights, covered, etc.
      │    • Capacity (spectators)
      ▼
[Set Base Pricing] ────────────────────────────────────────────────────────────
      │  Per pitch:
      │    • Standard hourly rate: £60
      │    • Slot duration: 1 hour (configurable)
      ▼
[Configure Pricing Rules] → See 3.2
      │
      ▼
[Set Deposit Policy] ──────────────────────────────────────────────────────────
      │  • Default deposit: 25% / 50% / 100%
      │  • Rules by:
      │    ├── Time until booking: >7d: no deposit, <7d: 50%, <24h: 100%
      │    ├── User history: new users require deposit, trusted don't
      │    └── Booking type: league games vs casual
      ▼
[Configure Refund/Credit Policy] ──────────────────────────────────────────────
      │  • Cancellation windows and refund %
      │  • Credit bonus for choosing credit over refund
      │  • Credit expiry period
      ▼
[Go Live]
```

### 3.2 Pricing Rules Engine
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PRICING RULES ENGINE                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Pricing Rule Types]

1. TIME-BASED RULES ───────────────────────────────────────────────────────────
   │  Peak hours: Mon-Fri 17:00-21:00 → +20%
   │  Off-peak: Mon-Fri 09:00-17:00 → -15%
   │  Weekend premium: Sat-Sun all day → +10%
   │  Early bird: Before 10:00 → -20%

2. DAY-BASED RULES ────────────────────────────────────────────────────────────
   │  Bank holidays → +25%
   │  School holidays → +10%
   │  Specific dates → custom price

3. BOOKING TYPE RULES ─────────────────────────────────────────────────────────
   │  League booking → -10%
   │  Corporate booking → +15%
   │  Recurring booking → -5%

4. ADVANCE BOOKING RULES ──────────────────────────────────────────────────────
   │  Same-day booking → +10%
   │  7+ days advance → -5%
   │  Last-minute (<2h) → -30% (fill empty slots)

5. PROMOTIONAL RULES ──────────────────────────────────────────────────────────
   │  Promo codes: SUMMER20 → 20% off
   │  First booking discount: -15%
   │  Referral discount: -10%

[Rule Priority]
   1. Promotional (highest) → 2. Booking type → 3. Advance → 4. Time/Day (base)
   Rules can stack or be exclusive (configurable)
```

### 3.3 Staff Check-In Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STAFF CHECK-IN FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Staff Opens Check-In View]
      │
      ▼
[Today's Bookings Dashboard] ──────────────────────────────────────────────────
      │  • List view by time
      │  • Each booking shows:
      │    ├── Time & Pitch
      │    ├── Booking name / Captain name
      │    ├── Payment status: Paid ✓ / Deposit only / Pending
      │    ├── Check-in status: Not arrived / Checked in
      │    └── Quick actions
      ▼
[Customer Arrives]
      │
      ├── [QR Scan] ───────────────────────────────────────────────────────────
      │         │  • Staff scans customer's QR code
      │         │  • OR customer shows code, staff types booking ref
      │         ▼
      │    [Validate Booking]
      │         │  • Correct venue ✓
      │         │  • Correct date/time (within window) ✓
      │         │  • Payment status ✓
      │         ▼
      │    [Check-In Confirmed]
      │         │  • Booking marked as "Checked In"
      │         │  • Time recorded
      │         │  • Pitch unlocked / allocated
      │
      └── [Manual Lookup] ─────────────────────────────────────────────────────
                │  • Search by name / phone / booking ref
                │  • Find booking → Check in
                ▼
           [Check-In Confirmed]

[Payment Issues at Check-In]
      │
      ▼
[Handle Unpaid Balance] ───────────────────────────────────────────────────────
      │  IF deposit only:
      │    • Show remaining balance
      │    • Staff can take payment (card terminal integration or manual)
      │    • Mark as paid
      │  IF no payment:
      │    • Warn staff
      │    • Take full payment or reject entry
```

### 3.4 Issue Logging Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ISSUE LOGGING FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

[Staff or Customer Reports Issue]
      │
      ▼
[Log Issue] ───────────────────────────────────────────────────────────────────
      │  • Select pitch
      │  • Category: Equipment / Surface / Lighting / Facilities / Safety / Other
      │  • Description
      │  • Severity: Low / Medium / High / Critical
      │  • Photos (required for medium+)
      │  • Linked booking (optional)
      ▼
[Issue Created] ───────────────────────────────────────────────────────────────
      │  • Assigned ticket number
      │  • Notifies venue manager
      │  • High/Critical: immediate alert
      ▼
[Triage & Action]
      │
      ├── [Quick Fix] ─────────────────────────────────────────────────────────
      │         │  • Staff resolves on the spot
      │         │  • Mark resolved + add notes
      │         ▼
      │    [Issue Closed]
      │
      └── [Requires Maintenance] ──────────────────────────────────────────────
                │  • Schedule maintenance
                │  • Block affected slots if needed
                │  • Notify affected bookings
                │  • Track repair status
                ▼
           [Maintenance Completed] → [Issue Closed]
```

### 3.5 Maintenance & Closure Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MAINTENANCE & CLOSURE FLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

[Operator Schedules Maintenance]
      │
      ▼
[Create Closure] ──────────────────────────────────────────────────────────────
      │  • Select pitch(es) or entire venue
      │  • Start date/time
      │  • End date/time
      │  • Reason: Maintenance / Weather / Event / Other
      │  • Internal notes
      ▼
[Check Affected Bookings]
      │
      ├── [No Bookings] ───────────────────────────────────────────────────────
      │         │  • Closure applied
      │         │  • Slots blocked in system
      │         ▼
      │    [Done]
      │
      └── [Has Bookings] ──────────────────────────────────────────────────────
                │  • List affected bookings
                │  • Options:
                │    ├── Move to alternative slot (suggest options)
                │    ├── Move to different pitch
                │    ├── Cancel with full refund
                │    └── Cancel with credit
                ▼
           [Notify Affected Customers]
                │  • Email with options
                │  • 48h to choose (or auto-apply venue default)
                ▼
           [Bookings Resolved] → [Closure Applied]
```

### 3.6 Venue Analytics Dashboard
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VENUE ANALYTICS DASHBOARD                                 │
└─────────────────────────────────────────────────────────────────────────────┘

[Dashboard Metrics]

UTILISATION ───────────────────────────────────────────────────────────────────
   │  • Overall utilisation %: booked hours / available hours
   │  • By pitch: which pitches are most/least popular
   │  • By time: heatmap of peak demand
   │  • By day of week
   │  • Trend: this week vs last week vs last month

REVENUE ───────────────────────────────────────────────────────────────────────
   │  • Total revenue (period)
   │  • Revenue by pitch
   │  • Average booking value
   │  • Revenue per available hour
   │  • Deposit vs full payment ratio

BOOKINGS ──────────────────────────────────────────────────────────────────────
   │  • Total bookings
   │  • Booking channels: direct / league / split-pay
   │  • Cancellation rate
   │  • No-show rate (check-in vs booking)
   │  • Repeat booking rate

CUSTOMER ──────────────────────────────────────────────────────────────────────
   │  • New vs returning customers
   │  • Top customers by bookings
   │  • Customer satisfaction (if surveys enabled)

OPERATIONAL ───────────────────────────────────────────────────────────────────
   │  • Open issues by severity
   │  • Average issue resolution time
   │  • Maintenance hours this period
```
