import React, { useState, useEffect, useRef } from "react";
import "../style/button.css";
import { projects } from "../Data/data";


const Featured = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeProjectLink, setActiveProjectLink] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef({});

  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip mouse effects on mobile

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      setVelocity({ x: dx, y: dy });

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return; // Skip cursor effects on mobile

    let animationFrame;
    const smoothFollow = () => {
      setCursorPos((prev) => {
        const ease = 0.12;
        const newX = prev.x + (mousePos.x - prev.x) * ease;
        const newY = prev.y + (mousePos.y - prev.y) * ease;
        return { x: newX, y: newY };
      });
      animationFrame = requestAnimationFrame(smoothFollow);
    };
    smoothFollow();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, isMobile]);

  const handleProjectClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleViewAllClick = () => {
    setShowAllProjects(true);
  };

  const handleViewLessClick = () => {
    setShowAllProjects(false);
  };

  const handleMouseEnter = (projectId, link) => {
    if (isMobile) return; // Skip hover effects on mobile

    setIsHoveringImage(true);
    setActiveProjectLink(link);
    setHoveredProjectId(projectId);

    // Play the video
    if (videoRefs.current[projectId]) {
      videoRefs.current[projectId].currentTime = 0;
      videoRefs.current[projectId]
        .play()
        .catch((e) => console.log("Video play error:", e));
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Skip hover effects on mobile

    setIsHoveringImage(false);
    setActiveProjectLink(null);
    setHoveredProjectId(null);

    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  const handleTouchStart = (projectId, link) => {
    if (!isMobile) return;

    setActiveProjectLink(link);
    setHoveredProjectId(projectId);

    // Play the video
    if (videoRefs.current[projectId]) {
      videoRefs.current[projectId].currentTime = 0;
      videoRefs.current[projectId]
        .play()
        .catch((e) => console.log("Video play error:", e));
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    setHoveredProjectId(null);

    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  const projectsToDisplay = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <div
      id="projects"
      className="min-h-screen bg-black text-gray-100 rounded-t-[20px] md:rounded-t-[50px] p-4 md:p-12"
    >
      <div className="max-w-[1500px] mx-auto">
        <h1 className="group pt-6 md:pt-10 pb-4 md:pb-8 pl-2 md:pl-4 text-3xl md:text-5xl lg:text-8xl tracking-tight font-semibold relative">
          Featured Projects
          <span
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-white to-transparent 
                   transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full ml-2 md:ml-0"
          ></span>
        </h1>

        <div className="flex flex-col gap-12 md:gap-24 mt-6 md:mt-15">
          {projectsToDisplay.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-4 md:gap-8`}
            >
              <div
                className={`w-full md:w-1/2 rounded-xl md:rounded-2xl overflow-hidden shadow-lg group ${
                  isHoveringImage ? "cursor-none" : "cursor-pointer"
                }`}
                onMouseEnter={() =>
                  handleMouseEnter(project.id, project.liveLink)
                }
                onMouseLeave={handleMouseLeave}
                onTouchStart={() =>
                  handleTouchStart(project.id, project.liveLink)
                }
                onTouchEnd={handleTouchEnd}
                onClick={() => handleProjectClick(project.liveLink)}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className={`w-full h-[200px] md:h-[350px] object-cover transition-all duration-500 ${
                      hoveredProjectId === project.id
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  />
                  <video
                    ref={(el) => (videoRefs.current[project.id] = el)}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                      hoveredProjectId === project.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center p-2 md:p-4">
                <h2 className="text-2xl md:text-4xl lg:text-[50px] font-semibold text-gray-100">
                  {project.title}
                </h2>
                <p className="text-base md:text-xl lg:text-[25px] font-semibold text-gray-100 mt-2 md:mt-6 leading-relaxed">
                  {project.description}
                </p>

                <button
                  className="water-wave-btn border border-white px-4 py-2 md:px-6 md:py-4 text-sm md:text-xl font-semibold rounded-full mt-4 md:mt-10 relative overflow-hidden group w-fit"
                  onClick={() => handleProjectClick(project.liveLink)}
                >
                  <span className="relative z-10">View Project</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isMobile && isHoveringImage && (
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
            onClick={() => handleProjectClick(activeProjectLink)}
          >
            <span
              className="text-black font-semibold text-sm"
              style={{
                transform: `translate(${velocity.x * 0.2}px, ${
                  velocity.y * 0.2
                }px)`,
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Explore
            </span>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center gap-4 md:gap-12 px-4 md:px-16 py-8 md:py-20">
        {!showAllProjects ? (
          <button
            className="water-wave-btn border border-white px-6 py-3 md:px-10 md:py-6 text-base md:text-2xl font-semibold rounded-full mt-6 md:mt-10 relative overflow-hidden group"
            onClick={handleViewAllClick}
          >
            <span className="relative z-10">View All Projects</span>
          </button>
        ) : (
          <button
            className="water-wave-btn border border-white px-6 py-3 md:px-10 md:py-6 text-base md:text-2xl font-semibold rounded-full mt-6 md:mt-10 relative overflow-hidden group"
            onClick={handleViewLessClick}
          >
            <span className="relative z-10">View Less</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Featured;
