import "./globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// 💡 Dynamically import chatbot with SSR disabled
const ChatBot = dynamic(() => import("@/components/chatbot"), { ssr: false });

export const metadata = {
  title: "AI x CAR",
  description: "We don't pray for love, we just pray for cars.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
