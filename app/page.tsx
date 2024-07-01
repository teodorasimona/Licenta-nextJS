"use client";
import { useState, useEffect } from "react";
// import Layout from "../layout";
import DespreNoi from "@/components/despre-noi";

import { Cards1, Cards2 } from "@/components/cards";
import ActivitiesFunction from "@/components/activities";
import Footer from "@/components/footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative">
      <div
        className="h-screen py-24 flex flex-col gap-8 items-center"
        style={{
          backgroundImage: "url('/images/carusel-image 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="py-4 text-white text-center">
          <h1 className="mb-4 text-6xl font-semibold tracking-wide leading-none ">
            Gaseste noi trasee montane
          </h1>
          <p className="text-xl font-normal">
            Visezi la trasee montane de neuitat si aventuri noi? Te ajutam noi!
          </p>
        </div>

        <Link href="/explore">
          <div className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-md px-8 py-3 inline-block mt-2">
            Vezi trasee
          </div>
        </Link>
      </div>
      <Cards1 />
      <ActivitiesFunction />
      <DespreNoi />
      <Cards2 />
      <Footer />
    </div>
  );
}
