
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { localState } from "./reducer";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => {
    const [info, dispatch] = useReducer(reducer, localState || initialState);
    useEffect(() => {
        localStorage.setItem("info", JSON.stringify(info))
    }, [info])
    return (<StateContext.Provider value={[info, dispatch]}>
        {children}
    </StateContext.Provider>);
}

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);