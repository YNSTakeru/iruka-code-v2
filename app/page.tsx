import { auth } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
// eslint-disable-next-line import/order
import FreeLogin from "@/components/FreeLogin";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>お手軽にコードを共有しよう</h1>
          <p className={styles.heroLead}>
            Iruka
            Codeを使って、リアルタイムでコードを共有しましょう。先生や生徒の学習をサポートします。
          </p>
        </div>
        <div className={styles.heroActions}>
          <FreeLogin />
        </div>
      </Container>
    </MarketingLayout>
  );
}
