const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialState = {
  model: false,
  draftTask: {
    name: "",
    description: "",
    prioritize: "",
    status: "", 
    id: "",
  },
  tasks: [],
};

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODEL":
      return {
        ...state,
        model: action.payload,
        draftTask: action.payload
          ? state.draftTask
          : { ...initialState.draftTask },
      };

    case "HANDLE_FORM":
      return {
        ...state,
        draftTask: {
          ...state.draftTask,
          [action.field]: action.payload,
        },
      };

    case "ADD_FORM":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...state.draftTask,
            id: generateId(),
          },
        ],
        draftTask: { ...initialState.draftTask },
      };

      case "UPDATE_TASKS":
        return { ...state, tasks: action.payload };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    default:
      return state;
  }
};