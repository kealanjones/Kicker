# Information Architecture & Page List

## Site Map

```
Kicker Platform
│
├── PUBLIC PAGES
│   ├── / (Landing)
│   ├── /search (Venue Search & Availability)
│   ├── /venues/[slug] (Venue Profile)
│   ├── /leagues (Public League Listings)
│   ├── /leagues/[id] (Public League Page - Table, Fixtures)
│   ├── /player-finder (Find Games Near You)
│   ├── /login
│   ├── /register
│   ├── /forgot-password
│   └── /verify-email
│
├── BOOKING FLOW (authenticated)
│   ├── /book/[venueId]/[pitchId] (Slot Selection with Hold Timer)
│   ├── /book/details (Booking Details Form)
│   ├── /book/payment (Payment & Split-Pay Setup)
│   ├── /book/confirmation/[bookingId] (Success + Share)
│   └── /pay/[shareToken] (Split-Pay Participant Payment)
│
├── USER DASHBOARD
│   ├── /dashboard (Overview)
│   ├── /bookings (Booking History)
│   ├── /bookings/[id] (Booking Detail + Manage)
│   ├── /wallet (Credits & Transactions)
│   ├── /teams (My Teams)
│   ├── /teams/[id] (Team Management)
│   ├── /teams/[id]/availability (Availability for Fixture)
│   ├── /leagues/my (My Leagues - as player/captain)
│   ├── /notifications (Notification Centre)
│   └── /settings (Profile, Preferences, Privacy)
│
├── TEAM CAPTAIN
│   ├── /teams/create (Create Team)
│   ├── /teams/[id]/edit (Edit Team)
│   ├── /teams/[id]/roster (Manage Roster & Bench)
│   ├── /teams/[id]/invites (Invite Players)
│   └── /teams/[id]/payments (Team Payment Status)
│
├── LEAGUE ORGANISER
│   ├── /organiser (Organiser Dashboard)
│   ├── /organiser/leagues/create (Create League)
│   ├── /organiser/leagues/[id] (League Admin)
│   ├── /organiser/leagues/[id]/teams (Manage Teams)
│   ├── /organiser/leagues/[id]/fixtures (Generate & Manage Fixtures)
│   ├── /organiser/leagues/[id]/results (Results & Verification)
│   ├── /organiser/leagues/[id]/disputes (Dispute Resolution)
│   ├── /organiser/leagues/[id]/discipline (Cards, Bans, Fines)
│   ├── /organiser/leagues/[id]/standings (Table & Stats)
│   └── /organiser/leagues/[id]/settings (League Settings)
│
├── VENUE OPERATOR
│   ├── /venue-admin (Venue Dashboard)
│   ├── /venue-admin/venues/[id] (Venue Overview)
│   ├── /venue-admin/venues/[id]/pitches (Pitch Management)
│   ├── /venue-admin/venues/[id]/availability (Manage Slots)
│   ├── /venue-admin/venues/[id]/pricing (Pricing Rules)
│   ├── /venue-admin/venues/[id]/bookings (All Bookings)
│   ├── /venue-admin/venues/[id]/closures (Maintenance & Closures)
│   ├── /venue-admin/venues/[id]/issues (Issue Log)
│   ├── /venue-admin/venues/[id]/analytics (Utilisation & Revenue)
│   ├── /venue-admin/venues/[id]/settings (Venue Settings)
│   └── /venue-admin/venues/[id]/policies (Refund/Credit Policies)
│
├── STAFF
│   ├── /staff (Staff Dashboard)
│   ├── /staff/check-in (QR Check-In View)
│   └── /staff/issues/report (Report Issue)
│
└── PLATFORM ADMIN (future)
    ├── /admin
    ├── /admin/venues
    ├── /admin/users
    └── /admin/analytics
```

## Page Purposes & Key Components

### Public Pages

| Page | Purpose | Key Components |
|------|---------|----------------|
| Landing | Convert visitors to searchers/signups | Hero search, value props, venue carousel, social proof |
| Search | Find available pitches | Location input, filters, availability grid, venue cards |
| Venue Profile | Venue details & direct booking | Photos, amenities, reviews, pitch list, availability preview |
| Public League | View league standings | Table, fixtures, results, team list |
| Player Finder | Find open games | Game cards with spots available, filters, accept flow |
| Auth pages | Registration & login | Forms with magic link option, OAuth buttons |

### Booking Flow

| Page | Purpose | Key Components |
|------|---------|----------------|
| Slot Selection | Choose time slot | Calendar, time grid, hold timer, pitch selector |
| Booking Details | Configure booking | Booking name, player count, payment option selector |
| Payment | Complete transaction | Stripe Elements, credit application, split-pay invites |
| Confirmation | Celebrate & share | Success animation, QR code, share buttons, calendar add |
| Split-Pay Page | Participant payment | Booking summary, pay button, already paid state |

### User Dashboard

| Page | Purpose | Key Components |
|------|---------|----------------|
| Dashboard | Overview & quick actions | Upcoming bookings, team status, action cards |
| Bookings | History & management | Booking cards, filters, rebook buttons, cancel option |
| Booking Detail | Single booking | Full details, payment status, participants, QR, manage |
| Wallet | Credit management | Balance card, transaction history, expiry warnings |
| Teams | Team overview | Team cards, join requests, create CTA |
| Team Page | Team management | Roster, upcoming fixtures, availability |
| Notifications | Alert centre | Notification list, mark read, action links |
| Settings | User preferences | Profile form, notification prefs, privacy controls |

### Team Captain

| Page | Purpose | Key Components |
|------|---------|----------------|
| Create Team | New team setup | Form: name, sport, invite method |
| Edit Team | Update team info | Same as create, delete option |
| Roster | Manage players | Player list, roles, remove, bench toggle |
| Invites | Send invitations | Email/phone input, share link, pending list |
| Team Payments | Track collection | Split-pay status per booking, reminder buttons |

### League Organiser

| Page | Purpose | Key Components |
|------|---------|----------------|
| Organiser Dashboard | Overview | League cards, pending actions, quick stats |
| Create League | League setup wizard | Multi-step form: info, format, schedule, fees |
| League Admin | Manage league | Stats overview, quick actions, warnings |
| Manage Teams | Team administration | Team list, registration status, payments |
| Fixtures | Fixture management | Calendar view, drag-drop reschedule, generate |
| Results | Score management | Match list, submission status, verify/reject |
| Disputes | Resolve conflicts | Dispute queue, evidence viewer, decision panel |
| Discipline | Cards & bans | Player discipline table, add card, review bans |
| Standings | Table management | Live table, stat leaders, manual adjustments |
| League Settings | Configuration | Rules, fees, registration, visibility |

### Venue Operator

| Page | Purpose | Key Components |
|------|---------|----------------|
| Venue Dashboard | Overview | Revenue stats, today's bookings, alerts |
| Venue Overview | Venue snapshot | Key metrics, pitch status, quick actions |
| Pitch Management | Configure pitches | Pitch cards, edit details, availability toggle |
| Availability | Slot management | Weekly grid, bulk editing, block slots |
| Pricing Rules | Price configuration | Rule builder, preview calculator, active rules |
| All Bookings | Booking management | Filterable list, status indicators, actions |
| Closures | Schedule maintenance | Calendar, create closure, notify affected |
| Issue Log | Track problems | Issue list, status pipeline, resolution |
| Analytics | Business insights | Charts: utilisation, revenue, trends |
| Policies | Refund/credit rules | Policy builder, default settings |

### Staff

| Page | Purpose | Key Components |
|------|---------|----------------|
| Staff Dashboard | Daily overview | Today's schedule, check-in stats |
| Check-In | Validate arrivals | QR scanner, search, booking details, confirm |
| Report Issue | Log problems | Category picker, severity, photo upload, submit |

---

## Navigation Structure

### Mobile Bottom Navigation (authenticated)
```
[Home] [Search] [Bookings] [Teams] [Profile]
```

### Desktop Header Navigation
```
Logo | Search | Leagues | Player Finder | [My Account dropdown]
```

### My Account Dropdown
```
Dashboard
My Bookings
My Teams
Wallet (£30.00)
───────────
Notifications (3)
Settings
───────────
[Captain] Team Admin
[Organiser] League Admin
[Operator] Venue Admin
───────────
Sign Out
```

---

## Role-Based Access

| Page Area | Player | Captain | Organiser | Operator | Staff |
|-----------|--------|---------|-----------|----------|-------|
| Public pages | ✓ | ✓ | ✓ | ✓ | ✓ |
| Booking flow | ✓ | ✓ | ✓ | ✓ | - |
| User dashboard | ✓ | ✓ | ✓ | ✓ | - |
| Team captain | - | ✓ | ✓ | - | - |
| League organiser | - | - | ✓ | - | - |
| Venue operator | - | - | - | ✓ | - |
| Staff | - | - | - | - | ✓ |
