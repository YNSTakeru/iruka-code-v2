"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./signin.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function valiDateSignIn() {
    const url = `${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError(
        "ログインに失敗しました。\n正しいメールアドレスまたは、パスワードを入力してください。"
      );
    }

    if (response.status === 400) {
      const data = await response.text();
      console.log(data);
    }

    if (response.status === 500) {
      const data = await response.text();

      if (data === "Login information invalid") {
        return;
      }
      const obj = JSON.parse(data);

      const dataList = Object.keys(obj).map((key) => obj[key]);

      dataList.forEach((error: string) => {
        console.log(error);
      });
    }

    if (response.ok) {
      signIn("credentials", { email });
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await valiDateSignIn();
  };

  return (
    <div className={styles.actions}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label} htmlFor="email">
            メールアドレス:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            パスワード:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          ログイン
        </button>
      </form>
    </div>
  );
}
