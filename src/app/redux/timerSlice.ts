
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TimerState {
  time: number;
  isPlaying: boolean;
}

const initialState: TimerState = {
  time: 0,
  isPlaying: false,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload
    },
    play: (state) => {
      state.isPlaying = true
    },
    pause: (state) => {
      state.isPlaying = false
    },
    stop: (state) => {
      state.isPlaying = false
      state.time = 0
    },
    addTime: (state, action: PayloadAction<number>) => {
      state.time += action.payload
    },
    
    subtractTime: (state, action: PayloadAction<number>) => {
      if (state.time > action.payload) {
        state.time -= action.payload
      }
      else {
        state.time = 0
      }
    },
  },
})

// Redux selectors
export const selectTime = (state: { timer: TimerState }) => state.timer.time
export const selectIsPlaying = (state: { timer: TimerState }) => state.timer.isPlaying


export const { play, pause, stop, addTime, subtractTime } = timerSlice.actions

export default timerSlice.reducer
