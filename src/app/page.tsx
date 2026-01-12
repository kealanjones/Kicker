"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  CreditCard,
  Zap,
  Star,
  ChevronRight,
  ArrowRight,
  Trophy,
  Target,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";

// Mock data for venues
const featuredVenues = [
  {
    id: "1",
    name: "Goals Wembley",
    slug: "goals-wembley",
    rating: 4.8,
    reviews: 248,
    surface: "3G",
    type: "Indoor/Outdoor",
    priceFrom: 45,
    distance: "0.3 mi",
  },
  {
    id: "2",
    name: "Powerleague Harrow",
    slug: "powerleague-harrow",
    rating: 4.5,
    reviews: 156,
    surface: "4G",
    type: "Outdoor",
    priceFrom: 48,
    distance: "1.2 mi",
  },
  {
    id: "3",
    name: "PlayFootball Wembley",
    slug: "playfootball-wembley",
    rating: 4.6,
    reviews: 312,
    surface: "3G",
    type: "Indoor",
    priceFrom: 52,
    distance: "0.8 mi",
  },
];

const features = [
  {
    icon: CreditCard,
    title: "Split the cost",
    description: "No more chasing mates. Everyone pays their share via link.",
  },
  {
    icon: Zap,
    title: "Book instantly",
    description: "Real-time availability. Confirmed in seconds, not hours.",
  },
  {
    icon: Users,
    title: "Manage teams",
    description: "Track availability, fill gaps, run leagues. No WhatsApp chaos.",
  },
];

const stats = [
  { value: "50k+", label: "Pitches booked" },
  { value: "2k+", label: "Venues" },
  { value: "4.8", label: "Average rating" },
  { value: "60s", label: "Avg booking time" },
];

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("18:00");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ location, date, time });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="container-mobile relative py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  The fastest way to book football
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Book a pitch in under{" "}
                <span className="gradient-text">60 seconds</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Find pitches, split costs with teammates, manage your squad, and
                run leagues. The modern way to organise your football.
              </p>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="mt-10 max-w-xl mx-auto"
              >
                <Card variant="glass" className="p-2">
                  <div className="space-y-3">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter postcode or area"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-12 h-13 bg-secondary/50 border-0 text-base placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-12 h-13 bg-secondary/50 border-0"
                        />
                      </div>
                      <div className="relative flex-1">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="pl-12 h-13 bg-secondary/50 border-0"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="xl"
                      variant="glow"
                      className="w-full"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Find available pitches
                    </Button>
                  </div>
                </Card>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>4.8/5 from 10k+ reviews</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/40 bg-card/30">
          <div className="container-mobile py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="stat-number">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Why Kicker
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Football booking, reimagined
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;ve built the platform we wished existed. No phone calls, no
                chasing payments, no spreadsheet nightmares.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  variant="glow"
                  className="p-6 card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Venues Section */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container-mobile">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Popular venues near you
                </h2>
                <p className="text-muted-foreground mt-1">
                  Top-rated pitches ready to book
                </p>
              </div>
              <Link href="/search">
                <Button variant="outline" size="sm">
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredVenues.map((venue) => (
                <Link key={venue.id} href={`/book/${venue.id}/s1`}>
                  <Card variant="glow" className="overflow-hidden card-hover group">
                    {/* Venue Image Placeholder */}
                    <div className="h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
                          {venue.surface}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {venue.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {venue.type} • {venue.distance}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="font-medium">{venue.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({venue.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
                            £{venue.priceFrom}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /hr
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container-mobile">
            <Card variant="glass" className="p-8 md:p-12 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to kick off?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Join thousands of players booking their football through
                  Kicker. It&apos;s free to get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/search">
                    <Button size="lg" variant="glow">
                      Find a pitch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/leagues/1">
                    <Button variant="outline" size="lg">
                      <Trophy className="mr-2 h-4 w-4" />
                      Join a league
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-12">
          <div className="container-mobile">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Kicker</span>
              </div>

              <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/venues" className="hover:text-foreground transition-colors">
                  For Venues
                </Link>
                <Link href="/leagues/1" className="hover:text-foreground transition-colors">
                  Leagues
                </Link>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help
                </Link>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </nav>

              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Kicker
              </p>
            </div>
          </div>
        </footer>
      </main>

      <MobileNav />
    </div>
  );
}
