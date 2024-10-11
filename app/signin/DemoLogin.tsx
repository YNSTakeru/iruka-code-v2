"use client";

import { useState } from "react";
import styles from "./signin.module.css";

export function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function valiDateSignIn() {
    // try {
    //   const response = await Axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
    //     {
    //       email,
    //       password,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.status === 200) {
    //     signIn("credentials", { email });
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    console.log(res);
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
