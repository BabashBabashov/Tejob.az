"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Building2, MapPin, Info, Phone, Layers, Star, Heart, GraduationCap, Rss, Shield, Share2 } from "lucide-react";
import { socialLinks } from "@/lib/data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  positions?: { slug: string; name: string; jobCount?: number }[];
  sectors?: { slug: string; name: string; jobCount?: number }[];
}

const mainNav = [
  { href: "/sirketler", label: "Şirkətlər", icon: Building2 },
  { href: "/rayonlar", label: "Region", icon: MapPin },
  { href: "/niye-biz", label: "Niyə Biz", icon: Info },
  { href: "/elaqe", label: "Əlaqə", icon: Phone },
];

const bottomNav = [
  { href: "/abune", label: "İş elanına abunə", icon: Rss },
  { href: "/sertler", label: "Şərtlər", icon: Shield },
  { href: "/is-elani-yerlesdir", label: "Elan yerləşdir", icon: null },
];

export default function MobileNav({ isOpen, onClose, positions = [], sectors = [] }: MobileNavProps) {
  const pathname = usePathname();

  const linkClass = (href: string, isButton = false) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    if (isButton) {
      return "flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700";
    }
    return `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
      active
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-slate-950 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            Menyu
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Menyunu bağla"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 overflow-y-auto px-3 py-4">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className={linkClass(item.href)}>
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
            <nav className="flex flex-col gap-1">
              <Link href="/vezifeler" onClick={onClose} className={linkClass("/vezifeler")}>
                <Layers size={18} />
                Vəzifələr
              </Link>
              <Link href="/sektorlar" onClick={onClose} className={linkClass("/sektorlar")}>
                <Layers size={18} />
                Sektorlar
              </Link>
              <Link href="/secilmis-elanlar" onClick={onClose} className={linkClass("/secilmis-elanlar")}>
                <Star size={18} />
                Seçilmiş elanlar
              </Link>
              <Link href="/kateqoriya/qadin-isleri" onClick={onClose} className={linkClass("/kateqoriya/qadin-isleri")}>
                <Heart size={18} />
                Qadın işləri
              </Link>
              <Link href="/kateqoriya/tecrube-proqramlari" onClick={onClose} className={linkClass("/kateqoriya/tecrube-proqramlari")}>
                <GraduationCap size={18} />
                Təcrübə Proqramları
              </Link>
            </nav>
          </div>

          <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
            <nav className="flex flex-col gap-1">
              {bottomNav.map((item) =>
                item.icon ? (
                  <Link key={item.href} href={item.href} onClick={onClose} className={linkClass(item.href)}>
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ) : (
                  <Link key={item.href} href={item.href} onClick={onClose} className={linkClass(item.href, true)}>
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
            <p className="mb-2 flex items-center gap-1.5 px-3 text-xs font-medium text-slate-400">
              <Share2 size={12} />
              Sosial şəbəkələr
            </p>
            <div className="flex flex-wrap gap-2 px-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
