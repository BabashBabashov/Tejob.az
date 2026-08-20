"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";

interface AppShellProps {
  children: React.ReactNode;
  positions?: { slug: string; name: string; jobCount?: number }[];
  sectors?: { slug: string; name: string; jobCount?: number }[];
}

export default function AppShell({ children, positions = [], sectors = [] }: AppShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsOpen(true)} />
      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} positions={positions} sectors={sectors} />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
        <Sidebar positions={positions} sectors={sectors} />
        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Footer />
    </>
  );
}
