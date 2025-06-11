import React, { useEffect } from "react";
import { useAppContext } from "../hooks/Context";
import Model from "../components/FormModel";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DroppableColumn } from "../components/Column";

const stages = ["todo", "inprogress", "done"];
const stageTitles = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function Task() {
  const { state, dispatch } = useAppContext();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch({ type: "UPDATE_TASKS", payload: JSON.parse(savedTasks) });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const newStatus = over.id;

    const updatedTasks = state.tasks.map((task) =>
      task.id === activeId ? { ...task, status: newStatus } : task
    );
    dispatch({ type: "UPDATE_TASKS", payload: updatedTasks });
  };

  return (
    <div>
      <div className="flex justify-end flex-col mt-10 max-w-[992px] m-auto">
        <button
          className="bg-purple-500 text-white px-3 p-2 rounded font-semibold w-[20%]"
          onClick={() => {
            dispatch({ type: "MODEL", payload: true });
          }}
        >
          Add Task
        </button>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {state.model && <Model />}
          <div className="grid grid-cols-3 gap-5 mt-10">
            {stages.map((stage) => (
              <DroppableColumn
                key={stage}
                id={stage}
                title={stageTitles[stage]}
                tasks={state.tasks.filter((task) => task.status === stage)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}