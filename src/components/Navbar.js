import React from "react";
import { Link } from "react-router-dom";
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
        </ul>
      </div>
    </nav>
  );
}
