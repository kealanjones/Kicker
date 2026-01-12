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
  Zap,
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-mobile flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Kicker</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/search"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Find Pitches</span>
          </Link>
          <Link
            href="/leagues/1"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Trophy className="h-4 w-4" />
            <span>Leagues</span>
          </Link>
          <Link
            href="/bookings"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Users className="h-4 w-4" />
            <span>My Bookings</span>
          </Link>
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 rounded-full p-1 hover:bg-secondary transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-sm font-semibold text-primary-foreground">
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
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl p-1.5 shadow-xl z-50 animate-scale-in">
                    <div className="px-3 py-2.5 border-b border-border/50 mb-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span>My Bookings</span>
                    </Link>
                    <Link
                      href="/wallet"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span>Wallet</span>
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>Notifications</span>
                    </Link>
                    <div className="border-t border-border/50 mt-1 pt-1">
                      <Link
                        href="/settings"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span>Settings</span>
                      </Link>
                      <button
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-destructive/10 text-destructive transition-colors"
                        onClick={() => {
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
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
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
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-slide-down">
          <nav className="container-mobile py-4 space-y-1">
            <Link
              href="/search"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5 text-primary" />
              <span className="font-medium">Find Pitches</span>
            </Link>
            <Link
              href="/leagues/1"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-medium">Leagues</span>
            </Link>
            <Link
              href="/bookings"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">My Bookings</span>
            </Link>

            {user ? (
              <div className="border-t border-border/40 pt-3 mt-3">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className="border-t border-border/40 pt-4 mt-3 space-y-2">
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
