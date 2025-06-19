import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI x CAR",
  description: "We don't pray for love, we just pray for cars.",
};

export default function RootLayout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
