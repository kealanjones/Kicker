"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoldTimer } from "@/components/booking/hold-timer";
import { SlotButton } from "@/components/booking/slot-button";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock data
const mockVenue = {
  id: "1",
  name: "Goals Wembley",
  address: "Empire Way, Wembley HA9 0WS",
  distance: "0.3 miles away",
  pitch: {
    name: "Pitch 2",
    size: "5v5",
    surface: "3G",
    type: "Indoor",
  },
  amenities: ["3G surface", "Floodlit", "Changing rooms", "Free parking"],
};

const mockSlots = [
  { id: "s1", time: "17:00", price: 4800, status: "available" as const, isPeak: false },
  { id: "s2", time: "18:00", price: 5500, status: "selected" as const, isPeak: true },
  { id: "s3", time: "19:00", price: 5500, status: "available" as const, isPeak: true },
  { id: "s4", time: "20:00", price: 6000, status: "available" as const, isPeak: true },
  { id: "s5", time: "21:00", price: 5500, status: "available" as const, isPeak: true },
  { id: "s6", time: "22:00", price: 4500, status: "available" as const, isPeak: false },
];

type PaymentOption = "full" | "deposit" | "split";

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [selectedSlot, setSelectedSlot] = useState(mockSlots[1]);
  const [holdExpiry, setHoldExpiry] = useState(
    new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
  );
  const [step, setStep] = useState<"slot" | "details" | "payment">("slot");
  const [bookingName, setBookingName] = useState("");
  const [playerCount, setPlayerCount] = useState(10);
  const [paymentOption, setPaymentOption] = useState<PaymentOption>("full");
  const [splitPayDeadline, setSplitPayDeadline] = useState("24");
  const [autoCharge, setAutoCharge] = useState(false);
  const [applyCredits, setApplyCredits] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const userCredits = 1200; // £12.00 in pence

  const handleHoldExpire = useCallback(() => {
    // Redirect back to search with a message
    router.push("/search?expired=true");
  }, [router]);

  const calculateTotal = () => {
    let total = selectedSlot.price;

    if (paymentOption === "deposit") {
      total = Math.round(selectedSlot.price * 0.25); // 25% deposit
    } else if (paymentOption === "split") {
      total = Math.round(selectedSlot.price / playerCount); // Per person
    }

    if (applyCredits && userCredits > 0) {
      total = Math.max(0, total - userCredits);
    }

    return total;
  };

  const handleContinue = () => {
    if (step === "slot") {
      setStep("details");
    } else if (step === "details") {
      setStep("payment");
    }
  };

  const handleBack = () => {
    if (step === "payment") {
      setStep("details");
    } else if (step === "details") {
      setStep("slot");
    } else {
      router.back();
    }
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Redirect to confirmation after animation
    setTimeout(() => {
      router.push(`/book/confirmation/MOCK-BOOKING-123?date=${date}`);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container-mobile flex h-14 items-center">
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            {step === "slot" ? "Cancel" : "Back"}
          </button>
          <span className="flex-1 text-center font-semibold">{mockVenue.name}</span>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 pb-32 md:pb-24">
        <div className="container-mobile py-4 space-y-6">
          {/* Pitch Info */}
          <div>
            <h1 className="text-xl font-bold">
              {mockVenue.pitch.name} - {mockVenue.pitch.size} {mockVenue.pitch.type} {mockVenue.pitch.surface}
            </h1>
            <p className="text-muted-foreground">{formatDate(date)}</p>
          </div>

          {/* Hold Timer */}
          <HoldTimer
            expiresAt={holdExpiry}
            onExpire={handleHoldExpire}
            variant={step === "slot" ? "full" : "bar"}
          />

          {/* Step: Slot Selection */}
          {step === "slot" && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Selected: {selectedSlot.time} - {parseInt(selectedSlot.time) + 1}:00
                  </CardTitle>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(selectedSlot.price)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Change time:
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {mockSlots.map((slot) => (
                      <SlotButton
                        key={slot.id}
                        time={slot.time}
                        price={slot.price}
                        status={slot.id === selectedSlot.id ? "selected" : slot.status}
                        isPeak={slot.isPeak}
                        onSelect={() => setSelectedSlot(slot)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Venue Details */}
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{mockVenue.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mockVenue.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {mockVenue.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-green-600 mr-1" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Step: Booking Details */}
          {step === "details" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Booking details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Booking name (optional)
                    </label>
                    <Input
                      placeholder="e.g., Tuesday Kickabout"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Expected players
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setPlayerCount((p) => Math.max(2, p - 1))
                        }
                      >
                        -
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {playerCount}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setPlayerCount((p) => Math.min(20, p + 1))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    How would you like to pay?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Full Payment */}
                  <button
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all",
                      paymentOption === "full"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                    onClick={() => setPaymentOption("full")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Pay in full</span>
                      <span className="font-bold">
                        {formatCurrency(selectedSlot.price)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You pay everything now
                    </p>
                  </button>

                  {/* Deposit */}
                  <button
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all",
                      paymentOption === "deposit"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                    onClick={() => setPaymentOption("deposit")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Pay deposit</span>
                      <span className="font-bold">
                        {formatCurrency(Math.round(selectedSlot.price * 0.25))}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      25% now, rest on the day
                    </p>
                  </button>

                  {/* Split Pay */}
                  <button
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all",
                      paymentOption === "split"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                    onClick={() => setPaymentOption("split")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Split with teammates</span>
                      <span className="font-bold">
                        {formatCurrency(
                          Math.round(selectedSlot.price / playerCount)
                        )}{" "}
                        each
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Everyone pays their share via link
                    </p>
                  </button>

                  {/* Split Pay Options */}
                  {paymentOption === "split" && (
                    <div className="pl-4 border-l-2 border-primary/30 space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Payment deadline
                        </label>
                        <select
                          value={splitPayDeadline}
                          onChange={(e) => setSplitPayDeadline(e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="24">24 hours before kickoff</option>
                          <option value="48">48 hours before kickoff</option>
                          <option value="72">72 hours before kickoff</option>
                        </select>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoCharge}
                          onChange={(e) => setAutoCharge(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-gray-300"
                        />
                        <div>
                          <span className="text-sm font-medium">
                            Auto-charge me if others don&apos;t pay
                          </span>
                          <p className="text-xs text-muted-foreground">
                            You&apos;ll be charged the remaining balance at the deadline
                          </p>
                        </div>
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {bookingName || "Booking"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {mockVenue.name} • {mockVenue.pitch.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatDate(date)} • {selectedSlot.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credits */}
              {userCredits > 0 && (
                <Card>
                  <CardContent className="pt-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="font-medium">
                          Use credits ({formatCurrency(userCredits)})
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Apply your wallet balance
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={applyCredits}
                        onChange={(e) => setApplyCredits(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300"
                      />
                    </label>
                  </CardContent>
                </Card>
              )}

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {paymentOption === "split"
                        ? "Your share"
                        : paymentOption === "deposit"
                        ? "Deposit (25%)"
                        : "Pitch booking"}
                    </span>
                    <span>
                      {formatCurrency(
                        paymentOption === "split"
                          ? Math.round(selectedSlot.price / playerCount)
                          : paymentOption === "deposit"
                          ? Math.round(selectedSlot.price * 0.25)
                          : selectedSlot.price
                      )}
                    </span>
                  </div>

                  {applyCredits && userCredits > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Credits applied</span>
                      <span>
                        -{formatCurrency(Math.min(userCredits, selectedSlot.price))}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total due now</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form Placeholder */}
              {calculateTotal() > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Card number
                        </label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Expiry
                          </label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            CVC
                          </label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Payments secured by Stripe
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 pb-safe md:pb-4">
        <div className="container-mobile">
          {step !== "payment" ? (
            <Button
              size="lg"
              className="w-full"
              onClick={handleContinue}
            >
              Continue • {formatCurrency(selectedSlot.price)}
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full"
              onClick={handleConfirmBooking}
              isLoading={isProcessing}
              isSuccess={isSuccess}
              loadingText="Processing payment..."
            >
              {calculateTotal() > 0
                ? `Confirm booking • ${formatCurrency(calculateTotal())}`
                : "Confirm booking • Free"}
            </Button>
          )}

          <p className="text-xs text-center text-muted-foreground mt-2">
            By confirming, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/cancellation" className="underline">
              Cancellation Policy
            </Link>
          </p>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
