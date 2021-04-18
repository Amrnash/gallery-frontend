import React, { createContext, useReducer } from "react";
const store = createContext({});
const { Provider } = store;
const initialState = {
  isAuth: false,
  user: {},
  error: "",
};
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "AUTH_REQUEST":
        return { ...state, loading: true };
      case "AUTH_FAIL":
        return {
          ...state,
          loading: false,
          isAuth: false,
          error: action.payload,
        };
      case "AUTH_SUCCESS":
        return { ...state, loading: false, isAuth: true, user: action.payload };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { StateProvider, store };
