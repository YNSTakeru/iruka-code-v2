import { Container } from "@/primitives/Container";
import clsx from "clsx";
import { ComponentProps, useMemo } from "react";
import styles from "./MarketingFooter.module.css";

export function MarketingFooter({
  className,
  ...props
}: ComponentProps<"footer">) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={clsx(className, styles.footer)} {...props}>
      <Container className={styles.container}>
        <span className={styles.copyright}>
          © {year} created by YNSTakeru.
        </span>
      </Container>
    </footer>
  );
}
