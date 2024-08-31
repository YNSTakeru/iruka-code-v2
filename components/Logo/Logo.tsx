import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <Image
        className={styles.mark}
        src="/iruka.svg"
        alt="Logo"
        width={32}
        height={32}
      />
      <span className={styles.wordmark}>Iruka Code</span>
    </div>
  );
}
