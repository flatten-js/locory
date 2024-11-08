import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { userSlice } from "./user"

const options = { 
  reducer: { 
    user: userSlice.reducer 
  } 
}

export const store = (name: string) => configureStore({ ...options, preloadedState: { user: { name } } });
const _store = configureStore(options)

type RootState = ReturnType<typeof _store.getState>
type AppDispatch = typeof _store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
