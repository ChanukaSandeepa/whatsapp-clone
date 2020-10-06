import React, { createContext, useContext, useReducer } from 'react';
import contextReducer, { initialState } from './contextReducer';
const Con = createContext()

const Context = (props) => {

    return (
        <Con.Provider value={useReducer(contextReducer, initialState)}>
            {props.children}
        </Con.Provider>
    )
}

export default Context;
export const ContextValue = Con
export const useStateValue = () => useContext(Con)