import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const OAuth = () => {

    const navigate = useNavigate()

    //Store to Manage User Authentication
    const { google } = useAuthStore()

    //Fireabse Google Auth
    async function handleGoogleClick(){
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)  //photoURL, email, displayName

            const generatedPassword = Math.random().toString(36).slice(-8)
            google(result.user.displayName, result.user.email, generatedPassword, navigate)
        }
        catch(err){
            console.log(`Error in Handle Google Click - ${err.message}`)
        }
    }

  return (
    <button onClick={handleGoogleClick} className='bg-red-700 w-[300px] hover:bg-red-700/60 duration-300 sm:w-[400px] mt-5 font-medium cursor-pointer text-white uppercase py-2 rounded-md'>Continue with Google</button>
  )
}

export default OAuth