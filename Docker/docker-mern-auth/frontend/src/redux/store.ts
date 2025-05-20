
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthReducer from './actions/auth.slice'

const combineReducer = combineReducers({
    auth: AuthReducer
})

export const store = configureStore({
    reducer:combineReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch