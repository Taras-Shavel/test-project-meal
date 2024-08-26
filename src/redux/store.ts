import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { categoryReducer, mealsReducer, searchReducer } from "./slice";

const rootReducer = combineReducers({
    categoryReducer,
    mealsReducer,
    searchReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}