"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsOpen(true)} />
      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Footer />
    </>
  );
}
