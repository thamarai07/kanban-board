import React from "react";
import { useDroppable } from "@dnd-kit/core"; 
import TaskCard from "./TaskCard"; 

export const DroppableColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 p-4 rounded-lg shadow-md min-h-[300px] transition-all ${
        isOver ? "bg-purple-100" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} id={task.id} task={task} />
      ))}
    </div>
  );
};