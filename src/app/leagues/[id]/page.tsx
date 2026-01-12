"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Trophy,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock league data
const mockLeague = {
  id: "1",
  name: "Monday Night 5s",
  season: "Spring 2024",
  status: "IN_PROGRESS",
  venue: "Goals Wembley",
  matchWeek: 8,
  standings: [
    { position: 1, team: "FC Legends", played: 7, won: 6, drawn: 0, lost: 1, gf: 24, ga: 12, gd: 12, points: 18 },
    { position: 2, team: "Real Ballers", played: 7, won: 5, drawn: 1, lost: 1, gf: 20, ga: 12, gd: 8, points: 16 },
    { position: 3, team: "Athletic Stars", played: 7, won: 4, drawn: 2, lost: 1, gf: 18, ga: 13, gd: 5, points: 14 },
    { position: 4, team: "United FC", played: 7, won: 3, drawn: 2, lost: 2, gf: 15, ga: 13, gd: 2, points: 11 },
    { position: 5, team: "Dynamo", played: 7, won: 2, drawn: 2, lost: 3, gf: 12, ga: 15, gd: -3, points: 8 },
    { position: 6, team: "Rovers", played: 7, won: 1, drawn: 2, lost: 4, gf: 10, ga: 18, gd: -8, points: 5 },
    { position: 7, team: "City Boys", played: 7, won: 1, drawn: 1, lost: 5, gf: 9, ga: 16, gd: -7, points: 4 },
    { position: 8, team: "Wanderers", played: 7, won: 0, drawn: 3, lost: 4, gf: 8, ga: 17, gd: -9, points: 3 },
  ],
  fixtures: [
    { id: "f1", homeTeam: "FC Legends", awayTeam: "Real Ballers", date: "2024-01-15", time: "18:00", pitch: "Pitch 1", status: "scheduled" },
    { id: "f2", homeTeam: "Athletic Stars", awayTeam: "United FC", date: "2024-01-15", time: "18:00", pitch: "Pitch 2", status: "scheduled" },
    { id: "f3", homeTeam: "Dynamo", awayTeam: "Rovers", date: "2024-01-15", time: "19:00", pitch: "Pitch 1", status: "scheduled" },
    { id: "f4", homeTeam: "City Boys", awayTeam: "Wanderers", date: "2024-01-15", time: "19:00", pitch: "Pitch 2", status: "scheduled" },
  ],
  recentResults: [
    { id: "r1", homeTeam: "FC Legends", awayTeam: "Dynamo", homeScore: 3, awayScore: 1, status: "confirmed" },
    { id: "r2", homeTeam: "Real Ballers", awayTeam: "Athletic Stars", homeScore: 2, awayScore: 2, status: "confirmed" },
    { id: "r3", homeTeam: "United FC", awayTeam: "Rovers", homeScore: 4, awayScore: 1, status: "confirmed" },
    { id: "r4", homeTeam: "Wanderers", awayTeam: "City Boys", homeScore: 1, awayScore: 1, status: "pending" },
  ],
};

type TabType = "table" | "fixtures" | "results" | "stats";

export default function LeaguePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("table");

  const tabs: { key: TabType; label: string }[] = [
    { key: "table", label: "Table" },
    { key: "fixtures", label: "Fixtures" },
    { key: "results", label: "Results" },
    { key: "stats", label: "Stats" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container-mobile py-4">
          {/* League Header */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/leagues"
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Badge variant="secondary">{mockLeague.season}</Badge>
          </div>

          <h1 className="text-2xl font-bold mb-1">{mockLeague.name}</h1>
          <p className="text-muted-foreground mb-4">
            {mockLeague.venue} • Week {mockLeague.matchWeek}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Table View */}
          {activeTab === "table" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Division 1</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">#</th>
                        <th className="text-left py-3 px-4 font-medium">Team</th>
                        <th className="text-center py-3 px-2 font-medium">P</th>
                        <th className="text-center py-3 px-2 font-medium hidden sm:table-cell">W</th>
                        <th className="text-center py-3 px-2 font-medium hidden sm:table-cell">D</th>
                        <th className="text-center py-3 px-2 font-medium hidden sm:table-cell">L</th>
                        <th className="text-center py-3 px-2 font-medium">GD</th>
                        <th className="text-center py-3 px-2 font-medium">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeague.standings.map((team, index) => (
                        <tr
                          key={team.team}
                          className={cn(
                            "border-b last:border-0",
                            index === 0 && "bg-green-50 dark:bg-green-950/20",
                            index >= mockLeague.standings.length - 2 &&
                              "bg-red-50 dark:bg-red-950/20"
                          )}
                        >
                          <td className="py-3 px-4 font-medium">
                            {team.position}
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {team.team}
                          </td>
                          <td className="py-3 px-2 text-center text-muted-foreground">
                            {team.played}
                          </td>
                          <td className="py-3 px-2 text-center text-muted-foreground hidden sm:table-cell">
                            {team.won}
                          </td>
                          <td className="py-3 px-2 text-center text-muted-foreground hidden sm:table-cell">
                            {team.drawn}
                          </td>
                          <td className="py-3 px-2 text-center text-muted-foreground hidden sm:table-cell">
                            {team.lost}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={cn(
                                team.gd > 0 && "text-green-600",
                                team.gd < 0 && "text-red-600"
                              )}
                            >
                              {team.gd > 0 ? `+${team.gd}` : team.gd}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center font-bold">
                            {team.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t text-xs text-muted-foreground flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded" />
                    Champions
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-200 dark:bg-red-900 rounded" />
                    Relegation
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fixtures View */}
          {activeTab === "fixtures" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Week {mockLeague.matchWeek}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Monday, 15 January 2024
              </p>

              {mockLeague.fixtures.map((fixture) => (
                <Card key={fixture.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {fixture.time} • {fixture.pitch}
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Add to calendar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex-1">
                        {fixture.homeTeam}
                      </span>
                      <span className="text-muted-foreground px-4">vs</span>
                      <span className="font-medium flex-1 text-right">
                        {fixture.awayTeam}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results View */}
          {activeTab === "results" && (
            <div className="space-y-4">
              <h2 className="font-semibold">Week {mockLeague.matchWeek - 1}</h2>

              {mockLeague.recentResults.map((result) => (
                <Card key={result.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={
                          result.status === "confirmed" ? "success" : "warning"
                        }
                      >
                        {result.status === "confirmed" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {result.status === "confirmed"
                          ? "Confirmed"
                          : "Pending confirmation"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex-1">
                        {result.homeTeam}
                      </span>
                      <div className="px-4 text-center">
                        <span className="text-2xl font-bold">
                          {result.homeScore} - {result.awayScore}
                        </span>
                      </div>
                      <span className="font-medium flex-1 text-right">
                        {result.awayTeam}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Stats View */}
          {activeTab === "stats" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Scorers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Marcus T.", team: "FC Legends", goals: 8 },
                    { name: "James W.", team: "Real Ballers", goals: 6 },
                    { name: "David K.", team: "Athletic Stars", goals: 5 },
                    { name: "Chris M.", team: "United FC", goals: 5 },
                    { name: "Tom S.", team: "FC Legends", goals: 4 },
                  ].map((player, index) => (
                    <div
                      key={player.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground w-4">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.team}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold">{player.goals}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form Table</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockLeague.standings.slice(0, 5).map((team, index) => (
                    <div
                      key={team.team}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground w-4">
                          {index + 1}
                        </span>
                        <span className="font-medium">{team.team}</span>
                      </div>
                      <div className="flex gap-1">
                        {["W", "W", "D", "W", "L"].map((result, i) => (
                          <span
                            key={i}
                            className={cn(
                              "w-6 h-6 rounded text-xs font-medium flex items-center justify-center",
                              result === "W" &&
                                "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
                              result === "D" &&
                                "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100",
                              result === "L" &&
                                "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                            )}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
