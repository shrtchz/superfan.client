"use client";
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Play,
  Pause,
  Repeat,
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
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);

  // Track card video progress
  useEffect(() => {
    const v = cardVideoRef.current;
    if (!v) return;

    const onTime = () => setProgress(v.currentTime);
    const onLoaded = () => setDuration(v.duration || 0);

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
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
        modal.play().catch(() => {});
      }
    } else {
      // Closing modal
      modal.pause();
      card.currentTime = modal.currentTime;
      card.play().catch(() => {});
    }
  }, [open, modalLoaded]);

  const togglePlay = () => {
    const v = cardVideoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleReplay = () => {
    const v = cardVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = cardVideoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * duration;
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
    <Card className="w-[330px] rounded-2xl p-0 shadow-lg overflow-hidden border">
      <CardContent className="p-0">

        {/* Header */}
        <div className="flex itemscenter justify-between px-2 py-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 font-semibold">
            <img
              src="/logo-placeholder.png"
              alt="gov logo"
              className="w-6 h-6 object-contain"
            />
            <div>
              <p>Government of Naija</p>
              <p className="text-[10px]">Sponsored</p>
            </div>
          </div>
          <p className="text-gray-500">Advertisement</p>

          {/* Popover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-4 p-0 text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-sm">
              <DropdownMenuItem>Remove Ad</DropdownMenuItem>
              <DropdownMenuItem>Report this Ad</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* CARD VIDEO */}
        <div className="relative bg-green-700 min-h-[220px]">
          <video
            ref={cardVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster="/coverpost.png"
            src="/podcast.mp4"
            preload="metadata"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-3 py-3 border-t bg-white">
          <div className="flex items-center gap-2">
          <Button variant="ghost" className="p-2" onClick={handleReplay}>
              {/* <Repeat /> */}
              <RefreshCwIcon/>
            </Button>
            <Button variant="ghost" className="p-1" onClick={togglePlay}>
              {playing ? <Pause /> : <Play />}
            </Button>

           

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="p-1"
                onClick={() => setMuted((m) => !m)}
              >
                {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
              </Button>

              {/* <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  setMuted(v === 0);
                }}
                className="h-2 w-24"
              /> */}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>
              {format(progress)} / {format(duration)}
            </span>

            <Dialog open={open} onOpenChange={(v) => {
              setOpen(v);
              if (!v) setModalLoaded(false);
            }}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Maximize2 />
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
                    onLoadedMetadata={() => setModalLoaded(true)}
                  />
                  
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 py-2 bg-white">
          <div
            className="h-2 bg-gray-200 rounded cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-green-600"
              style={{
                width: duration ? `${(progress / duration) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 text-xs text-gray-700 bg-white">
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
