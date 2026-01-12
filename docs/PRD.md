# Kicker - UK 5-a-Side Football Platform
## Product Requirements Document (PRD)

### Version 1.0 - MVP

---

## 1. Executive Summary

**Kicker** is a mobile-first web platform for booking 5-a-side football pitches, managing teams, running leagues, and operating venues. We compete with Powerleague and PlayFootball by being faster, simpler, and delivering a premium experience through thoughtful microinteractions.

**Primary KPI:** Time-to-book under 60 seconds for returning users.

**Secondary KPIs:**
- Booking drop-off rate < 15%
- Customer support tickets < 2% of bookings
- Repeat booking rate > 40%
- No-show rate < 8%

---

## 2. Product Principles

| Principle | Implementation |
|-----------|----------------|
| Two-tap mindset | Every core action reachable in 2-3 steps |
| Zero confusion | Clear British English, no jargon, minimal forms |
| Microinteractions matter | Feedback, progress, delight, trust signals |
| Speed is a feature | Optimistic UI, instant perceived performance |
| UK-first | GDPR, GBP, UK addresses, VAT invoices |
| Meet users where they are | Default WhatsApp + calendar sharing |

---

## 3. Target Users & Jobs-to-be-Done

### 3.1 Player
- Find nearby pitches or open games
- Book a pitch with mates
- Join a team or fill gaps
- Pay quickly, see confirmations instantly
- View fixtures, results, league tables

### 3.2 Team Captain
- Create team, invite squad, track availability (In/Maybe/Out)
- Collect money without chasing (split-pay, reminders, auto-release)
- Manage bench list and auto-fill gaps
- Report and verify scores

### 3.3 League Organiser
- Create leagues with rules, formats, fixture constraints
- Auto-generate fixtures, manage postponements
- Resolve disputes cleanly
- Publish tables, stats, discipline
- Communicate via email/in-app and WhatsApp

### 3.4 Venue Operator
- Manage pitch inventory, hours, blackout times, maintenance
- Set pricing rules: peak/off-peak/promos/deposits
- Staff check-in view with issue logging
- Refunds/credits policy engine
- View utilisation and revenue

---

## 4. MVP Scope Definition

### 4.1 In Scope (Must Ship)

#### Booking & Payments
- [x] Search by location, date/time, pitch size, surface, indoor/outdoor
- [x] Real-time availability grid
- [x] Hold-to-book timer with visible countdown
- [x] Booking flow: select slot → details → payment/deposit → confirmation
- [x] Split-pay: captain books, invites participants, each pays share
- [x] Auto reminders before payment deadline
- [x] Auto-release if unpaid by deadline (or charge captain option)
- [x] Credits wallet for instant refunds
- [x] Waitlist with auto-fill notifications
- [x] Booking history + one-tap rebook
- [x] WhatsApp share + Add-to-Calendar

#### Teams
- [x] Create team with invites and roles (captain/member)
- [x] Availability tracking (In/Maybe/Out)
- [x] Bench list for auto-fill
- [x] Player finder: post "Need X players", accept, pay

#### Leagues
- [x] Create league from templates (round robin)
- [x] Fixture generator with constraints (blackout dates, kick-off windows)
- [x] Result submission with dual captain confirmation
- [x] Dispute flow with evidence upload
- [x] Live tables with fixtures and basic stats
- [x] Discipline module (yellow/red cards, auto bans)

#### Venue Operations
- [x] Manage venue, pitches, inventory
- [x] Pricing rules (peak/off-peak) + configurable deposits
- [x] Maintenance blocking with auto-notifications
- [x] Staff check-in view with QR scanning
- [x] Issue logging with photos
- [x] Basic analytics: utilisation, cancellations, no-show rate, repeat rate

#### Admin & Comms
- [x] Venue admin dashboard
- [x] League admin dashboard
- [x] Email + in-app notifications
- [x] Default WhatsApp and calendar sharing

### 4.2 Out of Scope (Phase 2)
- Subscriptions/memberships
- Dynamic pricing and last-minute deals
- Late cancellation marketplace
- Corporate teams mode with invoicing
- Referees marketplace
- PWA with push notifications
- Advanced analytics and reporting

---

## 5. Assumptions

1. Users have smartphones with WhatsApp installed
2. Venues can provide accurate availability data
3. Stripe is available for UK payments
4. Users will self-rate skill levels honestly (with calibration over time)
5. Most bookings are made 1-7 days in advance
6. Average team size is 7-10 players for 5-a-side
7. Captains are motivated to manage payments if given good tools

---

## 6. Success Metrics (MVP)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time-to-book (returning user) | < 60 seconds | Analytics event timing |
| Booking completion rate | > 85% | Funnel analytics |
| Split-pay completion rate | > 70% | Payment events |
| Waitlist conversion | > 30% | Auto-fill success |
| No-show rate | < 8% | Check-in data |
| Repeat booking rate | > 40% | User cohort analysis |
| Support tickets per booking | < 2% | Ticket count / bookings |
| NPS | > 50 | Quarterly survey |

---

## 7. Technical Requirements

### 7.1 Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js with email magic links + OAuth
- **Payments:** Stripe (Payment Intents, Connect for split-pay)
- **Hosting:** Vercel + managed Postgres (Neon/Supabase)
- **Notifications:** Resend (email) + in-app DB notifications
- **Analytics:** PostHog for product analytics

### 7.2 Non-Functional Requirements
- Page load < 1.5s on 3G
- API response < 200ms p95
- 99.9% uptime
- GDPR compliant with data export/delete
- WCAG 2.1 AA accessibility
- Mobile-first responsive design

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Double-booking race conditions | High | Optimistic locking + hold timer |
| Payment failures mid-split | Medium | Clear status UI, retry mechanism |
| Venue data quality | Medium | Validation rules, staff training |
| Low split-pay adoption | Medium | Default on, clear value prop |
| No-shows despite deposits | Low | Tiered deposit rules, ban system |

---

## 9. Open Questions

1. What is the optimal hold timer duration? (Starting with 10 minutes)
2. Should captains be able to opt-in to auto-charge? (Yes, optional)
3. How long should credits be valid? (12 months proposed)
4. What is the minimum deposit percentage? (25% proposed)
5. How do we handle fixture clashes across leagues? (First-come basis)

---

## 10. Glossary

- **Split-pay:** Booking cost divided among participants, each paying their share
- **Hold timer:** Countdown during which a slot is reserved for a user
- **Credits wallet:** Account balance usable for future bookings
- **Bench list:** Reserve players who can auto-fill when regulars are unavailable
- **Player finder:** Feature to recruit players for a specific game
- **Dual confirmation:** Both team captains must verify a match result
