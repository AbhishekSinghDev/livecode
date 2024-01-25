import heart from "@/assets/icons/love.svg";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-gray-950 fixed w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Livecode
          </a>
          . All Rights Reserved.
        </span>

        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex gap-2 items-center md:justify-center font-semibold">
          <span>Made with</span>
          <img src={heart} alt="love" className="h-5 w-5" />
          <span>By Abhishek Singh</span>
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
