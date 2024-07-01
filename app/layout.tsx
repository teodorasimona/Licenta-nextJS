import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

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
        <body className="bg-lime-950">
          <nav className="bg-black absolute top-0 left-0 right-0 z-10 bg-transparent mx-2">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="/" className="flex items-center space-x-3">
                <img src="/images/logo.svg" className="h-6" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap "></span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div className="w-full md:block md:w-auto hidden">
                <ul className="bg-transparent font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                  <li>
                    <a
                      href="/"
                      className="block py-2 px-3 text-red-500 rounded md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/explore"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-red-700 md:p-0"
                    >
                      Exploreaza
                    </a>
                  </li>

                  <li>
                    <a
                      href="/contact"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-red-700 md:p-0"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex gap-5 items-center font-semibold">
                <SignedOut>
                  <SignInButton mode="modal">
                    <div className="text-md py-1.5 px-3 rounded-md bg-stone-200 hover:text-red-700 text-neutral-600">
                      Intra in cont
                    </div>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <div className="text-md py-1.5 px-3 text-white bg-red-500 hover:text-red-700 rounded-md">
                      Creare cont
                    </div>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
