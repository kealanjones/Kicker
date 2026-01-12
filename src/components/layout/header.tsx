"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Trophy,
  Users,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Wallet,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-mobile flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">K</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Kicker</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/search"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Find Pitches</span>
          </Link>
          <Link
            href="/leagues"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Trophy className="h-4 w-4" />
            <span>Leagues</span>
          </Link>
          <Link
            href="/player-finder"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Users className="h-4 w-4" />
            <span>Player Finder</span>
          </Link>
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 rounded-full p-1 hover:bg-accent transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg z-50 animate-scale-in">
                    <div className="px-3 py-2 border-b mb-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Search className="h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                    <Link
                      href="/teams"
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Users className="h-4 w-4" />
                      <span>My Teams</span>
                    </Link>
                    <Link
                      href="/wallet"
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Wallet className="h-4 w-4" />
                      <span>Wallet</span>
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                    <div className="border-t mt-1 pt-1">
                      <Link
                        href="/settings"
                        className="flex items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        className="flex w-full items-center space-x-2 rounded-sm px-3 py-2 text-sm hover:bg-accent text-destructive"
                        onClick={() => {
                          // Handle logout
                          setUserMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-accent rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t animate-slide-down">
          <nav className="container-mobile py-4 space-y-2">
            <Link
              href="/search"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              <span>Find Pitches</span>
            </Link>
            <Link
              href="/leagues"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="h-5 w-5" />
              <span>Leagues</span>
            </Link>
            <Link
              href="/player-finder"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5" />
              <span>Player Finder</span>
            </Link>

            {user ? (
              <>
                <div className="border-t pt-2 mt-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                    <span>My Bookings</span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="border-t pt-4 mt-2 space-y-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
