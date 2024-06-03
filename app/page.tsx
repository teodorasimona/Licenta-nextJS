import { useState, useEffect } from "react";
// import Layout from "../layout";
import DespreNoi from "@/components/despre-noi";
// import Footer from "@/components/footer";
import { Cards1, Cards2 } from "@/components/cards";
import ActivitiesFunction from "@/components/activities";

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
            Gaseste noi trasee montane omg
          </h1>
          <p className="text-xl font-normal">
            Visezi la trasee montane de neuitat si aventuri noi? Te ajutam noi!
          </p>
        </div>

        <form className="w-96 max-w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-red-500 focus:border-red-500"
              placeholder="Cauta trasee "
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
            >
              Vezi trasee
            </button>
          </div>
        </form>
      </div>
      <Cards1 />
      <ActivitiesFunction />
      <DespreNoi />
      <Cards2 />
      {/* <Footer /> */}
    </div>
  );
}
