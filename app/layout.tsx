import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/app/layout";
import HomePage from "@/app/home";
import ContactPage from "@/app/contact";
import LoginPage from "@/app/login";
import ExplorePage from "@/app/explore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hiking Website",
  description: "Web site created with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {" "}
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <BrowserRouter>
            <div className="bg-lime-950">
              <Routes>
                <Route path="/" element={<Layout children={undefined} />}>
                  <Route index element={<HomePage />} />
                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="login" element={<LoginPage />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </body>
      </html>
    </ClerkProvider>
  );
}
