import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AddPlayerModalState {
  open: boolean;
}

const initialState: AddPlayerModalState = {
  open: false,
}

const addPlayerModalSlice = createSlice({
  name: 'addPlayerModal',
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  },
})

export const { setModalOpen } = addPlayerModalSlice.actions
export default addPlayerModalSlice.reducer
