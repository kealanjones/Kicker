"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  RefreshCw,
  QrCode,
  ChevronRight,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock bookings data
const mockBookings = {
  upcoming: [
    {
      id: "1",
      reference: "KCK-2024-8X7Y",
      name: "Tuesday Kickabout",
      venue: "Goals Wembley",
      pitch: "Pitch 2",
      date: "2024-01-15",
      time: "18:00",
      status: "confirmed",
      isSplitPay: true,
      paidCount: 8,
      totalPlayers: 10,
      price: 5500,
    },
  ],
  past: [
    {
      id: "2",
      reference: "KCK-2024-7W3Z",
      name: "Monday Night Football",
      venue: "Powerleague Harrow",
      pitch: "Pitch 1",
      date: "2024-01-08",
      time: "19:00",
      status: "completed",
      isSplitPay: false,
      price: 4800,
    },
    {
      id: "3",
      reference: "KCK-2024-6V2Y",
      name: "Sunday Friendlies",
      venue: "Goals Wembley",
      pitch: "Pitch 1",
      date: "2024-01-07",
      time: "10:00",
      status: "completed",
      isSplitPay: true,
      paidCount: 10,
      totalPlayers: 10,
      price: 5000,
    },
  ],
  cancelled: [
    {
      id: "4",
      reference: "KCK-2024-5U1X",
      name: "Thursday Game",
      venue: "PlayFootball Wembley",
      pitch: "Pitch 2",
      date: "2024-01-04",
      time: "20:00",
      status: "cancelled",
      creditAmount: 5500,
    },
  ],
};

type TabType = "upcoming" | "past" | "cancelled";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: mockBookings.upcoming.length },
    { key: "past", label: "Past", count: mockBookings.past.length },
    { key: "cancelled", label: "Cancelled", count: mockBookings.cancelled.length },
  ];

  const currentBookings = mockBookings[activeTab];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container-mobile py-4">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className="relative"
              >
                {tab.label}
                {tab.count > 0 && (
                  <Badge
                    variant={activeTab === tab.key ? "secondary" : "outline"}
                    className="ml-1.5"
                  >
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {currentBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-1">No {activeTab} bookings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activeTab === "upcoming"
                      ? "Time to book your next game!"
                      : activeTab === "past"
                      ? "Your completed bookings will appear here"
                      : "No cancelled bookings"}
                  </p>
                  {activeTab === "upcoming" && (
                    <Button asChild>
                      <Link href="/search">Find a pitch</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              currentBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">
                          {booking.name || "Football Booking"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Ref: {booking.reference}
                        </p>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "success"
                            : booking.status === "completed"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {booking.status === "confirmed" && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {booking.venue} • {booking.pitch}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>

                      {booking.isSplitPay && booking.paidCount !== undefined && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span
                            className={cn(
                              booking.paidCount < booking.totalPlayers!
                                ? "text-amber-600"
                                : "text-green-600"
                            )}
                          >
                            {booking.paidCount}/{booking.totalPlayers} paid
                          </span>
                        </div>
                      )}

                      {booking.status === "cancelled" && booking.creditAmount && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check className="h-4 w-4" />
                          <span>
                            {formatCurrency(booking.creditAmount)} credited to
                            wallet
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      {booking.status === "confirmed" && (
                        <>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/bookings/${booking.id}`}>
                              <QrCode className="h-4 w-4 mr-1" />
                              View QR
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/bookings/${booking.id}`}>
                              Manage
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </>
                      )}

                      {booking.status === "completed" && (
                        <Button className="w-full" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Book same time next week
                        </Button>
                      )}

                      {booking.status === "cancelled" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/bookings/${booking.id}`}>
                            View details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
