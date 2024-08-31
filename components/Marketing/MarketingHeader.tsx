import { signIn } from "@/auth";
import { SignInIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";

export function MarketingHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <Container className={styles.container}>
        <Link href="/">
          <Logo />
        </Link>
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button icon={<SignInIcon />}>ログイン</Button>
        </form>
      </Container>
    </header>
  );
}
