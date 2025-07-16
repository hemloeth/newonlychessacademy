import React, { useState, useEffect } from "react";

// Framer Motion implementation using CSS animations (since framer-motion isn't available)
const AnimatedDiv = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  ...props
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        animation: `slideInUp ${duration}s ease-out ${delay}s both`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const InfiniteTypewriter = ({
  texts,
  delay = 0,
  speed = 100,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[currentTextIndex];

        if (isDeleting) {
          // Delete character
          setDisplayedText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);

          if (currentIndex === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          }
        } else {
          // Add character
          setDisplayedText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);

          if (currentIndex === currentText.length) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, isDeleting, texts, speed]);

  return (
    <span className={`${className}`}>
      {displayedText}
      <span
        className={`inline-block w-0.5 h-6 md:h-8 lg:h-10 bg-yellow-600 ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 0.1s" }}
      />
    </span>
  );
};

const ModernImageBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer shadow layer - creates depth */}
      <div className="absolute inset-0 transform translate-x-3 translate-y-3 bg-black/10 rounded-3xl blur-sm"></div>
      {/* Middle shadow layer */}
      <div className="absolute inset-0 transform translate-x-1.5 translate-y-1.5 bg-black/5 rounded-3xl"></div>
      {/* Main border container with tapered effect */}
      <div className="relative bg-gradient-to-br from-orange-100/80 to-orange-200/60 rounded-3xl shadow-lg overflow-hidden">
        {/* Create the tapered border effect using clip-path */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-100/80 to-orange-200/60 rounded-3xl"
          style={{
            clipPath: "polygon(0 0, 100% 6px, 94% 100%, 6px 100%)",
          }}
        ></div>
        {/* Content area with equal padding */}
        <div className="relative m-6">
          {/* Inner white border */}
          <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
            <div
              className="absolute inset-0 bg-white rounded-xl"
              style={{
                clipPath: "polygon(0 0, 100% 3px, 97% 100%, 3px 100%)",
              }}
            ></div>
            <div className="relative m-3">
              {/* Content container */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 rounded-lg shadow-inner"></div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const handleGrandmasterClick = () => {
    // Add your click handler logic here
    console.log("Grandmaster section clicked!");
    // Example: navigate to about page, show modal, etc.
  };

  const handleDemoClick = () => {
    // Add your demo booking logic here
    console.log("Demo class booking clicked!");
    // Example: open booking form, navigate to booking page, etc.
  };

  return (
    <section className="relative bg-[#f3e5d7] overflow-hidden">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out both;
        }

        .animate-slide-right {
          animation: slideInRight 1s ease-out 0.3s both;
        }

        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="relative z-10 animate-slide-left">
            <AnimatedDiv delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block whitespace-nowrap">
                  Empowering young minds
                </span>
                <span className="block whitespace-nowrap">through the,</span>
                <InfiniteTypewriter
                  texts={[
                    "art of chess !",
                    "game of strategy !",
                    "joy of learning !",
                  ]}
                  delay={0.5}
                  speed={80}
                  className="text-yellow-600"
                />
              </h1>
            </AnimatedDiv>

            <AnimatedDiv delay={0.4} className="space-y-2 mb-8">
              <p className="text-lg md:text-xl text-gray-700">
                Welcome to a place where children don't just learn chess —{" "}
                Whether your child is a curious beginner or an aspiring
                tournament player, we guide them every step of the way with
                passion and purpose.
                <span className="font-semibold"> They learn to think.</span>
              </p>
            </AnimatedDiv>

            <AnimatedDiv delay={0.6}>
              <button
                onClick={handleDemoClick}
                className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-slow"
              >
                Book a Demo Class
              </button>
            </AnimatedDiv>
          </div>

          {/* Image content with modern border - now with entrance animation */}
          <div className="relative w-full md:w-4/5 lg:w-3/4 justify-self-end animate-slide-right">
            <ModernImageBorder className="hover:scale-[1.02] transition-all duration-500">
              <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src="/young-kid-.jpg"
                  alt="Chess Master Academy - Grandmaster Srinath Narayanan teaching young chess players"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't load
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback content if image fails to load */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200"
                  style={{ display: "none" }}
                >
                  <div className="text-center p-6">
                    <div className="text-7xl md:text-8xl drop-shadow-2xl text-yellow-600 transform hover:scale-110 transition-transform duration-300">
                      ♔
                    </div>
                    <p className="mt-3 text-gray-700 font-medium tracking-wide text-sm md:text-base">
                      Chess Master Academy
                    </p>
                  </div>
                  <div className="absolute top-6 left-6 text-2xl text-black/10 transform hover:text-black/30 hover:scale-125 transition-all duration-300">
                    ♖
                  </div>
                  <div className="absolute bottom-6 right-6 text-2xl text-black/10 transform hover:text-black/30 hover:scale-125 transition-all duration-300">
                    ♝
                  </div>
                </div>
              </div>
            </ModernImageBorder>

            {/* Grandmaster highlight box overlapping bottom - now clickable */}
            <AnimatedDiv
              delay={0.8}
              className="absolute -bottom-16 left-4 right-4 z-10"
            >
              <button
                onClick={handleGrandmasterClick}
                className="w-full relative bg-[#d18601] rounded-xl p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-yellow-600 hover:to-orange-600 group cursor-pointer"
              >
                <div className="text-center py-2">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 group-hover:text-yellow-100 transition-colors duration-300">
                    Tanay Maheshwari
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">
                    FIDE ID: 88149692
                  </p>
                  {/* <p className="text-white/90 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">
                    Olympiad Team
                  </p> */}

                  {/* Click indicator */}
                  {/* <div className="mt-3 flex items-center justify-center space-x-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
                      Click to learn more
                    </span>
                    <div className="w-4 h-4 border-2 border-white/60 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white/80 rounded-full transform group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                  </div> */}
                </div>

                {/* Decorative chess piece accent */}
                <div className="absolute -top-2 -right-2 text-3xl text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-300">
                  ♚
                </div>

                {/* Subtle animated background effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
