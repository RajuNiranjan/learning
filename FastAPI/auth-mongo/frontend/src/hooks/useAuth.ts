import { useDispatch,  } from 'react-redux'
import {signupFailure,signupStart,signupSuccess} from '../redux/actions/auth.slice'
import type { AppDispatch, } from '../redux/store'
import {axiosInstance} from '../utils/axios'


export const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>()

    const signup = async (data: { username: string; email: string; password:string}) => {
        try {
            dispatch(signupStart())
            const res = await axiosInstance.post('/api/auth/signup', {
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


    return {signup}
}