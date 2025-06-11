import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, AppReducer } from "./reducer";
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const savedTasks = localStorage.getItem("tasks");
    return {
      ...initialState,
      tasks: savedTasks ? JSON.parse(savedTasks) : initialState.tasks,
    };
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
