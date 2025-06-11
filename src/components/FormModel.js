import React from "react";
import { useAppContext } from "../hooks/Context";

export default function Model() {
  const { state, dispatch } = useAppContext();

  const HandleFormInput = (e) => {
    dispatch({
      type: "HANDLE_FORM",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !state.draftTask.name ||
      !state.draftTask.prioritize ||
      !state.draftTask.status
    ) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch({
      type: "ADD_FORM",
      payload: {
        ...state.draftTask,
        id: crypto.randomUUID(),
      },
    });
    dispatch({ type: "MODEL", payload: false });
  };

  return (
    <div className="w-full h-full bg-black/50 fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Create Task
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task name"
              onChange={HandleFormInput}
              value={state.draftTask.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a short description..."
              rows={3}
              onChange={HandleFormInput}
              value={state.draftTask.description}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioritize
            </label>
            <select
              name="prioritize"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={HandleFormInput}
              value={state.draftTask.prioritize}
            >
              <option value="">Select</option>
              <option value="High">Important</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={HandleFormInput}
              value={state.draftTask.status}
            >
              <option value="">Select</option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm text-gray-700"
              onClick={() => dispatch({ type: "MODEL", payload: false })}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={HandleFormSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}