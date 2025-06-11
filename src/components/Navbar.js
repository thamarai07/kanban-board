import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/Context";
import { useState } from "react";
export default function Navbar() {
  return (
    <nav>
      <div>
        <ul className="flex justify-between items-center py-3 shadow-xl px-5 max-w-[992px] m-auto">
          <li className="flex gap-10">
            <Link to={"/"} className="text-[20px] font-semibold">
              Home
            </Link>
            <Link to={"/view_task"} className="text-[20px] font-semibold">
              View Task
            </Link>
          </li>
          <li className="flex gap-10 w-[40%]">
            <input className="w-[100%] py-2 rounded px-2 border-2" />
            <button className="bg-blue-500 text-white px-4 rounded">
              Search
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
