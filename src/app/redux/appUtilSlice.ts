import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AppUtilSlice {
  modalOpen: boolean
  modalMapId: string
  snackBar: SnackbarActionType
}

type SnackbarActionType = {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
  open: boolean
}


const initialState: AppUtilSlice = {
  modalOpen: false,
  modalMapId: '',
  snackBar: {
    open: false,
    message: '',
    severity: 'info',
  },
}

const appUtilSlice = createSlice({
  name: 'appUtil',
  initialState,
  reducers: {
    setModalMapId: (state, action: PayloadAction<string>) => {
      state.modalMapId = action.payload
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
    setSnackOpen: (state, action: PayloadAction<SnackbarActionType>) => {
      state.snackBar.open = action.payload.open
      state.snackBar.message = action.payload.message
      state.snackBar.severity = action.payload.severity
    },
  },
})

export const { setModalMapId, setModalOpen, setSnackOpen,  } = appUtilSlice.actions
export default appUtilSlice.reducer
