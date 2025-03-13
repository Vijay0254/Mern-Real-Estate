import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useAuthStore } from '../store/useAuthStore'
import { validateEmail } from '../utils/utils'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const Signup = () => {

    //Inputs to store user data
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    //Store to Manage User Authentication
    const { error, signup, isSigningUp, seterror } = useAuthStore()
    const navigate = useNavigate()

    //SignUp Function to validate and divert to SignUp Api
    function handleSignUp(event){
        event.preventDefault()
        if(!username || !email|| !password){
            if(!username){
                return seterror("Username is required")
            }
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
        if(password.length < 6){
            return seterror("Password must be atleast 6 characters")
        }
        signup(username, email, password, navigate)
    }

    useEffect(() =>{
        seterror("")
    }, [])    

  return (
    <section className='flex flex-col items-center mt-20'>
        <h1 className='text-3xl font-bold '>Sign Up</h1>
        {/* JWT Auth */}
        <form className='flex flex-col w-[300px] sm:w-[400px] gap-y-5 mt-5' onSubmit={(event) =>handleSignUp(event)}>
            <Input type={"text"} placeholder={"Username"} id={"username"} name={"username"} value={username} onChange={(event) =>setusername(event.target.value)} error={error == "Username is required" ? error : ""} />
            <Input type={"text"} placeholder={"Email"} id={"email"} name={"email"} value={email} onChange={(event) =>setemail(event.target.value)} error={(error == "Email is required" || error == "Email is invalid" || error == "Email already Registered") ? error : ""} />
            <Input type={"password"} placeholder={"Password"} id={"password"} name={"password"} value={password} onChange={(event) =>setpassword(event.target.value)} error={(error == "Password is required" || error == "Password must be atleast 6 characters") ? error : ""} />
            <button disabled={isSigningUp} type='submit' className='bg-slate-700 w-full mt-2 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-2 rounded-md'>{isSigningUp ? <><Loader2 className='animate-spin size-4' /><span className='capitalize'>Loading...</span></> : "Sign up"}</button>
        </form>

        {/* Google Auth */}
        <OAuth />
        <p className='mt-2 ml-2 font-medium w-[300px] sm:w-[400px]'>Already have an account? <Link className='text-blue-500 underline' to={'/login'}>Sign in</Link></p>
    </section>
  )
}

export default Signup