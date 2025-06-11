import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Task from "../Pages/Task";
export default function MainRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view_task" element={<Task />} />
      </Routes>
    </>
  );
}
