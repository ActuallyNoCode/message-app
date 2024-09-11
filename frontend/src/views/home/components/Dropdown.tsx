"use client";

import React, { useState, useEffect, useRef } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <SlOptionsVertical size={20} />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile" className="block">
                Profile
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/login" className="block">
                Exit
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
