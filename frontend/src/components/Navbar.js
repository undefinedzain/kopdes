"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Image } from "antd";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { name: "Tentang", link: "#about" },
    { name: "Model", link: "#model" },
    { name: "Manfaat", link: "#benefit" },
    { name: "Jenis", link: "#type" },
    { name: "Pertanyaan", link: "#faq" },
    { name: "Regulasi", link: "#regulation" },
    { name: "Kontak", link: "/kontak" },
  ];

  const handleNavClick = (link) => {
    if (link.startsWith("#")) {
      if (pathname !== "/") {
        router.push("/" + link);
      } else {
        document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    } else {
      router.push(link);
      setIsOpen(false);
    }
  };

  // Close dropdown if click outside menuRef (but NOT navbar)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white p-4 z-50">
        <div
          className="container mx-auto flex justify-between items-center px-4 md:px-6"
          ref={containerRef}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Koperasi Merah Putih"
                width={150}
                // height={50}
                preview={false}
                className="h-10 md:h-12 mr-2"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.link)}
                className="text-md text-gray-900 hover:text-[#A0B73E] transition-colors"
              >
                {item.name}
              </button>
            ))}
            <Link
              href="/masuk"
              className="ml-4 text-[#a0b73e] border border-[#a0b73e] px-4 py-2 rounded-md hover:bg-[#a0b73e] hover:text-white transition-colors"
            >
              Masuk
            </Link>
            {
              pathname === '/' ? null : (
                <Link
                  href="/daftar"
                  className="ml-4 text-[#0E4B5A] border border-[#0E4B5A] px-4 py-2 rounded-md hover:bg-[#0E4B5A] hover:text-white transition-colors"
                >
                  Daftar
                </Link>
              )
            }
          </div>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu + Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 top-[4.25rem] z-40 bg-black/30">
          <div
            ref={menuRef}
            className={`absolute top-0 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out transform
              ${isOpen ? "translate-y-0 opacity-100 scale-y-100" : "-translate-y-5 opacity-0 scale-y-95"}
            `}
          >
            <div className="flex flex-col items-start text-left px-6 py-4 w-full">
              {navItems.map((item, index) => (
                <div key={index} className="w-full">
                  <button
                    onClick={() => handleNavClick(item.link)}
                    className="flex items-center justify-between w-full py-2 text-md text-gray-900 hover:text-[#A0B73E] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </button>
                  {index !== navItems.length - 1 && (
                    <hr className="my-1 border-gray-200" />
                  )}
                </div>
              ))}
              <Link
                href="/masuk"
                className="w-full text-center mt-4 text-[#a0b73e] border border-[#a0b73e] px-4 py-2 rounded-md hover:bg-[#a0b73e] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
