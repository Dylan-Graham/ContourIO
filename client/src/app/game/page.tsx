"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Game() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const conn = new WebSocket(`${serverUrl}/ws`);

    conn.onopen = function () {
      console.log("Connected to WebSocket server");
    };

    conn.onclose = function () {
      console.log("Closed WebSocket connection");
    };

    conn.onmessage = function (evt) {
      var messages = evt.data.split("\n");
      setLogs((prevLogs) => [...prevLogs, ...messages]);
    };

    conn.onerror = function () {
      console.error("Error connecting to server...");
    };

    return () => {
      conn.close();
    };
  }, []);

  return (
    <>
      <div className={styles.gameboard}>THE GAMEBOARD</div>
      <div className={styles.logContainer}>
        {logs.map((log, index) => {
          return (
            <div key={index} className={styles.log}>
              {log}
            </div>
          );
        })}
      </div>
    </>
  );
}
