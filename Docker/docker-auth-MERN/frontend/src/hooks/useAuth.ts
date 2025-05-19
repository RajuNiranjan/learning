import { useDispatch,  } from 'react-redux'
import {signupFailure,signupStart,signupSuccess,LoginFailure,LoginStart,LoginSuccess,checkAuthFailure,checkAuthStart,checkAuthSuccess, logoutStatus} from '../redux/actions/auth.slice'
import type { AppDispatch, } from '../redux/store'
import {axiosInstance} from '../utils/axios'


export const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>()

    const signup = async (data: { username: string; email: string; password:string}) => {
        try {
            dispatch(signupStart())
            const res = await axiosInstance.post('/api/v1/auth/signup', {
                username: data.username,
                email: data.email,
                password:data.password
            })

            dispatch(signupSuccess(res.data))
            
        } catch (error) {
            console.log(error);
            dispatch(signupFailure())
        } 
    }

    const login = async (data: { emailOrUserName: string; password: string }) => {
        try {
            dispatch(LoginStart())
            const res = await axiosInstance.post('/api/v1/auth/login', data)
            dispatch(LoginSuccess(res.data))
        } catch (error) {
            console.log(error);
            dispatch(LoginFailure())
            
        }
    }

    const checkAuth = async () => {
        try {
            dispatch(checkAuthStart())
            const res = await axiosInstance.get("/api/v1/auth/user")
            dispatch(checkAuthSuccess(res.data))
        } catch (error) {
            console.log(error);
            dispatch(checkAuthFailure())
            
        }
    }

    const logout = async () => {
        try {
            await axiosInstance.post('/api/v1/auth/logout')
            dispatch(logoutStatus())
        } catch (error) {
            console.log(error);
            
        }
    }


    return {signup, login, checkAuth, logout}
}