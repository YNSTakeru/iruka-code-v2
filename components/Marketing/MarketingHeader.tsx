import { signIn } from "@/auth";
import { SignInIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
// eslint-disable-next-line import/order
import clsx from "clsx";
// eslint-disable-next-line import/order
import Link from "next/link";
// eslint-disable-next-line import/order
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
