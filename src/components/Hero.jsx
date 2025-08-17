import React, { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import "../style/custom.css";
import video from "../assets/medical.mp4";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const h1Ref = useRef(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Track mouse position + velocity (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      setVelocity({ x: dx, y: dy });
      setIsDragging(Math.abs(dx) > 2 || Math.abs(dy) > 2);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Smooth follow for play button cursor (desktop only)
  useEffect(() => {
    if (isMobile) return;

    let animationFrame;
    const smoothFollow = () => {
      setCursorPos((prev) => {
        const ease = 0.12;
        return {
          x: prev.x + (mousePos.x - prev.x) * ease,
          y: prev.y + (mousePos.y - prev.y) * ease,
        };
      });
      animationFrame = requestAnimationFrame(smoothFollow);
    };
    smoothFollow();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, isMobile]);

  // Fullscreen check
  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Play video fullscreen
  const handlePlayClick = () => {
    if (videoRef.current) {
      const vid = videoRef.current;
      if (vid.requestFullscreen) vid.requestFullscreen();
      else if (vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
      else if (vid.msRequestFullscreen) vid.msRequestFullscreen();
      vid.play();
    }
  };

  // Touch handler for mobile hover effects
  const handleTouchStart = (element) => {
    if (element === "title") {
      setIsHoveringTitle(true);
      // Set a fake mouse position for mobile
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
    } else if (element === "video") {
      setIsHoveringVideo(true);
    }
  };

  const handleTouchEnd = (element) => {
    if (element === "title") {
      setIsHoveringTitle(false);
    } else if (element === "video") {
      setIsHoveringVideo(false);
    }
  };

  return (
    <div
      id="home"
      className="text-4xl z-0 md:text-8xl font-semibold text-center mt-12 md:mt-24 relative px-4"
    >
      {/* h1 with hover circle video */}
      <h1
        ref={h1Ref}
        className="hero-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight md:leading-tight lg:leading-tight tracking-tight"
        onMouseEnter={() => !isMobile && setIsHoveringTitle(true)}
        onMouseLeave={() => !isMobile && setIsHoveringTitle(false)}
        onTouchStart={() => handleTouchStart("title")}
        onTouchEnd={() => handleTouchEnd("title")}
      >
        Building intelligent solutions
        <br className="hidden sm:block" />
        <span className="sm:hidden">&nbsp;</span>
        for a smarter future.
      </h1>

      <p className="text-sm md:text-2xl text-gray-900 mt-4 md:mt-7 leading-relaxed">
        <span className="relative overflow-hidden inline-block group">
          <span className="block transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-gray-800 px-2 md:px-0 -mx-2 md:mx-0">
            We are a design and technology studio that creates smart,
            user-centric designs. <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            We transform complex ideas into simple, beautiful digital
            experiences.
          </span>
          <span className="absolute left-0 top-full block transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-gray-900 font-medium px-2 md:px-0 -mx-2 md:mx-0">
            We are a design and technology studio that creates smart,
            user-centric designs. <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            We transform complex ideas into simple, beautiful digital
            experiences.
          </span>
          {/* Premium thin underline with gradient */}
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:via-gray-700 ml-2 md:ml-0"></span>
        </span>
      </p>

      {/* Main background video */}
      <div className="min-h-[50vh] md:min-h-screen flex items-center justify-center relative">
        <div
          className={`flex justify-center mt-6 md:mt-10 h-[300px] md:h-[700px] w-full md:w-[1400px] rounded-xl md:rounded-3xl items-center overflow-hidden shadow-lg relative ${
            !isFullscreen && !isMobile ? "cursor-none" : "cursor-auto"
          }`}
          onClick={handlePlayClick}
          onMouseEnter={() => !isMobile && setIsHoveringVideo(true)}
          onMouseLeave={() => !isMobile && setIsHoveringVideo(false)}
          onTouchStart={() => handleTouchStart("video")}
          onTouchEnd={() => handleTouchEnd("video")}
        >
          <video
            ref={videoRef}
            src="https://cuberto.com/assets/showreel/short.mp4"
            className="h-full w-full object-cover rounded-xl md:rounded-3xl"
            autoPlay
            muted
            loop
            playsInline
          ></video>

          {/* Original small cursor with Play icon (only inside video div) */}
          {isHoveringVideo && !isFullscreen && !isMobile && (
            <div
              className="pointer-events-none fixed z-50 flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-lg"
              style={{
                top: cursorPos.y - 45,
                left: cursorPos.x - 45,
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                transform: isDragging
                  ? `scaleX(${1 + Math.abs(velocity.x) * 0.04}) scaleY(${
                      1 + Math.abs(velocity.y) * 0.04
                    })`
                  : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Play
                size={22}
                className="text-black"
                style={{
                  transform: `translate(${velocity.x * 0.2}px, ${
                    velocity.y * 0.2
                  }px)`,
                  transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Big circle video cursor (only on h1 hover) */}
      {isHoveringTitle && !isMobile && (
        <div
          className="video-cursor hidden md:block"
          style={{
            top: mousePos.y - 95,
            left: mousePos.x - 95,
            transform: isDragging
              ? `scaleX(${1 + Math.abs(velocity.x) * 0.04}) scaleY(${
                  1 + Math.abs(velocity.y) * 0.04
                })`
              : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <video
            src="https://cuberto.com/assets/home/summary/2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
