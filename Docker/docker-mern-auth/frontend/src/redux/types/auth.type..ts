export interface User{
    _id: string,
    username: string,
    email:string
}

export interface authState {
    user: User | null,
    isLoginLoading: boolean,
    isSignUploading: boolean,
    isAuthChecking:boolean
}