import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { authState, User } from '../types/auth.type.'
import { axiosInstance } from '../../utils/axios';

const initialState: authState = {
    user: null,
    isAuthChecking: false,
    isLoginLoading: false,
    isSignUploading:false
}

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const res = await axiosInstance.get(`/api/auth/user`)
    return res.data
});

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
        },
        LoginStart: (state) => {
            state.isLoginLoading=true
        },
        LoginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isLoginLoading = false
        },
        LoginFailure: (state) => {
            state.isLoginLoading = false
        },
        checkAuthStart: (state) => {
            state.isAuthChecking=true
        },
        checkAuthSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthChecking = false
        },
        checkAuthFailure: (state) => {
            state.isLoginLoading = false
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isAuthChecking=true
        }).addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthChecking = false
        }).addCase(fetchUser.rejected, (state) => {
            state.isAuthChecking=false
        })
    }
})

export const {signupFailure,signupStart,signupSuccess,LoginFailure,LoginStart,LoginSuccess,checkAuthFailure,checkAuthStart,checkAuthSuccess } = authSlice.actions
export default authSlice.reducer