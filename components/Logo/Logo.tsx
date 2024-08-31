import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <img className={styles.mark} src={"/iruka.svg"} alt={"Logo"} />
      <span className={styles.wordmark}>Iruka Code</span>
    </div>
  );
}
