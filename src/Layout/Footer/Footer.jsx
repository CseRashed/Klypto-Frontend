import React, { useEffect, useState } from "react";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1f2937] text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg
                width="40"
                height="40"
                fill="currentColor"
                className="text-orange-400"
                viewBox="0 0 24 24"
              ></svg>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Klypto
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Reliable, stylish, and affordable products since 1992.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-gray-400 hover:text-white"
                  viewBox="0 0 24 24"
                ></svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-gray-400 hover:text-white"
                  viewBox="0 0 24 24"
                ></svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-gray-400 hover:text-white"
                  viewBox="0 0 24 24"
                ></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a className="hover:text-orange-400">Branding</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Design</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Marketing</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Advertisement</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a className="hover:text-orange-400">About us</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Contact</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Jobs</a>
              </li>
              <li>
                <a className="hover:text-orange-400">Press kit</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Get the latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded bg-gray-700 text-sm sm:text-base focus:outline-none text-white"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-600 text-xs sm:text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ACME Shop. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ by Rashed</p>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full shadow-lg z-50 transition"
          title="Scroll to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
