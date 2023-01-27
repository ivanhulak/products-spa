import React, { createContext } from "react";

type ContextType = {
    state: {
        filter: number | null;
    };
    dispatch: React.Dispatch<{ type: string; value: unknown }>;
}
export const ContextApp = createContext<ContextType | null>(null);

export const initialState = {
    filter: null as null | number
};

type InitialStateType = typeof initialState

export const productsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, filter: action.filter }
        default:
            return state
    }
};