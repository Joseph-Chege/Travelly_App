import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-green-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-xs sm:text-sm md:text-base mb-2">
            &copy; {new Date().getFullYear()} Travelly. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 -mb-1 text-xs sm:text-sm md:text-base">
            <a href="/about" className="hover:underline">
              About Us
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
