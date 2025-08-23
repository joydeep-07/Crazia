import React from "react";
import { Twitter, Instagram, Linkedin, Github, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
          {/* Brand */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Crazia.io
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed mx-auto lg:mx-0">
              We craft digital experiences that blend innovative design with
              cutting-edge technology.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:w-2/3 text-center sm:text-left">
            <div>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-4 uppercase tracking-wide">
                Work
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Projects", "Case Studies", "Approach"].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-4 uppercase tracking-wide">
                Services
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["UI/UX Design", "Web Development", "Mobile Apps"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-4 uppercase tracking-wide">
                Connect
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Careers", "Contact", "Newsletter"].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start space-x-5">
            <a
              href="https://www.instagram.com/mr.paul_16?igsh=dWhrOW1oYzdzZmlj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </a>
            <a
              href="https://github.com/joydeep-07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/joydeep-paul-07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </a>
          </div>

          <div className="text-gray-500 text-xs sm:text-sm lg:text-base text-center md:text-right mt-2 md:mt-0">
            <p>© {new Date().getFullYear()} Paul. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
