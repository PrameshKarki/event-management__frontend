"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, []);
  // TODO: Check user authentication status
  // Navigate to the dashboard if the user is logged in
  const isLoggedIn = true;
  return null;
}
