"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Star,
  Heart,
  GraduationCap,
  Building2,
  MapPin,
  Users,
  BookOpen,
  Rss,
  Newspaper,
} from "lucide-react";
import { socialLinks } from "@/lib/data";

interface SidebarProps {
  positions?: { slug: string; name: string; jobCount?: number }[];
  sectors?: { slug: string; name: string; jobCount?: number }[];
}

function getSocialIcon(name: string) {
  switch (name) {
    case "Telegram":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 32 32">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.118-1.97A15.906 15.906 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.374 22.608c-.39 1.1-1.932 2.014-3.168 2.28-.84.18-1.934.322-5.626-1.208-4.726-1.956-7.762-6.76-8-7.074-.23-.314-1.896-2.524-1.896-4.814 0-2.29 1.2-3.418 1.628-3.88.39-.428.926-.548 1.232-.548.15 0 .282.008.402.014.4.016.602.04.864.66.33.778 1.136 2.76 1.236 2.96.1.2.166.434.034.7-.13.27-.244.436-.444.674-.2.236-.42.526-.6.71-.18.186-.37.386-.156.758.212.37.944 1.556 2.026 2.52 1.39 1.236 2.56 1.618 2.93 1.798.37.18.584.15.8-.09.25-.274 1.062-1.236 1.346-1.668.284-.432.57-.36.96-.216s2.486 1.176 2.91 1.39c.424.214.708.32.814.498.106.178.106 1.03-.284 2.128z"/>
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ positions = [], sectors = [] }: SidebarProps) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      pathname === href || pathname.startsWith(href + "/")
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-52 shrink-0 flex-col gap-2 overflow-y-auto border-r border-slate-200 bg-white px-2 py-4 lg:flex dark:border-slate-800 dark:bg-[#0f172a]">
      {/* Main navigation */}
      <nav className="flex flex-col gap-0.5">
        <Link href="/secilmis-elanlar" className={linkClass("/secilmis-elanlar")}>
          <Star size={18} />
          Seçilmiş elanlar
        </Link>
        <Link href="/kateqoriya/qadin-isleri" className={linkClass("/kateqoriya/qadin-isleri")}>
          <Heart size={18} />
          Qadın işləri
        </Link>
        <Link href="/kateqoriya/tecrube-proqramlari" className={linkClass("/kateqoriya/tecrube-proqramlari")}>
          <GraduationCap size={18} />
          Təcrübə Proqramları
        </Link>
      </nav>

      {/* Vəzifələr */}
      <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
        <Link href="/vezifeler" className={linkClass("/vezifeler")}>
          <Layers size={18} />
          Vəzifələr
        </Link>
      </div>

      {/* Sektorlar */}
      <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
        <Link href="/sektorlar" className={linkClass("/sektorlar")}>
          <Newspaper size={18} />
          Sektorlar
        </Link>
      </div>

      {/* Links */}
      <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
        <nav className="flex flex-col gap-0.5">
          <Link href="/sirketler" className={linkClass("/sirketler")}>
            <Building2 size={18} />
            Şirkətlər
          </Link>
          <Link href="/rayonlar" className={linkClass("/rayonlar")}>
            <MapPin size={18} />
            Rayonlar
          </Link>
          <Link href="/abune" className={linkClass("/abune")}>
            <Rss size={18} />
            İş elanına abunə
          </Link>
        </nav>
      </div>

      {/* Social */}
      <div className="mt-auto border-t border-slate-100 pt-3 dark:border-slate-800">
        <p className="mb-2 px-3 text-xs font-medium text-slate-400">Sosial şəbəkələr</p>
        <div className="grid grid-cols-3 gap-2 px-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
              title={link.name}
            >
              {getSocialIcon(link.name)}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
