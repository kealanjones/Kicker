# Kicker - UK 5-a-Side Football Platform

A mobile-first web platform for booking 5-a-side football pitches, managing teams, and running leagues. Built to compete with Powerleague and PlayFootball with faster bookings, split-pay, and premium UX.

## Features

### MVP (Implemented)
- **Pitch Search & Booking**: Find nearby pitches with real-time availability
- **Hold-to-Book Timer**: 10-minute slot reservation with countdown
- **Split-Pay**: Captain books, teammates pay via shareable links
- **Credits Wallet**: Instant refunds to reusable credits
- **One-Tap Rebook**: Book the same slot next week
- **QR Check-in**: Venue staff verify bookings on arrival
- **League Management**: Tables, fixtures, results, disputes
- **Team Management**: Availability tracking (In/Maybe/Out)
- **WhatsApp & Calendar Sharing**: Default share options

### Coming Soon (Phase 2)
- Waitlist with auto-fill
- Player finder marketplace
- Subscriptions & memberships
- Dynamic pricing
- Late cancellation marketplace
- Corporate teams mode

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe (Payment Intents + Connect)
- **Email**: Resend
- **Analytics**: PostHog (optional)

## Project Structure

```
├── docs/                    # Documentation
│   ├── PRD.md              # Product requirements
│   ├── USER_FLOWS.md       # User flow diagrams
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── WIREFRAMES.md       # Page wireframe descriptions
│   ├── DATA_MODEL.md       # Database schema
│   ├── API_ROUTES.md       # API documentation
│   ├── COMPONENT_PLAN.md   # UI components & microinteractions
│   └── BACKLOG.md          # Prioritised task list
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── search/         # Venue search
│   │   ├── book/           # Booking flow
│   │   ├── bookings/       # Booking history
│   │   ├── leagues/        # League pages
│   │   └── ...
│   ├── components/
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Header, nav, footer
│   │   └── booking/       # Booking-specific components
│   └── lib/               # Utilities
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- Resend account (for emails)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Kicker
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure `.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kicker?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="Kicker <noreply@yourdomain.com>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate

# Seed database with sample data (optional)
npm run db:seed
```

### Running the App

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start
```

Visit `http://localhost:3000`

### Local Stripe Webhook Testing

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows: scoop install stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
npm run stripe:listen

# This will output a webhook signing secret - add to .env
# STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Database Management

```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Generate migration after schema changes
npm run db:migrate

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset
```

## Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Homepage with search |
| Search | `/search` | Venue search & availability grid |
| Booking | `/book/[venueId]/[slotId]` | Booking flow with hold timer |
| Confirmation | `/book/confirmation/[bookingId]` | Success page with sharing |
| Split-Pay | `/pay/[token]` | Participant payment page |
| Bookings | `/bookings` | Booking history |
| League | `/leagues/[id]` | League table & fixtures |
| Teams | `/teams` | Team management |
| Dashboard | `/dashboard` | User overview |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/availability` | GET | Search available slots |
| `/api/bookings/hold` | POST | Create slot hold |
| `/api/bookings` | POST | Create booking |
| `/api/payments/create-intent` | POST | Create Stripe payment |
| `/api/pay/[token]` | GET/POST | Split-pay participant flow |
| `/api/webhooks/stripe` | POST | Stripe webhook handler |

See `docs/API_ROUTES.md` for complete API documentation.

## Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint + Prettier formatting
- Component-first architecture
- Mobile-first responsive design

### Commit Convention
```
feat: add split-pay checkout flow
fix: resolve hold timer race condition
docs: update API documentation
style: format booking components
refactor: extract payment utilities
test: add booking flow tests
```

### Branch Strategy
- `main` - production-ready code
- `develop` - integration branch
- `feature/*` - new features
- `fix/*` - bug fixes

## Testing

```bash
# Run tests (when implemented)
npm test

# Run E2E tests
npm run test:e2e
```

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

Ensure PostgreSQL database is accessible and all environment variables are configured.

## Contributing

1. Read the PRD in `docs/PRD.md`
2. Check the backlog in `docs/BACKLOG.md`
3. Follow the component plan in `docs/COMPONENT_PLAN.md`
4. Create a feature branch
5. Submit a pull request

## Not Yet Implemented

The following features are documented but not yet built:

- [ ] Authentication flows (NextAuth setup)
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Waitlist system
- [ ] Player finder
- [ ] Result submission & disputes
- [ ] Venue admin dashboard
- [ ] Staff check-in with QR scanning
- [ ] Analytics dashboard

See `docs/BACKLOG.md` for the complete prioritised task list.

## License

Proprietary - All rights reserved

## Support

For issues and feature requests, please open a GitHub issue.
