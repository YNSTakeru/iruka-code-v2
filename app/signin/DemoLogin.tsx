"use client";

import Axios from "axios";
import { useState } from "react";
import styles from "./signin.module.css";

export function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function valiDateSignIn() {
    try {
      const response = await Axios.post(
        `/api/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // signIn("credentials", { email });
        console.log("Success");
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
