import { create } from "zustand";
import { Axios } from "../utils/Axios";
import { handleError } from "../utils/handleError";
import toast from "react-hot-toast";

//This store is used to manage user authentication
export const useAuthStore = create((set, get) =>({
    user: null,
    error: null,
    isCheckingUser: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdating: false,

    seterror: (error) =>{
        set({ error: error })
    },

    verifyToken: async(navigate) =>{
        try{
            const response = await Axios.get("/api/auth/verify/token")
            if(response.data.success){
                set({ user: response.data.user })
            }
        }
        catch(err){
            if(err.status == 500){
                navigate("/500")
            }
            console.log(`Error in Verify Token - ${err.message}`)
        }
        finally{
            set({ isCheckingUser: false })
        }
    },

    signup: async(username, email, password, navigate) =>{
        set({ isSigningUp: true })
        const { seterror } = get()
        try{
            const response = await Axios.post("/api/auth/signup", {username, email, password})
            if(response.data.success){
                set({ user: response.data.user })
                set({ error: null })
                navigate("/")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in SignUp- ${err.message}`)
        }
        finally{
            set({ isSigningUp: false })
        }
    },

    login: async(email, password, navigate) =>{
        set({ isLoggingIn: true })
        const { seterror } = get()
        try{
            const response = await Axios.post("/api/auth/login", {email, password})
            if(response.data.success){
                set({ user: response.data.user })
                set({ error: null })
                navigate("/")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Login - ${err.message}`)
        }
        finally{
            set({ isLoggingIn: false })
        }
    },

    google: async(username, email, password, navigate) =>{
        const { seterror } = get()
        try{
            const response = await Axios.post("/api/auth/google", {username, email, password})
            if(response.data.success){
                set({ user: response.data.user })
                navigate("/")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Google- ${err.message}`)
        }
    },

    logout: async(navigate) =>{
        set({ isLoggingOut: true })
        const { seterror } = get()
        try{
            const response = await Axios.get("/api/auth/logout")
            if(response.data.success){
                set({ user: null })
                navigate("/login")
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Logout - ${err.message}`)
        }
        finally{
            set({ isLoggingOut: false })
        }
    },

    editProfile: async(username, currentPassword, newPassword, id, navigate, setcurrentPassword, setnewPassword) =>{
        set({ isUpdating: true })
        const { seterror } = get()
        try{
            const response = await Axios.put(`/api/auth/edit/profile/${id}`, {username, currentPassword, newPassword})
            if(response.data.success){
                toast.success(response.data.message)
                set({ error: null })
                setcurrentPassword('')
                setnewPassword('')
            }
        }
        catch(err){
            handleError(err, seterror, navigate)
            console.log(`Error in Login - ${err.message}`)
        }
        finally{
            set({ isUpdating: false })
        }
    }
}))