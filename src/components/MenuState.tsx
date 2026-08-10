"use client";

import { ReactNode, useState } from "react";

interface MenuStateProps {
  children: (state: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => ReactNode;
}

export default function MenuState({ children }: MenuStateProps) {
  const [isOpen, setIsOpen] = useState(false);
  return <>{children({ isOpen, setIsOpen })}</>;
}
