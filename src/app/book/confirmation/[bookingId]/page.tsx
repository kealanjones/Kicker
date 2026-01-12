"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  Check,
  Share2,
  Calendar,
  MessageCircle,
  RefreshCw,
  QrCode,
  Copy,
  MapPin,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock booking data
const mockBooking = {
  id: "MOCK-BOOKING-123",
  reference: "KCK-2024-8X7Y",
  name: "Tuesday Kickabout",
  venue: {
    name: "Goals Wembley",
    address: "Empire Way, Wembley HA9 0WS",
    pitch: "Pitch 2",
  },
  date: "2024-01-15",
  time: "18:00",
  endTime: "19:00",
  playerCount: 10,
  isSplitPay: true,
  pricePerPerson: 550,
  totalPrice: 5500,
  paidCount: 1,
  qrToken: "qr-token-123",
};

function ConfirmationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/pay/${mockBooking.qrToken}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Join me for football!\n\n` +
        `${mockBooking.name || "Football"}\n` +
        `📍 ${mockBooking.venue.name}\n` +
        `📅 ${formatDate(mockBooking.date)} at ${mockBooking.time}\n` +
        `💷 ${formatCurrency(mockBooking.pricePerPerson)} per person\n\n` +
        `Pay your share: ${window.location.origin}/pay/${mockBooking.qrToken}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleAddToCalendar = () => {
    // Generate .ics file
    const event = {
      title: mockBooking.name || "Football Booking",
      location: `${mockBooking.venue.name}, ${mockBooking.venue.address}`,
      startDate: new Date(`${mockBooking.date}T${mockBooking.time}`),
      endDate: new Date(`${mockBooking.date}T${mockBooking.endTime}`),
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${event.endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking.ics";
    a.click();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-particle"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][
                  Math.floor(Math.random() * 4)
                ],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${Math.random() * 1 + 1}s`,
              }}
            />
          ))}
        </div>
      )}

      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container-mobile py-8">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Booking confirmed!</h1>
            <p className="text-muted-foreground">
              Ref: {mockBooking.reference}
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6 animate-slide-up">
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4">
                {mockBooking.name || "Football Booking"}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {mockBooking.venue.name}, {mockBooking.venue.pitch}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockBooking.venue.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{formatDate(mockBooking.date)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {mockBooking.time} - {mockBooking.endTime}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {mockBooking.playerCount} players
                    {mockBooking.isSplitPay && (
                      <span className="text-muted-foreground">
                        {" "}
                        • {formatCurrency(mockBooking.pricePerPerson)} per person
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card
            className="mb-6 animate-slide-up cursor-pointer"
            style={{ animationDelay: "100ms" }}
            onClick={() => setShowQR(!showQR)}
          >
            <CardContent className="pt-6 text-center">
              {showQR ? (
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    {/* Placeholder for QR code - in production use qrcode library */}
                    <div className="text-4xl">📱</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show this on arrival
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QrCode className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Check-in QR code</p>
                      <p className="text-sm text-muted-foreground">
                        Show this on arrival
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Split Pay Status */}
          {mockBooking.isSplitPay && (
            <Card
              className="mb-6 animate-slide-up"
              style={{ animationDelay: "150ms" }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Invite players to pay</p>
                      <p className="text-sm text-muted-foreground">
                        {mockBooking.paidCount}/{mockBooking.playerCount} paid
                      </p>
                    </div>
                  </div>
                  <Badge variant="warning">
                    {mockBooking.playerCount - mockBooking.paidCount} pending
                  </Badge>
                </div>

                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${
                        (mockBooking.paidCount / mockBooking.playerCount) * 100
                      }%`,
                    }}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy payment link
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div
            className="space-y-3 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              className="w-full"
              variant="outline"
              onClick={handleWhatsAppShare}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Share to WhatsApp
            </Button>

            <Button
              className="w-full"
              variant="outline"
              onClick={handleAddToCalendar}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to calendar
            </Button>

            <Button className="w-full" variant="outline" asChild>
              <Link href={`/book?rebook=${mockBooking.id}`}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Book same time next week
              </Link>
            </Button>
          </div>

          {/* View Booking Link */}
          <div className="text-center mt-6">
            <Link
              href={`/bookings/${mockBooking.id}`}
              className="text-primary hover:underline inline-flex items-center"
            >
              View booking details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
