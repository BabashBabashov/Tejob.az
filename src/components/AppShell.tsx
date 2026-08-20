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
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar positions={positions} sectors={sectors} />
        <main className="flex-1 overflow-auto px-2 py-2 sm:px-4 lg:px-6">{children}</main>
      </div>
      <Footer />
    </>
  );
}
