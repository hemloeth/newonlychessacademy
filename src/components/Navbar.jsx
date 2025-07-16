import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const dropdownItems = {
    services: [
      { name: "Online 1 to 1 Chess", href: "/services/online-1to1" },
      { name: "Online 1 to 2 Chess", href: "/services/online-1to2" },
      { name: "Online Group Class", href: "/services/online-group" },
      { name: "Offline Class", href: "/services/offline" },
    ],
    courses: [
      { name: "Beginner Course", href: "/courses/beginner" },
      { name: "Intermediate Course", href: "/courses/intermediate" },
      { name: "Advanced Course", href: "/courses/advanced" },
      { name: "Tournament Preparation", href: "/courses/tournament" },
    ],
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-[#f3e5d7] text-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold cursor-pointer hover:text-yellow-600 transition-colors flex items-center gap-3">
                <img
                  src="./logo.JPG"
                  alt="Only Chess Academy Logo"
                  className="w-14 h-14 object-contain rounded-full shadow-sm"
                />
                <div className="flex items-center">
                  <span className="text-gray-800">Only </span>
                  <span className="text-yellow-600">Chess </span>
                  <span className="text-gray-800">Academy</span>
                </div>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link href="/">
                <span className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors cursor-pointer relative group">
                  Home
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </span>
              </Link>
              <Link href="/about">
                <span className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors cursor-pointer relative group">
                  About Us
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </span>
              </Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors flex items-center relative group"
                >
                  <span>Our Services</span>
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === "services"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </button>

                <div
                  className={`absolute left-0 mt-1 w-56 rounded-lg shadow-xl bg-white text-gray-800 border border-gray-100 z-50 transition-all duration-300 origin-top ${
                    activeDropdown === "services"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="py-1">
                    {dropdownItems.services.map((item, index) => (
                      <Link key={index} href={item.href}>
                        <span className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Courses Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("courses")}
                  className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors flex items-center relative group"
                >
                  <span>Our Courses</span>
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === "courses" ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </button>

                <div
                  className={`absolute left-0 mt-1 w-56 rounded-lg shadow-xl bg-white text-gray-800 border border-gray-100 z-50 transition-all duration-300 origin-top ${
                    activeDropdown === "courses"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="py-1">
                    {dropdownItems.courses.map((item, index) => (
                      <Link key={index} href={item.href}>
                        <span className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/blog">
                <span className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors cursor-pointer relative group">
                  Blog
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </span>
              </Link>
              <Link href="/gallery">
                <span className="px-4 py-3 rounded-md text-sm font-medium hover:text-yellow-600 transition-colors cursor-pointer relative group">
                  Gallery
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-yellow-600 w-0 group-hover:w-3/4 transition-all duration-300"></span>
                </span>
              </Link>
              <Link href="/contact">
                <span className="ml-4 px-6 py-3 rounded-full text-sm font-medium bg-yellow-600 text-white hover:bg-yellow-700 transition-colors cursor-pointer shadow-md hover:shadow-lg">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
      >
        <div className="px-2 pt-2 pb-4 sm:px-3 space-y-2 bg-white shadow-lg">
          <Link href="/">
            <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
              Home
            </span>
          </Link>

          <Link href="/about">
            <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
              About Us
            </span>
          </Link>

          <div>
            <button
              onClick={() => toggleDropdown("services-mobile")}
              className="w-full flex justify-between items-center px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors"
            >
              <span>Our Services</span>
              <svg
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "services-mobile"
                    ? "transform rotate-180"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`pl-6 transition-all duration-300 overflow-hidden ${
                activeDropdown === "services-mobile" ? "max-h-48" : "max-h-0"
              }`}
            >
              {dropdownItems.services.map((item, index) => (
                <Link key={index} href={item.href}>
                  <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => toggleDropdown("courses-mobile")}
              className="w-full flex justify-between items-center px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors"
            >
              <span>Our Courses</span>
              <svg
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "courses-mobile"
                    ? "transform rotate-180"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`pl-6 transition-all duration-300 overflow-hidden ${
                activeDropdown === "courses-mobile" ? "max-h-48" : "max-h-0"
              }`}
            >
              {dropdownItems.courses.map((item, index) => (
                <Link key={index} href={item.href}>
                  <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog">
            <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
              Blog
            </span>
          </Link>

          <Link href="/gallery">
            <span className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 hover:text-yellow-600 transition-colors cursor-pointer">
              Gallery
            </span>
          </Link>

          <Link href="/contact">
            <span className="block px-4 py-3 rounded-full text-base font-medium bg-yellow-600 text-white hover:bg-yellow-700 transition-colors cursor-pointer text-center shadow-md">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
