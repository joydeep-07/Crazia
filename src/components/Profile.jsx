import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import profile from '../assets/images/profile.jpg'

const Profile = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // State to track cursor speed for shape change
  const [cursorVelocity, setCursorVelocity] = useState(0);

  const lastPos = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const desktopPopupRef = useRef(null);

  // Motion values for smooth cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Adjust damping and stiffness for faster, more responsive movement
  const cursorXSpring = useSpring(cursorX, { damping: 10, stiffness: 200 });
  const cursorYSpring = useSpring(cursorY, { damping: 10, stiffness: 200 });

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  // Mobile specific touch handler
  const handleMobileTouchStart = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // Desktop mouse tracking with velocity calculation
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      // Calculate velocity and update state
      const velocity = Math.sqrt(dx * dx + dy * dy);
      setCursorVelocity(velocity);

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, cursorX, cursorY]);

  // Variants
  const backdropVariants = {
    initial: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
    },
    animate: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] },
    },
  };

  const popupVariants = {
    initial: { y: "100vh", opacity: 0 },
    animate: {
      y: "0",
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.5 },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        duration: 0.3,
      },
    },
  };

  const desktopPopupVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // Mobile
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isClosing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleClose}
            onTouchStart={handleMobileTouchStart}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              variants={backdropVariants}
            />
            <motion.div
              ref={popupRef}
              className="relative z-10 w-full bg-white p-6 rounded-t-3xl rounded-b-md shadow-2xl overflow-hidden"
              variants={popupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full mb-4 md:hidden" />
              <div className="flex flex-col items-center text-center px-4">
                <motion.div
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-100 mb-4 shadow-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                >
                  <img
                    src={profile}
                    alt="Joydeep Paul"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h1
                  className="text-2xl font-bold text-gray-900"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  JOYDEEP PAUL
                </motion.h1>
                <motion.p
                  className="text-sm text-gray-600 font-semibold tracking-tight"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  joydeeprnp8821@gmail.com
                </motion.p>
                <motion.p
                  className="text-base text-gray-700 font-medium tracking-tight mt-1 mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Software Engineer • MERN Stack Developer
                </motion.p>
              </div>
              <motion.div
                className="text-gray-800 leading-relaxed text-base px-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
                  ABOUT ME
                </h2>
                <p className="mb-3">
                  I am a passionate{" "}
                  <span className="font-semibold text-indigo-600">
                    MERN stack developer
                  </span>{" "}
                  focused on building scalable, user-friendly web applications.
                  My goal is to craft digital products that blend functionality
                  with beautiful design.
                </p>
                <p>
                  Experienced in real-time systems, APIs, and cloud solutions, I
                  thrive on solving complex problems with clean, maintainable
                  code. Collaboration, innovation, and creativity drive my work
                  every day.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop
  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-2xl"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1
              className="text-white text-4xl md:text-6xl lg:text-8xl font-semibold text-center mt-10 md:mt-20 tracking-tight px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Hey, Developers.
            </motion.h1>
          </motion.div>

          <motion.div
            ref={desktopPopupRef}
            className="relative z-10 bg-white p-4 md:p-8 rounded-xl md:rounded-2xl max-w-6xl h-auto md:h-[400px] w-[95%] md:w-full mx-2 md:mx-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            variants={desktopPopupVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* LHS (Profile Image + Info) */}
              <motion.div
                className="w-full md:w-1/3 flex flex-col items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-indigo-100 mb-4 md:mb-6 shadow-md"
                  whileHover={{
                    borderColor: "#a5b4fc",
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, type: "spring" }}
                >
                  <motion.img
                    src={profile}
                    alt="Paul"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h1
                    className="text-xl md:text-2xl font-bold text-gray-800"
                    whileHover={{ color: "#4f46e5", scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    JOYDEEP PAUL
                  </motion.h1>
                  <motion.p
                    className="text-sm md:text-base text-gray-600 font-semibold tracking-tight"
                    whileHover={{ color: "#6366f1" }}
                    transition={{ duration: 0.2 }}
                  >
                    joydeeprnp8821@gmail.com
                  </motion.p>
                  <motion.p
                    className="text-sm md:text-base text-gray-600 font-semibold tracking-tight mb-3"
                    whileHover={{ color: "#6366f1" }}
                    transition={{ duration: 0.2 }}
                  >
                    Software Engineer • MERN Stack Developer
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* RHS (About Section) */}
              <motion.div
                className="w-full md:w-2/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.h2
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-200"
                  whileHover={{ color: "#4f46e5", borderColor: "#a5b4fc" }}
                  transition={{ duration: 0.2 }}
                >
                  ABOUT ME
                </motion.h2>
                <motion.div
                  className="space-y-3 md:space-y-5 text-gray-800 leading-relaxed text-base md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.p
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    I am a passionate{" "}
                    <motion.span
                      className="font-semibold text-indigo-600"
                      whileHover={{
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                        paddingTop: "0.25rem",
                        paddingBottom: "0.25rem",
                        borderRadius: "0.375rem",
                        backgroundColor: "#e0e7ff",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      MERN stack developer
                    </motion.span>{" "}
                    focused on building scalable, user-friendly web
                    applications. My goal is to craft digital products that
                    blend functionality with beautiful design.
                  </motion.p>
                  <motion.p
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Experienced in real-time systems, APIs, and cloud solutions,
                    I thrive on solving complex problems with clean,
                    maintainable code. Collaboration, innovation, and creativity
                    drive my work every day.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Custom Cursor */}
          {isHovering && (
            <motion.div
              className="pointer-events-none fixed z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-lg"
              style={{
                top: cursorYSpring,
                left: cursorXSpring,
                // Dynamically change shape based on velocity
                scaleX: 1 + Math.min(cursorVelocity / 100, 0.5),
                scaleY: 1 - Math.min(cursorVelocity / 100, 0.25),
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
              // This part is for the hover effect, not the drag. Removed the old `isDragging` dependency.
              animate={{
                scale: 1,
                // Keep the same spring transition for the overall cursor position
                transition: { type: "spring", stiffness: 500, damping: 30 },
              }}
            >
              <motion.span
                className="font-semibold tracking-tighter text-sm"
                whileHover={{ scale: 1.1 }}
              >
                Close
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
