import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { polygon } from 'wagmi/chains'

export interface AuthState {
  isLoading: boolean
  isFullAuth: boolean
  validChainId: number
}

const initialState: AuthState = {
  isLoading: true,
  isFullAuth: false,
  validChainId: polygon.id,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsFullAuth: (state, action: PayloadAction<boolean>) => {
      state.isFullAuth = action.payload
    },
  },
})

export const { setIsLoading, setIsFullAuth } = authSlice.actions

export const selectIsLoadingAuth = (state: { auth: AuthState }) =>
  state.auth.isLoading

export const selectIsFullAuth = (state: { auth: AuthState }) =>
  state.auth.isFullAuth

export const selectValidChainId = (state: { auth: AuthState }) =>
  state.auth.validChainId

export default authSlice.reducer
