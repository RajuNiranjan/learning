import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { authState,User } from '../types/auth.type.'

const initialState: authState = {
    user: null,
    isAuthChecking: false,
    isLoginLoading: false,
    isSignUploading:false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signupStart: (state) => {
            state.isSignUploading=true
        },
        signupSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isSignUploading=false
        },
        signupFailure: (state) => {
            state.isSignUploading=false
        }
    }
})

export const {signupFailure,signupStart,signupSuccess } = authSlice.actions
export default authSlice.reducer