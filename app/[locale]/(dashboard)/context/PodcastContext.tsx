// contexts/PodcastContext.tsx
"use client"

import React, { createContext, useContext, useState } from 'react'

interface PodcastContextType {
  isPodcastOpen: boolean
  openPodcast: () => void
  closePodcast: () => void
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined)

export function PodcastProvider({ children }: { children: React.ReactNode }) {
  const [isPodcastOpen, setIsPodcastOpen] = useState(false)

  const openPodcast = () => setIsPodcastOpen(true)
  const closePodcast = () => setIsPodcastOpen(false)

  return (
    <PodcastContext.Provider value={{ isPodcastOpen, openPodcast, closePodcast }}>
      {children}
    </PodcastContext.Provider>
  )
}

export function usePodcast() {
  const context = useContext(PodcastContext)
  if (context === undefined) {
    throw new Error('usePodcast must be used within a PodcastProvider')
  }
  return context
}