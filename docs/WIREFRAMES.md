# Wireframe Descriptions

## Key Page Wireframes

---

## 1. Landing Page

### Mobile Layout (375px)

```
┌─────────────────────────────────────┐
│ [Logo: KICKER]        [Sign In]     │
├─────────────────────────────────────┤
│                                     │
│  Book a pitch in                    │
│  under 60 seconds                   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📍 Enter postcode or town   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📅 Today ▼    ⏰ 18:00 ▼    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ╔═════════════════════════════╗   │
│  ║    🔍 Find pitches           ║   │
│  ╚═════════════════════════════╝   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Why Kicker?                        │
│                                     │
│  ┌─────┐  Split the cost           │
│  │ 💷  │  No more chasing mates    │
│  └─────┘  for money                 │
│                                     │
│  ┌─────┐  Book instantly           │
│  │ ⚡  │  Real-time availability,  │
│  └─────┘  confirmed in seconds     │
│                                     │
│  ┌─────┐  Manage your team         │
│  │ 👥  │  Availability, rosters,   │
│  └─────┘  no more WhatsApp chaos   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Popular venues near London         │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ [Photo]                      │  │
│  │ Goals Wembley                │  │
│  │ ⭐ 4.8 · 3G · Indoor/Outdoor │  │
│  │ From £45/hr                  │  │
│  └──────────────────────────────┘  │
│                                     │
│  ← [Venue Card] [Venue Card] →      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  "Finally, a booking app that      │
│   just works. Split-pay saved      │
│   our Tuesday game."               │
│                        — Marcus T.  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Join 10,000+ players              │
│                                     │
│  ╔═════════════════════════════╗   │
│  ║    Get started free          ║   │
│  ╚═════════════════════════════╝   │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- Search input: auto-complete with UK postcodes and towns
- Date/time pickers: native mobile selectors
- "Find pitches" button: loading state → navigate to results
- Venue carousel: horizontal scroll with snap points
- Testimonial: subtle auto-rotate every 5s

---

## 2. Search / Availability Grid

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Back     Search Results           │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 📍 Wembley  📅 Today  ⏰ 18:00  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [5v5] [7v7] [Indoor] [3G] [< £50]  │
│                                     │
├─────────────────────────────────────┤
│ Showing 12 venues with availability │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Goals Wembley          0.3 mi  │ │
│ │ ⭐ 4.8 · 3G · Indoor           │ │
│ │                                 │ │
│ │ Available slots:                │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │ │18:00 │ │19:00 │ │20:00 │     │ │
│ │ │ £55  │ │ £55  │ │ £60  │     │ │
│ │ └──────┘ └──────┘ └──────┘     │ │
│ │     ↑ PEAK                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Powerleague Harrow     1.2 mi  │ │
│ │ ⭐ 4.5 · 4G · Outdoor          │ │
│ │                                 │ │
│ │ Available slots:                │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │ │18:00 │ │19:00 │ │⏳HELD│     │ │
│ │ │ £48  │ │ £48  │ │      │     │ │
│ │ └──────┘ └──────┘ └──────┘     │ │
│ │              Waitlist available │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Skeleton loading...]          │ │
│ │ ████████████████               │ │
│ │ ███████ · ████████             │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐     │ │
│ │ │ ████ │ │ ████ │ │ ████ │     │ │
│ │ └──────┘ └──────┘ └──────┘     │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- Slot buttons: tap → initiate hold → navigate to booking
- Held slots: show "HELD" badge with timer or "Join waitlist" CTA
- Filter chips: toggle on/off with animation
- Pull to refresh
- Skeleton loaders while fetching

---

## 3. Booking Flow - Slot Selection with Hold Timer

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Cancel              Goals Wembley │
├─────────────────────────────────────┤
│                                     │
│  Pitch 2 - 5v5 Indoor 3G            │
│  Monday, 15 January 2024            │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ⏱️ Slot held for  9:42       │  │
│  │     ████████████░░░░          │  │
│  │     Complete booking to       │  │
│  │     secure this slot          │  │
│  └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Selected: 18:00 - 19:00            │
│            £55.00                   │
│                                     │
│  Change time:                       │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │17:00 │ │⬛18:00│ │19:00 │        │
│  │ £48  │ │ £55  │ │ £55  │        │
│  │      │ │ SEL  │ │      │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │20:00 │ │21:00 │ │22:00 │        │
│  │ £60  │ │ £55  │ │ £45  │        │
│  │ PEAK │ │      │ │      │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  📍 Goals Wembley                   │
│     Empire Way, Wembley HA9 0WS     │
│     0.3 miles away                  │
│                                     │
│  ✓ 3G surface                       │
│  ✓ Floodlit                         │
│  ✓ Changing rooms                   │
│  ✓ Free parking                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ╔═════════════════════════════╗    │
│  ║   Continue · £55.00          ║    │
│  ╚═════════════════════════════╝    │
│                                     │
└─────────────────────────────────────┘
```

### Interactions
- Hold timer: animated countdown, pulses when < 2 min
- Slot selection: current slot highlighted, others tappable
- "Continue" button: loading spinner → navigate to details
- Cancel: confirm dialog → release hold → back to search

---

## 4. Booking Flow - Payment with Split-Pay

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Back                      Payment │
├─────────────────────────────────────┤
│                                     │
│  ⏱️ 7:23 remaining                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Tuesday Kickabout                  │
│  Goals Wembley · Pitch 2            │
│  Mon 15 Jan · 18:00 - 19:00         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  How would you like to pay?         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ○ Pay in full            £55.00 ││
│  │   You pay everything now        ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ○ Pay deposit            £13.75 ││
│  │   25% now, rest on the day      ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ● Split with teammates          ││
│  │   Everyone pays their share     ││
│  │                                 ││
│  │   How many players?             ││
│  │   [-] 10 [+]                    ││
│  │                                 ││
│  │   Each person pays: £5.50       ││
│  │   You pay now: £5.50            ││
│  │                                 ││
│  │   Payment deadline:             ││
│  │   [24h before kickoff ▼]        ││
│  │                                 ││
│  │   ☐ Auto-charge me if           ││
│  │     others don't pay            ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Credits available: £12.00          │
│  ☑ Apply credits          -£5.50   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Summary                            │
│  ─────────────────────────────      │
│  Your share                 £5.50   │
│  Credits applied           -£5.50   │
│  ─────────────────────────────      │
│  Total due now              £0.00   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ╔═════════════════════════════╗    │
│  ║  Confirm booking · £0.00     ║    │
│  ╚═════════════════════════════╝    │
│                                     │
│  By confirming, you agree to our    │
│  Terms and Cancellation Policy      │
│                                     │
└─────────────────────────────────────┘
```

### Interactions
- Payment option cards: radio selection with expand animation
- Player count: +/- buttons update share calculation in real-time
- Credits toggle: updates total immediately
- "Confirm booking": loading → success → confirmation page
- Stripe card form appears if payment > £0

---

## 5. Booking Confirmation

### Mobile Layout

```
┌─────────────────────────────────────┐
│                                     │
│            ✓                        │
│        (success animation)          │
│                                     │
│      Booking confirmed!             │
│                                     │
│      Ref: KCK-2024-8X7Y             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Tuesday Kickabout                  │
│  ─────────────────────────────      │
│  📍 Goals Wembley, Pitch 2          │
│  📅 Monday, 15 January 2024         │
│  ⏰ 18:00 - 19:00                   │
│  👥 10 players (split-pay)          │
│  💷 £5.50 per person                │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │         [QR CODE]           │    │
│  │                             │    │
│  │     Show this on arrival    │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📱 Invite players to pay    │    │
│  │    0/10 paid                │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📤 Share to WhatsApp        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📅 Add to calendar          │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🔄 Book same time next week │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │    View booking details →   │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- Success animation: checkmark draws, then confetti burst (respects reduced motion)
- QR code: tap to enlarge
- "Invite players": opens invite flow with share options
- "Share to WhatsApp": pre-filled message with booking details
- "Add to calendar": .ics download or Google/Apple deep link
- "Book same time next week": one-tap rebook flow

---

## 6. Booking History with One-Tap Rebook

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ☰                        My Bookings│
├─────────────────────────────────────┤
│                                     │
│ [Upcoming] [Past] [Cancelled]       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ UPCOMING                            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Tuesday Kickabout        ● PAID │ │
│ │ ───────────────────────────     │ │
│ │ 📍 Goals Wembley                │ │
│ │ 📅 Mon 15 Jan · 18:00           │ │
│ │ 👥 8/10 paid                    │ │
│ │                                 │ │
│ │ ┌──────────┐ ┌────────────────┐ │ │
│ │ │ Manage   │ │ View QR code   │ │ │
│ │ └──────────┘ └────────────────┘ │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ PAST                                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Monday Night Football          │ │
│ │ ───────────────────────────     │ │
│ │ 📍 Powerleague Harrow          │ │
│ │ 📅 Mon 8 Jan · 19:00            │ │
│ │ ✓ Completed                     │ │
│ │                                 │ │
│ │ ╔════════════════════════════╗  │ │
│ │ ║ 🔄 Same time next week?    ║  │ │
│ │ ╚════════════════════════════╝  │ │
│ │                                 │ │
│ │ [View details]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Sunday Friendlies              │ │
│ │ ───────────────────────────     │ │
│ │ 📍 Goals Wembley                │ │
│ │ 📅 Sun 7 Jan · 10:00            │ │
│ │ ✓ Completed                     │ │
│ │                                 │ │
│ │ ╔════════════════════════════╗  │ │
│ │ ║ 🔄 Same time this Sunday?  ║  │ │
│ │ ╚════════════════════════════╝  │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- Tab switching: smooth transition animation
- Rebook button: checks availability → if available, one-tap book → confirmation
- If slot unavailable: show alternatives or waitlist option
- Pull to refresh
- Booking card tap: expand to full details

---

## 7. Team Page - Availability & Invites

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Back                  FC Legends  │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │      [Team Logo/Avatar]         │ │
│ │         FC Legends              │ │
│ │    12 players · 5-a-side        │ │
│ │    Division 2 - Monday League   │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [Squad] [Fixtures] [Availability]   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ NEXT FIXTURE                        │
│ ┌─────────────────────────────────┐ │
│ │ vs Real Ballers                 │ │
│ │ Mon 15 Jan · 19:00              │ │
│ │ Goals Wembley                   │ │
│ │                                 │ │
│ │ Your status: [Select ▼]         │ │
│ │                                 │ │
│ │ ┌─────┐ ┌─────┐ ┌─────┐        │ │
│ │ │ ✓   │ │ ?   │ │ ✗   │        │ │
│ │ │ IN  │ │MAYBE│ │ OUT │        │ │
│ │ └─────┘ └─────┘ └─────┘        │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ AVAILABILITY                        │
│ ───────────────                     │
│ 7 In · 2 Maybe · 1 Out · 2 No reply │
│                                     │
│ ✓ Marcus T.  (C)    IN              │
│ ✓ James W.          IN              │
│ ✓ David K.          IN              │
│ ✓ Chris M.          IN              │
│ ✓ Tom S.            IN              │
│ ✓ Alex B.           IN              │
│ ✓ Ryan P.           IN              │
│ ? Steve H.          MAYBE           │
│ ? Dan L.            MAYBE           │
│ ✗ Mike R.           OUT             │
│ - Paul J.           No reply        │
│ - Sam G.            No reply        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ BENCH LIST                          │
│ ───────────────                     │
│ Players who can fill in:            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Ben C.       Usually available  │ │
│ │ [Invite to fill gap]            │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Luke T.      Last played 2w ago │ │
│ │ [Invite to fill gap]            │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║  Find players nearby             ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- Status selection: tap In/Maybe/Out → immediate update with feedback
- Availability list: real-time updates
- "Invite to fill gap": send notification to bench player
- "Find players nearby": navigate to player finder with context

---

## 8. Player Finder Page

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Back                 Player Finder│
├─────────────────────────────────────┤
│                                     │
│ [Find Games] [Post a Game]          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Games looking for players           │
│ Near: Wembley · Today               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔥 2 spots left!                │ │
│ │ ───────────────────────         │ │
│ │ FC Legends need 2 players       │ │
│ │ 📍 Goals Wembley                │ │
│ │ 📅 Tonight · 19:00              │ │
│ │ 💷 £6 per person                │ │
│ │ ⚽ 5-a-side · Intermediate      │ │
│ │                                 │ │
│ │ "Need 2 for our Monday game,    │ │
│ │  friendly and competitive!"     │ │
│ │                                 │ │
│ │ ╔═════════════════════════════╗ │ │
│ │ ║   Join & pay £6.00          ║ │ │
│ │ ╚═════════════════════════════╝ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 4 spots left                    │ │
│ │ ───────────────────────         │ │
│ │ Sunday Football Club            │ │
│ │ 📍 Powerleague Harrow           │ │
│ │ 📅 Sun 14 Jan · 14:00           │ │
│ │ 💷 £8 per person                │ │
│ │ ⚽ 7-a-side · All levels        │ │
│ │                                 │ │
│ │ "Casual kickabout, all welcome" │ │
│ │                                 │ │
│ │ ╔═════════════════════════════╗ │ │
│ │ ║   Join & pay £8.00          ║ │ │
│ │ ╚═════════════════════════════╝ │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Can't find a game?                  │
│ ┌─────────────────────────────────┐ │
│ │ Post that you're looking for    │ │
│ │ a game and get matched          │ │
│ │                                 │ │
│ │ [I'm looking for a game →]      │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

### Interactions
- "Join & pay": payment flow → confirmation → added to game
- Filter by location, date, skill level
- Real-time spot count updates
- "I'm looking for a game": passive matching feature

---

## 9. League Table + Fixtures

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ← Back            Monday Night 5s   │
├─────────────────────────────────────┤
│                                     │
│ [Table] [Fixtures] [Results] [Stats]│
│                                     │
├─────────────────────────────────────┤
│                                     │
│ DIVISION 1 · WEEK 8                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ #  Team              P  GD  Pts │ │
│ │ ───────────────────────────────│ │
│ │ 1  FC Legends        7  +12  18 │ │
│ │ 2  Real Ballers      7  +8   16 │ │
│ │ 3  Athletic Stars    7  +5   14 │ │
│ │ 4  United FC         7  +2   11 │ │
│ │ 5  Dynamo            7  -3   8  │ │
│ │ 6  Rovers            7  -8   5  │ │
│ │ 7  City Boys         7  -7   4  │ │
│ │ 8  Wanderers         7  -9   3  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🏆 Champions zone                   │
│ ⬇️ Relegation zone                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ NEXT FIXTURES · Week 8              │
│                                     │
│ Monday, 15 January                  │
│ ┌─────────────────────────────────┐ │
│ │ 18:00 · Pitch 1                 │ │
│ │ FC Legends vs Real Ballers      │ │
│ │ [Add to calendar]               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 18:00 · Pitch 2                 │ │
│ │ Athletic Stars vs United FC     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 19:00 · Pitch 1                 │ │
│ │ Dynamo vs Rovers                │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 19:00 · Pitch 2                 │ │
│ │ City Boys vs Wanderers          │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ RECENT RESULTS · Week 7             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ FC Legends    3 - 1  Dynamo     │ │
│ │ ✓ Confirmed                     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Real Ballers  2 - 2  Athletic   │ │
│ │ ✓ Confirmed                     │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Home] [Search] [Book] [Teams] [👤] │
└─────────────────────────────────────┘
```

---

## 10. Result Submission / Confirmation

### Mobile Layout (Captain View)

```
┌─────────────────────────────────────┐
│ ← Back               Submit Result  │
├─────────────────────────────────────┤
│                                     │
│ FC Legends vs Real Ballers          │
│ Monday, 15 January · 18:00          │
│ Goals Wembley · Pitch 1             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ FINAL SCORE                         │
│                                     │
│ ┌───────────────────────────────┐   │
│ │  FC Legends    Real Ballers   │   │
│ │                               │   │
│ │    [-] 3 [+]    [-] 2 [+]     │   │
│ │                               │   │
│ │     (You)        (Away)       │   │
│ └───────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ GOAL SCORERS (optional)             │
│                                     │
│ FC Legends:                         │
│ ┌─────────────────────────────────┐ │
│ │ Marcus T. ⚽⚽                   │ │
│ │ James W. ⚽                     │ │
│ │ [+ Add scorer]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ CARDS ISSUED (optional)             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🟨 Steve H. (Real Ballers)     │ │
│ │ [+ Add card]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ NOTES (optional)                    │
│ ┌─────────────────────────────────┐ │
│ │ Great game, competitive but    │ │
│ │ fair...                        │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║       Submit result              ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
│ The opposing captain will need to   │
│ confirm this result.                │
│                                     │
└─────────────────────────────────────┘
```

---

## 11. Dispute Flow

### Mobile Layout (Away Captain Disputing)

```
┌─────────────────────────────────────┐
│ ← Back               Confirm Result │
├─────────────────────────────────────┤
│                                     │
│ FC Legends submitted:               │
│                                     │
│ ┌───────────────────────────────┐   │
│ │  FC Legends  3 - 2  Real Ball │   │
│ └───────────────────────────────┘   │
│                                     │
│ Do you agree with this result?      │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ ✓ Yes, confirm result         │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ ✗ No, I dispute this          │   │
│ └───────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ DISPUTE DETAILS                     │
├─────────────────────────────────────┤
│                                     │
│ What actually happened?             │
│                                     │
│ Correct score:                      │
│ ┌───────────────────────────────┐   │
│ │  FC Legends    Real Ballers   │   │
│ │    [-] 2 [+]    [-] 3 [+]     │   │
│ └───────────────────────────────┘   │
│                                     │
│ Reason:                             │
│ ┌─────────────────────────────────┐ │
│ │ ○ Wrong score                   │ │
│ │ ● Wrong cards recorded          │ │
│ │ ○ Match didn't happen           │ │
│ │ ○ Other                         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Explanation:                        │
│ ┌─────────────────────────────────┐ │
│ │ The yellow card was given to   │ │
│ │ our player Dan, not Steve...   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Evidence (photos, screenshots):     │
│ ┌─────────────────────────────────┐ │
│ │ [+ Upload evidence]             │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║      Submit dispute              ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
│ The league organiser will review    │
│ and make a final decision.          │
│                                     │
└─────────────────────────────────────┘
```

---

## 12. Venue Admin - Pitches & Pricing

### Mobile Layout

```
┌─────────────────────────────────────┐
│ ☰            Goals Wembley · Admin  │
├─────────────────────────────────────┤
│                                     │
│ [Overview][Pitches][Pricing][Issues]│
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TODAY'S SNAPSHOT                    │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ │   12    │ │   85%   │ │  £540   ││
│ │Bookings │ │Occupancy│ │ Revenue ││
│ └─────────┘ └─────────┘ └─────────┘│
│                                     │
├─────────────────────────────────────┤
│                                     │
│ PITCHES                             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Pitch 1                    ✓ ON│ │
│ │ 5v5 · 3G · Indoor              │ │
│ │ Base rate: £55/hr              │ │
│ │ Today: 4/6 slots booked        │ │
│ │ [Edit] [View schedule]         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Pitch 2                    ✓ ON│ │
│ │ 5v5 · 3G · Indoor              │ │
│ │ Base rate: £55/hr              │ │
│ │ Today: 5/6 slots booked        │ │
│ │ [Edit] [View schedule]         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Main Arena              ⚠️ MAINT│ │
│ │ 7v7 · 3G · Outdoor             │ │
│ │ Maintenance until 18 Jan       │ │
│ │ [Edit] [End maintenance]       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [+ Add pitch]                       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ACTIVE PRICING RULES                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⏰ Peak hours           +20%   │ │
│ │ Mon-Fri 17:00-21:00            │ │
│ │ [Edit]                         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🌅 Early bird           -15%   │ │
│ │ Before 10:00                   │ │
│ │ [Edit]                         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🏆 League discount      -10%   │ │
│ │ League bookings                │ │
│ │ [Edit]                         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [+ Add pricing rule]                │
│                                     │
├─────────────────────────────────────┤
│ [Dashboard][Bookings][Check-in][⚙️] │
└─────────────────────────────────────┘
```

---

## 13. Staff Check-In (QR Validation)

### Mobile Layout

```
┌─────────────────────────────────────┐
│ Goals Wembley          Staff: Sarah │
├─────────────────────────────────────┤
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║                                 ║ │
│ ║     📷 Scan QR Code            ║ │
│ ║                                 ║ │
│ ║   [Camera viewfinder area]     ║ │
│ ║                                 ║ │
│ ║                                 ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
│ Or search: [Enter name or ref...]   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TODAY'S BOOKINGS                    │
│                                     │
│ NOW · 18:00-19:00                   │
│ ┌─────────────────────────────────┐ │
│ │ ✓ Tuesday Kickabout     ARRIVED│ │
│ │   Pitch 1 · Marcus T.          │ │
│ │   Paid in full · 18:03         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ⏳ League Match         PENDING│ │
│ │   Pitch 2 · FC Legends         │ │
│ │   Paid in full                 │ │
│ │   [Check in manually]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ NEXT · 19:00-20:00                  │
│ ┌─────────────────────────────────┐ │
│ │ ○ Thursday Football     WAITING│ │
│ │   Pitch 1 · James W.           │ │
│ │   ⚠️ Deposit only: £15 due     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ○ Open Booking          WAITING│ │
│ │   Pitch 2 · TBC                │ │
│ │   Split-pay: 8/10 paid         │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [🚨 Report issue]                   │
│                                     │
├─────────────────────────────────────┤
│ [Today][Tomorrow][Search][Report]   │
└─────────────────────────────────────┘
```

### QR Scan Success State

```
┌─────────────────────────────────────┐
│ Goals Wembley          Staff: Sarah │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │           ✓                     │ │
│ │      (Green checkmark)          │ │
│ │                                 │ │
│ │     Booking verified!           │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Tuesday Kickabout                   │
│ ──────────────────────              │
│ Ref: KCK-2024-8X7Y                  │
│ Pitch 1 · 18:00-19:00               │
│ Captain: Marcus Thompson            │
│ Payment: ✓ Paid in full             │
│                                     │
│ ╔═════════════════════════════════╗ │
│ ║       Confirm check-in           ║ │
│ ╚═════════════════════════════════╝ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⚠️ Report an issue              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Scan another]                      │
│                                     │
└─────────────────────────────────────┘
```
