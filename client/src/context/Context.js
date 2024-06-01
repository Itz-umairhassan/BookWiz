import { createContext,useReducer } from "react"

const INITIAL_STATE={
    user:null,
    isfetching:false,
    error:false,
}

export const Context=createContext(INITIAL_STATE);

