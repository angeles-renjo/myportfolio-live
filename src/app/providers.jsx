"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";

export function Providers({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}
