"use client";

import Axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./signin.module.css";

const axios = Axios.create({
  baseURL: "process.env.NEXT_PUBLIC_API_URL",
  withCredentials: true,
});

export function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function valiDateSignIn() {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        signIn("credentials", { email });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await valiDateSignIn();
  };

  return (
    <div className={styles.actions}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
