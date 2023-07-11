// ========== Counter
// import all modules
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  count: number
}

const initialState: IInitialState = {
  count: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment (state, action: PayloadAction<{ value: number }>) {
      state.count += action.payload.value
    }
  }
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer
