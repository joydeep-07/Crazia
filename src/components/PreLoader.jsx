import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      {/* Sleek Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-px">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 opacity-20 hover:opacity-100 hover:bg-gray-300 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30" />
      </div>

      <div className="text-center space-y-6 relative z-10">
        {/* Sleek Logo/Name */}
        <div className="mb-6">
          <h1 className="text-4xl font-light tracking-tighter text-gray-800">
            <span className="font-medium">Crazia</span>
            <span className="text-gray-400">.io</span>
          </h1>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-px bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-gray-800 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Percentage with fade animation */}
        <p className="text-xs text-gray-500 font-mono animate-pulse">
          {progress}%
        </p>

        {/* Subtle loading indicator */}
        <div className="pt-4">
          <div className="inline-block space-x-1">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="inline-block w-1 h-1 bg-gray-400 rounded-full"
                style={{
                  animation: `pulse 1.4s infinite ${i * 0.2}s`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .grid-background:hover .grid-cell {
          opacity: 0.1;
        }

        .grid-background .grid-cell:hover {
          opacity: 0.8 !important;
          background: linear-gradient(45deg, #f3f4f6, #e5e7eb) !important;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8),
            0 0 12px rgba(209, 213, 219, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Preloader;
