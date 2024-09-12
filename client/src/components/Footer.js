import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm mb-2">
            &copy; {new Date().getFullYear()} Travelly. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;