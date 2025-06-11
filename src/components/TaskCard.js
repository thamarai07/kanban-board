import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiFileEditFill } from "react-icons/ri";
import { useAppContext } from "../hooks/Context";

export default function TaskCard({ task, id }) {
  const { dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({ ...task });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    rotate: isDragging ? "3deg" : "0deg",
  };

  const getPriorityColor = (status) => {
    switch (status) {
      case "todo":
        return "border-red-500 bg-red-50";
      case "inprogress":
        return "border-yellow-500 bg-yellow-50";
      case "done":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editTask.name || !editTask.prioritize || !editTask.status) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch({ type: "UPDATE_TASK", payload: editTask });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTask({ ...task });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`
        p-4 mb-3 relative
        bg-white border-l-4 rounded-lg shadow-md
        transform transition-all duration-200 ease-in-out
        hover:shadow-lg hover:-translate-y-1
        ${isDragging ? "ring-2 ring-blue-500 ring-offset-2 opacity-80" : ""}
        ${getPriorityColor(task.status)}
      `}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            name="name"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editTask.name}
            onChange={handleInputChange}
            placeholder="Task name"
          />
          <textarea
            name="description"
            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editTask.description}
            onChange={handleInputChange}
            placeholder="Task description"
            rows={2}
          />
          <select
            name="prioritize"
            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={editTask.prioritize}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            name="status"
            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={editTask.status}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {task.name}
            </h3>
            <RiFileEditFill
              className="hover:bg-gray-400 rounded-lg cursor-pointer"
              size={20}
              onClick={handleEditToggle}
            />
          </div>
          <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            {task.prioritize && (
              <span
                className={`px-2 py-0.5 rounded-full font-medium 
                  ${task.prioritize === "High" ? "bg-red-200 text-red-800" : ""}
                  ${task.prioritize === "Medium" ? "bg-yellow-200 text-yellow-800" : ""}
                  ${task.prioritize === "Low" ? "bg-green-200 text-green-800" : ""}
                `}
              >
                {task.prioritize} Priority
              </span>
            )}
            {task.status && (
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {task.status}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}