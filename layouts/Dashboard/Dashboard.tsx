"use client";

import { DashboardHeader } from "@/components/Dashboard";
import { Group } from "@/types";
import clsx from "clsx";
import { ComponentProps, useCallback, useState } from "react";
import styles from "./Dashboard.module.css";

interface Props extends ComponentProps<"div"> {
  groups: Group[];
}

export function DashboardLayout({
  children,
  groups,
  className,
  ...props
}: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <div className={clsx(className, styles.container)} {...props}>
      <header className={styles.header}>
        <DashboardHeader isOpen={isMenuOpen} onMenuClick={handleMenuClick} />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
