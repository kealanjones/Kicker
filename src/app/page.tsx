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
    image: "/api/placeholder/400/200",
    rating: 4.8,
    surface: "3G",
    type: "Indoor/Outdoor",
    priceFrom: 45,
    distance: "0.3 mi",
  },
  {
    id: "2",
    name: "Powerleague Harrow",
    slug: "powerleague-harrow",
    image: "/api/placeholder/400/200",
    rating: 4.5,
    surface: "4G",
    type: "Outdoor",
    priceFrom: 48,
    distance: "1.2 mi",
  },
  {
    id: "3",
    name: "PlayFootball Wembley",
    slug: "playfootball-wembley",
    image: "/api/placeholder/400/200",
    rating: 4.6,
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
    description: "No more chasing mates for money. Everyone pays their share via link.",
  },
  {
    icon: Zap,
    title: "Book instantly",
    description: "Real-time availability. Confirmed in seconds, not hours.",
  },
  {
    icon: Users,
    title: "Manage your team",
    description: "Track availability, fill gaps, run leagues. No more WhatsApp chaos.",
  },
];

const testimonials = [
  {
    quote:
      "Finally, a booking app that just works. Split-pay saved our Tuesday game.",
    author: "Marcus T.",
    team: "FC Legends",
  },
  {
    quote:
      "We run 3 leagues through Kicker now. Fixtures, results, disputes - all sorted.",
    author: "Sarah K.",
    team: "Monday Night League",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState("18:00");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      date,
      time,
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
          <div className="container-mobile py-12 md:py-20">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Book a pitch in under{" "}
                <span className="text-primary">60 seconds</span>
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Find pitches, split costs, manage teams, and run leagues. The
                fastest way to organise your football.
              </p>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="mt-8 space-y-4 max-w-md mx-auto"
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter postcode or town"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-12">
                  <Search className="mr-2 h-5 w-5" />
                  Find pitches
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y bg-muted/30">
          <div className="container-mobile py-12">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Venues Section */}
        <section className="py-12">
          <div className="container-mobile">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular venues near you</h2>
              <Link
                href="/search"
                className="text-sm text-primary hover:underline flex items-center"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scroll-snap-x scrollbar-hide">
              {featuredVenues.map((venue) => (
                <Link
                  key={venue.id}
                  href={`/venues/${venue.slug}`}
                  className="scroll-snap-start"
                >
                  <Card className="w-[280px] overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">⚽</span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{venue.name}</h3>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          {venue.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {venue.surface}
                        </Badge>
                        <span>{venue.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {venue.distance}
                        </span>
                        <span className="font-semibold text-primary">
                          From £{venue.priceFrom}/hr
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-muted/30">
          <div className="container-mobile">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8">What players say</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <blockquote
                    key={index}
                    className="bg-background rounded-lg p-6 shadow-sm"
                  >
                    <p className="text-lg italic mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="text-sm text-muted-foreground">
                      — {testimonial.author}, {testimonial.team}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container-mobile">
            <div className="max-w-xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">Ready to kick off?</h2>
              <p className="text-muted-foreground">
                Join thousands of players booking their football through Kicker.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get started free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Find a pitch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container-mobile">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    K
                  </span>
                </div>
                <span className="font-semibold">Kicker</span>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
                <Link href="/venues" className="hover:text-foreground">
                  For Venues
                </Link>
                <Link href="/leagues" className="hover:text-foreground">
                  For Leagues
                </Link>
                <Link href="/help" className="hover:text-foreground">
                  Help
                </Link>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </nav>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Kicker. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      <MobileNav />
    </div>
  );
}
