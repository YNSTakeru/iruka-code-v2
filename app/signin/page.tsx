import { auth, getProviders } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
// eslint-disable-next-line import/order
import { redirect } from "next/navigation";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

export default async function SignInPage() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  const providers = await getProviders();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>あなたのアカウントでログイン</h2>
        {providers && providers.credentials ? (
          <DemoLogin />
        ) : (
          <NextAuthLogin providers={providers} />
        )}
      </main>
      <aside className={styles.aside} />
    </div>
  );
}
