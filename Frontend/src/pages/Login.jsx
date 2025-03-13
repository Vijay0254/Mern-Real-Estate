import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useAuthStore } from '../store/useAuthStore'
import { validateEmail } from '../utils/utils'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const Login = () => {

    //Inputs to store user data
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    //Store to Manage User Authentication
    const { error, login, isLoggingIn, seterror } = useAuthStore()
    const navigate = useNavigate()

    //Login Function to validate and divert to Login Api
    function handleLogin(event){
        event.preventDefault()
        if(!email|| !password){
            if(!email){
                return seterror("Email is required")
            }
            if(!password){
                return seterror("Password is required")
            }
        }
        if(!validateEmail(email)){
            return seterror("Email is invalid")
        }
        login(email, password, navigate)
    }

    useEffect(() =>{
        seterror("")
    }, [])

  return (
    <section className='flex flex-col items-center mt-20'>
        <h1 className='text-3xl font-bold '>Sign In</h1>
        {/* JWT Auth */}
        <form className='flex flex-col w-[300px] sm:w-[400px] gap-y-5 mt-5' onSubmit={(event) =>handleLogin(event)}>
            <Input type={"text"} placeholder={"Email"} id={"email"} name={"email"} value={email} onChange={(event) =>setemail(event.target.value)} error={(error == "Email is required" || error == "Email is invalid" || error == "Email is not Registered") ? error : ""} />
            <Input type={"password"} placeholder={"Password"} id={"password"} name={"password"} value={password} onChange={(event) =>setpassword(event.target.value)} error={(error == "Password is required" || error == "Password is Wrong") ? error : ""} />
            <button disabled={isLoggingIn} type='submit' className='bg-slate-700 w-full mt-2 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-2 rounded-md'>{isLoggingIn ? <><Loader2 className='animate-spin size-4' /><span className='capitalize'>Loading...</span></> : "Sign In"}</button>
        </form>

        {/* Google Auth */}
        <OAuth />
        <p className='mt-2 ml-2 font-medium w-[300px] sm:w-[400px]'>Doesn't have an account? <Link className='text-blue-500 underline' to={'/signup'}>Sign Up</Link></p>
    </section>
  )
}

export default Login