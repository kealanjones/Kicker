"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  Filter,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonCard } from "@/components/ui/skeleton";
import { SlotButton } from "@/components/booking/slot-button";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

// Mock data for search results
const mockVenues = [
  {
    id: "1",
    name: "Goals Wembley",
    slug: "goals-wembley",
    rating: 4.8,
    surface: "3G",
    type: "Indoor",
    distance: 0.3,
    slots: [
      { id: "s1", time: "17:00", price: 4800, status: "available" as const, isPeak: false },
      { id: "s2", time: "18:00", price: 5500, status: "available" as const, isPeak: true },
      { id: "s3", time: "19:00", price: 5500, status: "held" as const, isPeak: true },
      { id: "s4", time: "20:00", price: 6000, status: "available" as const, isPeak: true },
      { id: "s5", time: "21:00", price: 5500, status: "booked" as const, isPeak: true },
      { id: "s6", time: "22:00", price: 4500, status: "available" as const, isPeak: false },
    ],
  },
  {
    id: "2",
    name: "Powerleague Harrow",
    slug: "powerleague-harrow",
    rating: 4.5,
    surface: "4G",
    type: "Outdoor",
    distance: 1.2,
    slots: [
      { id: "s7", time: "17:00", price: 4500, status: "available" as const, isPeak: false },
      { id: "s8", time: "18:00", price: 4800, status: "available" as const, isPeak: true },
      { id: "s9", time: "19:00", price: 4800, status: "available" as const, isPeak: true },
      { id: "s10", time: "20:00", price: 5200, status: "held" as const, isPeak: true },
      { id: "s11", time: "21:00", price: 4800, status: "available" as const, isPeak: true },
    ],
  },
  {
    id: "3",
    name: "PlayFootball Wembley",
    slug: "playfootball-wembley",
    rating: 4.6,
    surface: "3G",
    type: "Indoor",
    distance: 0.8,
    slots: [
      { id: "s12", time: "18:00", price: 5200, status: "available" as const, isPeak: true },
      { id: "s13", time: "19:00", price: 5200, status: "available" as const, isPeak: true },
      { id: "s14", time: "20:00", price: 5500, status: "available" as const, isPeak: true },
    ],
  },
];

const filterOptions = {
  pitchSize: ["5v5", "7v7"],
  surface: ["3G", "4G", "Grass"],
  type: ["Indoor", "Outdoor"],
  price: ["Under £50", "£50-£60", "Over £60"],
};

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [date, setDate] = useState(
    searchParams.get("date") || new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState(searchParams.get("time") || "18:00");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [venues, setVenues] = useState(mockVenues);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSlotSelect = (venueId: string, slotId: string) => {
    router.push(`/book/${venueId}/${slotId}?date=${date}`);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Search Header */}
        <div className="sticky top-16 z-40 bg-background border-b">
          <div className="container-mobile py-3">
            {/* Search Inputs */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
              <div className="relative w-32">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
              <div className="relative w-24">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>

              {Object.entries(filterOptions).map(([category, options]) =>
                options.map((option) => (
                  <Button
                    key={option}
                    variant={activeFilters.includes(option) ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => toggleFilter(option)}
                  >
                    {option}
                    {activeFilters.includes(option) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                ))
              )}

              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container-mobile py-4">
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {venues.length} venues with availability
              </p>

              <div className="space-y-4">
                {venues.map((venue) => (
                  <Card key={venue.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      {/* Venue Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link
                            href={`/venues/${venue.slug}`}
                            className="font-semibold hover:underline"
                          >
                            {venue.name}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-0.5" />
                              {venue.rating}
                            </div>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              {venue.surface}
                            </Badge>
                            <span>•</span>
                            <span>{venue.type}</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {venue.distance} mi
                        </span>
                      </div>

                      {/* Available Slots */}
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">
                          Available slots:
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {venue.slots.map((slot) => (
                            <SlotButton
                              key={slot.id}
                              time={slot.time}
                              price={slot.price}
                              status={slot.status}
                              isPeak={slot.isPeak}
                              onSelect={() => handleSlotSelect(venue.id, slot.id)}
                              onWaitlist={() => {
                                // Handle waitlist join
                                console.log("Join waitlist for", slot.id);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
