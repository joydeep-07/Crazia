// src/data/data.js
import portfolioVideo from "../assets/portfolio.mp4";
import medicalVideo from "../assets/medical.mp4";
import twistyTangleVideo from "../assets/twistytangle.mp4";
import gridWarsVideo from "../assets/grid-wars.mp4";

export const projects = [
  {
    id: 1,
    img: "https://i.pinimg.com/1200x/17/ca/2e/17ca2e07192d20d7287fc799f51e06a6.jpg",
    video: portfolioVideo,
    title: "Modern Portfolio",
    description:
      "A sleek, responsive portfolio showcasing projects, skills, and experience, built with modern web technologies, clean design, smooth animations, and fully optimized for desktop and mobile devices.",
    liveLink: "https://codecanvas-cv.netlify.app/",
  },
  {
    id: 3,
    img: "https://i.pinimg.com/1200x/47/a5/40/47a54046a8a0bf77b047d4189313297b.jpg",
    video: medicalVideo,
    title: "Medical Booking",
    description:
      "Healthcare appointment scheduling platform connecting patients with medical providers efficiently, featuring real-time slot updates, email confirmations, secure authentication, and role-based access for seamless healthcare management.",
    liveLink: "https://medcare-book-appointments.netlify.app/",
  },
  {
    id: 4,
    img: "https://i.pinimg.com/736x/f1/80/b2/f180b205c737ec52f906b7adbc5ede92.jpg",
    video: twistyTangleVideo,
    title: "Twisty Tangle",
    description:
      "A fun word scramble game built with React where users unscramble words, earn points, track scores, and enjoy a colorful, interactive interface designed for engaging and challenging gameplay.",
    liveLink: "https://twisttangle.netlify.app/",
  },
  {
    id: 5,
    img: "https://i.pinimg.com/1200x/93/51/56/935156147db7f8c59335c03199e3e3eb.jpg",
    video: gridWarsVideo,
    title: "Grid Wars",
    description:
      "Classic Tic Tac Toe game built with React, featuring two-player mode, responsive design, interactive grid, score tracking, and smooth animations for a fun and competitive gaming experience.",
    liveLink: "https://grid-wars.netlify.app/",
  },
];
