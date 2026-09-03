import { Globe2, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      {/* 7. FOOTER */}
      <footer className="w-screen mx-auto px-6 sm:px-8 lg:px-12 py-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          <span className="font-bold text-gray-900 text-sm">SkillSwap+</span>
          <p className="mt-1">
            © 2024 SkillSwap+ The Digital Curator. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-gray-900 transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-gray-900 transition">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-gray-900 transition">
            Help Center
          </Link>
          <Link href="#" className="hover:text-gray-900 transition">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <Globe2 className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
