"use client";

import { Button } from "@/primitives/Button";
import { signIn } from "next-auth/react";
import { ComponentProps } from "react";
import styles from "./signin.module.css";

interface Props extends ComponentProps<"div"> {
  providers?: Record<string, string>;
}

export function NextAuthLogin({ providers }: Props) {
  if (!providers) {
    return <h4 className={styles.error}>No NextAuth providers enabled</h4>;
  }

  return (
    <div className={styles.actions}>
      {Object.entries(providers).map(([id, name]) => (
        <Button key={name} onClick={() => signIn(id)}>
          {name}でログイン
        </Button>
      ))}
    </div>
  );
}
