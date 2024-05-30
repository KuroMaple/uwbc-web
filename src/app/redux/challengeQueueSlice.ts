import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ChallengeQueueState {
  queue: number[]
}

const initialState: ChallengeQueueState = {
  queue: [],
}

const challengeQueueSlice = createSlice({
  name: 'challengeQueue',
  initialState,
  reducers: {
    pushToQueue: (state, action: PayloadAction<number>) => {
      state.queue.push(action.payload)
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      // Instead of popping, we filter out the id to make this function more versatile
      state.queue = state.queue.filter((id) => id !== action.payload) 
    },
  },
})

export const { pushToQueue, removeFromQueue } = challengeQueueSlice.actions
export default challengeQueueSlice.reducer