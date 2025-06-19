import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI x CAR",
  description: "We don't pray for love, we just pray for cars.",
};

export default function RootLayout({ children })<ChatBot />;
{
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-[#27251F] text-white py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 AI x CAR | Viva La Vida</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
