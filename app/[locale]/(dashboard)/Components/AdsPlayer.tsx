"use client";
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  VolumeX,
  MoreHorizontal,
  RefreshCwIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdPlayer() {
  const cardVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true); // Start muted for auto-play
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false);

  // Auto-play when component mounts (muted)
  useEffect(() => {
    const v = cardVideoRef.current;
    if (!v || autoPlayAttempted) return;

    const playVideo = async () => {
      try {
        // Start muted to allow auto-play
        v.muted = true;
        await v.play();
        setPlaying(true);
        setAutoPlayAttempted(true);
      } catch (err) {
        console.log("Auto-play failed:", err);
        setPlaying(false);
      }
    };

    playVideo();
  }, [autoPlayAttempted]);

  // Track card video progress
  useEffect(() => {
    const v = cardVideoRef.current;
    if (!v) return;

    const onTime = () => setProgress(v.currentTime);
    const onLoaded = () => setDuration(v.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => setPlaying(false);

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnd);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  // Sync volume/mute on both videos
  useEffect(() => {
    const vids = [cardVideoRef.current, modalVideoRef.current];
    vids.forEach((v) => {
      if (!v) return;
      v.muted = muted;
      v.volume = volume;
    });
  }, [muted, volume]);

  // Modal open/close behavior
  useEffect(() => {
    const card = cardVideoRef.current;
    const modal = modalVideoRef.current;
    if (!card || !modal) return;

    if (open) {
      // Opening modal
      card.pause();

      // Try to play modal when it's ready
      if (modalLoaded) {
        modal.currentTime = card.currentTime;
        modal.play().catch(() => { });
      }
    } else {
      // Closing modal
      modal.pause();
      card.currentTime = modal.currentTime;
      // Only resume if it was playing before
      if (playing) {
        card.play().catch(() => { });
      }
    }
  }, [open, modalLoaded, playing]);

  const togglePlay = () => {
    const v = cardVideoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().then(() => {
        setPlaying(true);
      }).catch(err => {
        console.log("Play failed:", err);
      });
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleReplay = () => {
    const v = cardVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => {
      setPlaying(true);
    }).catch(err => {
      console.log("Replay failed:", err);
    });
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = cardVideoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * duration;
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const format = (s: number) => {
    if (!isFinite(s) || s <= 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <Card className="w-full rounded-2xl p-0 shadow-lg overflowhidden border-gray-300 border">
      <CardContent className="p-0">

        {/* Header */}
        <div className="flex items-center gap- justify-between px-2 py-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 font-semibold">
            <img
              src="/ngflag.png"
              alt="gov logo"
              className="w-6 h-6 object-contain"
            />
            <div>
              <p className="text-xs xl:text-base">Government of Naija</p>
              <p className="text-[10px]">Sponsored</p>
            </div>
          </div>
          <div className="flex gap-1 text-xs h-max items-center">
            <p className="text-gray-500 xl:flex hidden">Advertisement</p>

            {/* Popover */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className=" p-0 text-gray-600">
                  <MoreHorizontal className="" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-sm border-gray-300">
                <DropdownMenuItem>Remove Ad</DropdownMenuItem>
                <DropdownMenuItem>Report this Ad</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* CARD VIDEO */}
        <div className="relative bg-green-700 min-h-[220px]">
          <video
            ref={cardVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster="/coverpost.png"
            src="/podcast.mp4"
            preload="metadata"
            autoPlay
            muted={true} // Start muted to allow auto-play
            playsInline
            loop // Add loop to keep playing
          />

          {/* Auto-play overlay indicator */}
          {!autoPlayAttempted && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center  gap-2 justify-between xl:px-3 py-3 border-t bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="p-1" size={"icon-sm"} onClick={handleReplay}>
              <RefreshCwIcon size={16} />
            </Button>
            <Button variant="ghost" className="p-1" size={"icon-sm"} onClick={togglePlay}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            <div className="flex items-center xl:gap-2">
              <Button
                variant="ghost"
                className="p-1" size={"icon-sm"}
                onClick={toggleMute}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
            </div>
          <div className="flex items-center gap-3  text-xs text-gray-600">
            <span>
              {format(progress)} / {format(duration)}
            </span>

          </div>
            <Dialog open={open} onOpenChange={(v) => {
              setOpen(v);
              if (!v) setModalLoaded(false);
            }}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="p-1" size={"icon-sm"}>
                  <Maximize2 size={16} />
                </Button>
              </DialogTrigger>

              {/* MODAL VIDEO */}
              <DialogContent className="w-full max-w-4xl p-0 rounded-2xl bg-black">
                <div className="relative w-full h-[60vh] bg-black">
                  <video
                    ref={modalVideoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/podcast.mp4"
                    preload="auto"
                    muted={muted}
                    onLoadedMetadata={() => setModalLoaded(true)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>

        {/* Progress bar */}
        <div className="px-4 py-0.5 xl:py-2 bg-white">
          <div
            className="h-2 bg-gray-200 rounded cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-green-600 transition-all duration-100"
              style={{
                width: duration ? `${(progress / duration) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="xl:px-4 xl:py-3 text-xs text-gray-700 bg-white">
          <div className="flex items-start justify-between gap-3">
            <p className="flex-1">
              We help job seekers develop the skills they need to support
              businesses like yours.
            </p>
            <Button className="whitespace-nowrap rounded-full">Learn more</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}