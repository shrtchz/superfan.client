// components/PodcastDialog.tsx
"use client"

import { useState } from "react"
import { X, Minimize, Maximize, Play, Pause, SkipBack, SkipForward, Volume2, Youtube } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// import { usePodcast } from "@/contexts/PodcastContext"
import Image from "next/image"
import { FaYoutube } from "react-icons/fa6"
export default function Podcastg() {
  // const { isPodcastOpen, closePodcast } = usePodcast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPipMode, setIsPipMode] = useState(false)

  const togglePlay = () => setIsPlaying(!isPlaying)
  const togglePipMode = () => setIsPipMode(!isPipMode)

  // YouTube link for the podcast
  const youtubeLink = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"

  const handleWatchOnYouTube = () => {
    window.open(youtubeLink, "_blank", "noopener,noreferrer")
  }

  if (isPipMode) {
    return (
      <div className="flex flex-col justify-center gap-4 dark:text-white text-black itemscenter w-full flex-1 h-full border border-t-0 border-b-0 border-gray-300 ">
        {/* PIP Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Image
            src="/GAME WHITE AND BLACK 2-1.svg"
            alt="Logo"
            width={250}
            height={150}
            priority
          />
        </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Superfan podcast</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePipMode}
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={closePodcast}
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </div>

        {/* PIP Content */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
           
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                Episode 1: All about Accents!
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Superfan podcast</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Watch on YouTube button in PIP mode */}
          <Button
            onClick={handleWatchOnYouTube}
            variant="outline"
            size="sm"
            className="w-full mt-3 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Youtube className="h-4 w-4 mr-2" />
            Watch on YouTube
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center gap-4 dark:text-white text-black items-center w-full flex-1 h-full border border-t-0 border-b-0 border-gray-300">
    <div className="h-full w-[60%]">
    
        <div className="w-full flex items-center justify-ccenter p-6 border-gray-200 dark:border-gray-700">
          <div className="w-full flex flex-col justify-center items-center">
       
       
            <div className="border  rounded-md flex h-10 items-center gap-2 px-2 mt-4 ">
                <FaYoutube fill="red"/>
                Youtube
            </div>
          </div>
          <div className="flex items-center space-x-2">
         
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Episode Title */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Episode 1: All about Accents! Voices from Singapore and South Africa
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By <strong>Olofofo</strong> on Wednesday, March 6, 2024
            </p>
          </div>
<div className="w-full rounded-md relative h-40">
    <Image
      src="/lago.jpeg"
      alt="Podcast Episode 1 Thumbnail"
      fill
      className=" object-cover rounded-md"
      priority
    />      
</div>
          {/* Description */}
          <div className="flex flex-row gap-2">
            <p className="text-gray-700 text-sm dark:text-gray-300 leadingrelaxed ">
              The stories of two people living in different parts of Singapore and South Africa, and the unique characteristics of their accents.
            </p>
            {/* Watch on YouTube Button */}
          </div>
          <div className="flex justify-center flex-col items-center gap-4 border-b border-gray-200  dark:border-gray-700 pb-10">
            <button
              onClick={handleWatchOnYouTube}
           
              
              className="border  bg-black text-white rounded-full px-2 w-2/3 h-10"
            >
          
              Watch Episode 1
            </button>
          </div>
            {/* <hr  className="border-b border-gray-200 h-[] dark:border-gray-700 mt-10"/> */}

         
        </div>

        {/* Player Controls */}
        {/* <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={togglePlay}
                className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
        
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-1/3"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10:30</span>
              <span>30:00</span>
            </div>
          </div>
        </div> */}
        </div>
        </div>

  )
}