import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    // { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 md:px-12 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <span className="text-2xl font-semibold ">Crezia.io</span>

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}

          {/* Desktop Links */}
          {!isMobile && (
            <div className="flex gap-6 md:gap-10 text-base md:text-lg font-semibold">
              {links.map((link, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden group h-6 cursor-pointer"
                  onClick={() => handleClick(link.id)}
                >
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.name}
                  </span>
                  <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu with animations */}
        {isMobile && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 pb-4 space-y-2">
              {links.map((link, i) => (
                <div
                  key={i}
                  className={`py-3 px-4 text-lg font-semibold cursor-pointer hover:bg-gray-100 rounded transition-all duration-300 transform ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onClick={() => handleClick(link.id)}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
