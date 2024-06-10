import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AppUtilSlice {
  modalOpen: boolean
  snackBar: SnackbarActionType
  alert: AlertActionType
}

type SnackbarActionType = {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
  open: boolean
}

type AlertActionType = {
  open: boolean
  title: string
  message: string
  actions: { // Action 0 is the cancel action, action 1 is the confirm action, action 2 is the third action, etc.
    label: string
    onClick: () => void
  }[]
}

const initialState: AppUtilSlice = {
  modalOpen: false,
  snackBar: {
    open: false,
    message: '',
    severity: 'info',
  },
  alert: {
    open: false,
    title: '',
    message: '',
    actions: [],
  },
}

const appUtilSlice = createSlice({
  name: 'appUtil',
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
    setSnackOpen: (state, action: PayloadAction<SnackbarActionType>) => {
      state.snackBar.open = action.payload.open
      state.snackBar.message = action.payload.message
      state.snackBar.severity = action.payload.severity
    },
    setAlertProperties: (state, action: PayloadAction<AlertActionType>) => {
      state.alert.open = action.payload.open
      state.alert.title = action.payload.title
      state.alert.message = action.payload.message
      state.alert.actions = action.payload.actions
    },
    setIsAlertOpen: (state, action: PayloadAction<boolean>) => {
      state.alert.open = action.payload
    },
  },
})

export const { setModalOpen, setSnackOpen, setAlertProperties, setIsAlertOpen } = appUtilSlice.actions
export default appUtilSlice.reducer
