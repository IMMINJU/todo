// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-amber-50">
      <body className="text-amber-900">
        <header className="bg-amber-500 py-4">
          <nav className="container mx-auto">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="/" className="text-white hover:text-amber-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-amber-200">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-8">{children}</main>
        <footer className="bg-amber-500 py-4 mt-8">
          <div className="container mx-auto text-center text-white">
            <p>&copy; 2023 Todo App. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
