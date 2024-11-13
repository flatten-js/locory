import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


type UserState = {
  name: string
}

const initialState: UserState = {
  name: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<UserState['name']>) {
      state.name = action.payload
    }
  }
})

export const { setName } = userSlice.actions