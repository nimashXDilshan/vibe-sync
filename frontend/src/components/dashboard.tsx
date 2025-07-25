"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar/sidebar"
import { MainContent } from "@/components/main-content"
import { MusicPlayer } from "@/components/music-player/music-player"
import { LandingPage } from "@/components/landing/landing-page"
import { Track } from "@/types"
import { useAuth } from "@/lib/firebase/auth-context"
import { mockTracks } from "@/data/mock/tracks"

export function Dashboard() {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const [currentView, setCurrentView] = useState("home")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0])

  if (!isAuthenticated) {
    return <LandingPage onAuthenticatedAction={() => {}} />
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Sidebar
        currentView={currentView}
        onViewChangeAction={setCurrentView}
        isExpanded={isSidebarExpanded}
        onToggleExpandedAction={setIsSidebarExpanded}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <MainContent currentView={currentView} currentTrack={currentTrack} onViewChangeAction={setCurrentView} onTrackSelectAction={setCurrentTrack} />
        <MusicPlayer track={currentTrack} onTrackChangeAction={setCurrentTrack} />
      </div>
    </div>
  )
}
