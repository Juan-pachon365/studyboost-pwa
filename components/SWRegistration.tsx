"use client";

import { useEffect } from "react";

export default function SWRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW registrado"))
        .catch((err) => console.log(err));
    }
  }, []);

  return null;
}