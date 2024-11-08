import { 
  configureStore, 
  type StateFromReducersMapObject 
} from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { userSlice } from "./user"

const reducer = {
  user: userSlice.reducer
}

type RootState = StateFromReducersMapObject<typeof reducer>

export const store = (preloadedState: RootState) => {
  return configureStore({ 
    reducer,
    preloadedState
  });
}

type Store = ReturnType<typeof store>
type AppDispatch = Store['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
