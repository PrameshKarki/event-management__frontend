import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // TODO: Check user authentication status
  // Navigate to the dashboard if the user is logged in
  const isLoggedIn = true;
  return <>Home</>;
}
