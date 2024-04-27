import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>Welcome to ContourIO</h1>
      </div>

      <div className={styles.gameplay}>Animated GIF of the game...</div>

      <Link href="/game" className={styles.animatedText}>
        Click to join
      </Link>
    </main>
  );
}
