"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./index.module.css";

const FreeLogin = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn("credentials", { email: "testuser@example.com" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        {loading ? "通信中です..." : "ゲストユーザーとして無料で試す"}
      </button>
    </form>
  );
};

export default FreeLogin;
