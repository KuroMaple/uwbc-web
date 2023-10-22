import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface PlayerState {
  value: number;
}

// Define the initial state using that type
const initialState: PlayerState = {
  value: 0,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPos: (state, action) => {
      state.value += action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { setPos, incrementByAmount } = playerSlice.actions

export default playerSlice.reducer
