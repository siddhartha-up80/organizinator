"use client";

import * as React from "react";
import Link from "next/link";
import { Flower2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PersonForm from "./personform";

export default function Navbarcenter() {
  const [state, setState] = React.useState(false);

  const menus = [
    { title: "Add Person", path: "/" },
    { title: "Persons", path: "/persons" },
  ];

  return (
    <div className="pb-16">
      <header className="p-2 shadow text-gray-800 w-full h-max bg-white dark:bg-black dark:text-white fixed top-0">
        <div className="flex justify-between">
          {!state ? (
            <Link
              href="/"
              aria-label="Back to homepage"
              className=" flex md:justify-between justify-between items-center"
            >
              <Flower2 />
            </Link>
          ) : null}
          <div className="flex mr-3 font-semibold">
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0 mt-2 ml-5">
                {menus.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 hover:text-rose-600 text-base"
                  >
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="items-center flex-shrink-0 hidden lg:flex ml-6">
            
          </div> */}
          <button
            className="p-2 lg:hidden flex md:justify-center justify-start"
            title="menu"
            onClick={() => setState(!state)}
          >
            <Menu />
          </button>
        </div>
      </header>
    </div>
  );
}
