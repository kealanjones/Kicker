# Frontend Component Plan & Microinteraction Checklist

## Component Architecture

```
src/
├── components/
│   ├── ui/                    # Base UI components (shadcn/ui extended)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tabs.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   │
│   ├── forms/                 # Form components
│   │   ├── form-field.tsx
│   │   ├── location-input.tsx
│   │   ├── date-picker.tsx
│   │   ├── time-picker.tsx
│   │   ├── phone-input.tsx
│   │   ├── price-input.tsx
│   │   └── file-upload.tsx
│   │
│   ├── layout/                # Layout components
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── sidebar.tsx
│   │   ├── page-container.tsx
│   │   ├── section.tsx
│   │   └── footer.tsx
│   │
│   ├── booking/               # Booking domain
│   │   ├── availability-grid.tsx
│   │   ├── slot-button.tsx
│   │   ├── hold-timer.tsx
│   │   ├── booking-summary.tsx
│   │   ├── payment-options.tsx
│   │   ├── split-pay-setup.tsx
│   │   ├── participant-list.tsx
│   │   ├── booking-card.tsx
│   │   ├── booking-qr.tsx
│   │   ├── rebook-button.tsx
│   │   └── confirmation-success.tsx
│   │
│   ├── venue/                 # Venue domain
│   │   ├── venue-card.tsx
│   │   ├── venue-header.tsx
│   │   ├── pitch-card.tsx
│   │   ├── amenity-list.tsx
│   │   ├── pricing-rule-card.tsx
│   │   ├── closure-form.tsx
│   │   ├── issue-form.tsx
│   │   └── analytics-chart.tsx
│   │
│   ├── team/                  # Team domain
│   │   ├── team-card.tsx
│   │   ├── member-list.tsx
│   │   ├── availability-picker.tsx
│   │   ├── availability-summary.tsx
│   │   ├── invite-form.tsx
│   │   ├── bench-list.tsx
│   │   └── player-finder-card.tsx
│   │
│   ├── league/                # League domain
│   │   ├── standings-table.tsx
│   │   ├── fixture-card.tsx
│   │   ├── fixture-list.tsx
│   │   ├── result-form.tsx
│   │   ├── result-confirmation.tsx
│   │   ├── dispute-form.tsx
│   │   ├── discipline-table.tsx
│   │   └── stats-card.tsx
│   │
│   ├── payments/              # Payment components
│   │   ├── stripe-form.tsx
│   │   ├── payment-summary.tsx
│   │   ├── wallet-card.tsx
│   │   ├── credit-balance.tsx
│   │   └── transaction-list.tsx
│   │
│   ├── notifications/         # Notification components
│   │   ├── notification-bell.tsx
│   │   ├── notification-item.tsx
│   │   ├── notification-list.tsx
│   │   └── toast-container.tsx
│   │
│   └── shared/                # Shared components
│       ├── empty-state.tsx
│       ├── error-boundary.tsx
│       ├── loading-spinner.tsx
│       ├── share-buttons.tsx
│       ├── calendar-add.tsx
│       ├── whatsapp-share.tsx
│       ├── qr-scanner.tsx
│       └── countdown-timer.tsx
│
├── hooks/                     # Custom hooks
│   ├── use-booking-hold.ts
│   ├── use-availability.ts
│   ├── use-split-pay.ts
│   ├── use-wallet.ts
│   ├── use-notifications.ts
│   ├── use-location.ts
│   ├── use-countdown.ts
│   └── use-media-query.ts
│
├── lib/                       # Utilities
│   ├── utils.ts
│   ├── api.ts
│   ├── stripe.ts
│   ├── dates.ts
│   ├── currency.ts
│   ├── validation.ts
│   └── analytics.ts
│
└── styles/                    # Global styles
    ├── globals.css
    └── animations.css
```

---

## Core UI Components

### Button

```tsx
// Extended from shadcn/ui with loading and success states

interface ButtonProps {
  variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size: 'sm' | 'default' | 'lg' | 'icon';
  isLoading?: boolean;
  isSuccess?: boolean;
  loadingText?: string;
}

// States:
// - Default: idle state
// - Hover: scale(1.02), shadow increase
// - Pressed: scale(0.98)
// - Loading: spinner + loadingText
// - Success: checkmark animation, green tint
// - Disabled: opacity 50%, no interactions
// - Error: shake animation
```

### Slot Button

```tsx
// Booking slot selection button

interface SlotButtonProps {
  time: string;
  price: number;
  status: 'available' | 'held' | 'booked' | 'selected';
  isPeak?: boolean;
  holdTimeRemaining?: number; // seconds
  onSelect: () => void;
  onWaitlist: () => void;
}

// Visual states:
// - Available: green border, clickable
// - Selected: green fill, checkmark
// - Held: amber border, timer badge, "Join waitlist" option
// - Booked: grey, disabled
// - Peak: small "PEAK" badge
```

### Hold Timer

```tsx
// Countdown timer for slot hold

interface HoldTimerProps {
  expiresAt: Date;
  onExpire: () => void;
  variant: 'bar' | 'compact' | 'full';
}

// Behaviour:
// - Countdown with progress bar
// - Pulse animation when < 2 minutes
// - Red colour when < 1 minute
// - Flash warning at 30 seconds
// - Auto-trigger onExpire callback
```

### Availability Grid

```tsx
// Time slot grid for venue search results

interface AvailabilityGridProps {
  venue: Venue;
  date: Date;
  slots: AvailabilitySlot[];
  selectedSlotId?: string;
  onSlotSelect: (slot: AvailabilitySlot) => void;
  isLoading?: boolean;
}

// Features:
// - Horizontal scroll on mobile
// - Skeleton loaders while fetching
// - Real-time updates via polling/websocket
// - Snap scroll to slots
```

### Skeleton Loaders

```tsx
// Loading placeholders for async content

// Variants:
// - SkeletonCard: venue/booking card placeholder
// - SkeletonTable: league table placeholder
// - SkeletonGrid: availability grid placeholder
// - SkeletonList: list items placeholder

// Animation: shimmer effect (left-to-right gradient)
// Respects: prefers-reduced-motion
```

### Toast Notifications

```tsx
interface ToastProps {
  variant: 'default' | 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

// Behaviour:
// - Slide in from top-right (desktop) or bottom (mobile)
// - Auto-dismiss after duration
// - Swipe to dismiss on mobile
// - Stack multiple toasts
// - Action button for "Undo", "View", etc.
```

### Empty States

```tsx
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Examples:
// - "No bookings yet" → "Book your first game"
// - "No teams" → "Create or join a team"
// - "No fixtures" → "Fixtures will appear when generated"
```

---

## Microinteraction Checklist

### Global Interactions

| Interaction | Implementation | Priority |
|-------------|----------------|----------|
| Page transitions | Fade + slide with Framer Motion | High |
| Loading states | Skeleton loaders everywhere | High |
| Error states | Shake animation + red highlight | High |
| Success feedback | Checkmark animation + green flash | High |
| Pull to refresh | Native feel on mobile | Medium |
| Keyboard navigation | Focus rings, tab order | High |
| Reduced motion | Respect prefers-reduced-motion | High |

### Button Interactions

| State | Animation | Duration |
|-------|-----------|----------|
| Hover | Scale 1.02, shadow increase | 150ms |
| Press | Scale 0.98 | 100ms |
| Loading | Fade to spinner | 200ms |
| Success | Checkmark draws in | 400ms |
| Error | Shake (3 oscillations) | 300ms |
| Disabled | None (instant opacity change) | - |

### Form Interactions

| Interaction | Animation | Notes |
|-------------|-----------|-------|
| Focus | Border colour transition | 150ms ease |
| Valid input | Green border + checkmark | On blur |
| Invalid input | Red border + error message slide | 200ms |
| Error shake | Horizontal shake | On submit error |
| Character count | Fade in when > 50% | - |
| Auto-suggest | Dropdown slide + fade | 200ms |

### Booking Flow Interactions

| Moment | Animation | Description |
|--------|-----------|-------------|
| Slot select | Pulse + lock icon | Slot locks visually |
| Hold starts | Timer appears, bar fills | Countdown begins |
| Timer warning | Pulse when < 2min, red when < 1min | Urgency signal |
| Payment processing | Progress ring | Stripe processing |
| Booking confirmed | Confetti burst | Celebration |
| QR code appears | Scale + fade in | Smooth reveal |
| Share buttons | Stagger fade in | Sequential reveal |

### Confirmation Page

```
Timeline:
0ms    - Page loads, background fades in
200ms  - Checkmark starts drawing (SVG path animation)
600ms  - Checkmark complete, "Booking confirmed!" fades in
800ms  - Confetti burst (if motion allowed)
1000ms - Booking details card slides up
1200ms - QR code scales in
1400ms - Action buttons stagger in (50ms between each)
```

### List Interactions

| Interaction | Animation |
|-------------|-----------|
| Item appear | Stagger fade + slide (30ms per item) |
| Item remove | Slide out + height collapse |
| Reorder | Drag shadow, snap to position |
| Pull to refresh | Spinner + content fade |
| Infinite scroll | Skeleton placeholders |

### Navigation

| Element | Animation |
|---------|-----------|
| Tab switch | Indicator slides, content crossfade |
| Dropdown open | Scale + fade from origin |
| Modal open | Backdrop fade, content slide up |
| Sheet open | Slide from edge + backdrop |
| Page back | Slide right |

### Feedback Moments

| Moment | Feedback Type |
|--------|---------------|
| Booking created | Success toast + confetti |
| Payment received | Checkmark + balance update |
| Split-pay paid | Green badge + notification |
| Invite sent | Success toast with undo |
| Result confirmed | Table updates with highlight |
| Dispute raised | Info toast with case number |
| Check-in complete | Large checkmark + sound (optional) |

---

## Animation Tokens

```css
/* animations.css */

:root {
  /* Durations */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Easings */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Keyframes */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes checkmark {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

@keyframes confetti {
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Requirements

### Keyboard Navigation

- All interactive elements focusable with Tab
- Enter/Space activates buttons
- Escape closes modals/dropdowns
- Arrow keys navigate lists and grids
- Focus trap in modals

### ARIA

```tsx
// Example: Slot selection
<div role="grid" aria-label="Available time slots">
  <div role="row">
    <button
      role="gridcell"
      aria-selected={isSelected}
      aria-disabled={isBooked}
      aria-label={`${time}, ${formatCurrency(price)}, ${status}`}
    >
      {time}
    </button>
  </div>
</div>

// Example: Hold timer
<div
  role="timer"
  aria-live="polite"
  aria-label={`${minutes} minutes ${seconds} seconds remaining`}
>
  {formatted}
</div>
```

### Colour Contrast

- All text: minimum 4.5:1 contrast ratio
- Large text (18px+): minimum 3:1
- Interactive elements: minimum 3:1 against background
- Error states: not relying solely on colour (include icon)

### Screen Reader Announcements

```tsx
// Announce dynamic changes
<div aria-live="polite" className="sr-only">
  {message}
</div>

// Examples:
// - "Slot held for 10 minutes"
// - "Payment successful"
// - "3 players have paid"
// - "Result confirmed"
```

---

## Component Implementation Priority

### Phase 1 (MVP Core)

1. Button (with all states)
2. Input, FormField
3. Card, Badge
4. Skeleton loaders
5. Toast notifications
6. SlotButton, AvailabilityGrid
7. HoldTimer
8. BookingSummary, PaymentOptions
9. ConfirmationSuccess
10. VenueCard
11. Header, MobileNav

### Phase 2 (Teams & Leagues)

1. TeamCard, MemberList
2. AvailabilityPicker, AvailabilitySummary
3. InviteForm
4. StandingsTable
5. FixtureCard, FixtureList
6. ResultForm
7. DisputeForm

### Phase 3 (Admin & Extras)

1. Analytics charts
2. PricingRuleCard
3. IssueForm
4. QRScanner
5. Calendar integration
