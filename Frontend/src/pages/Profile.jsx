import React, { useState } from 'react'
import Input from '../components/Input'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2, LogOut } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProfilePic from '../components/ProfilePic'
import Listings from '../components/Listings'

const Profile = () => {

    //Store to Manage User Authentication
    const { error, isUpdating, editProfile, seterror, user, logout, isLoggingOut } = useAuthStore()

    //Inputs to store user data
    const [username, setusername] = useState(user?.username)
    const [currentPassword, setcurrentPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')

    //Input to show Listings
    const [toggle, settoggle] = useState(false)

    const navigate = useNavigate()

    //User Id
    const { id } = useParams()

    //Edit Profile Function to validate and divert to Edit Profile Api
    function handleEditProfile(event){
        event.preventDefault()
        
        if(!username){
            return seterror("Username is required")
        }
        if((currentPassword && !newPassword) || (!currentPassword && newPassword)){
            if(!currentPassword){
                return seterror("Password is required to change password")
            }
            if(!newPassword){
                return seterror("New Password is required to change password")
            }
        }
        if(currentPassword && newPassword){
            if(newPassword.length < 6){
                return seterror("Password must be atleast 6 characters")
            }
        }
        editProfile(username, currentPassword, newPassword, id, navigate, setcurrentPassword, setnewPassword)
    }

  return (
    <section className='flex flex-col items-center my-10 sm:my-20'>
        <h1 className='text-3xl font-bold '>Profile</h1>

        {/* Profile */}
        <form className='flex flex-col w-[300px] sm:w-[400px] gap-y-5 mt-5' onSubmit={(event) =>handleEditProfile(event)}>
            <div className='flex justify-center items-center'>
                <ProfilePic user={user} width="20" />
            </div>
            <Input type={"text"} placeholder={"Username"} id={"username"} name={"username"} value={username} onChange={(event) =>setusername(event.target.value)} error={error == "Username is required" ? error : ""} />
            <Input type={"text"} placeholder={"Email"} id={"email"} name={"email"} value={user?.email} error={"Disabled"} />
            <Input type={"password"} placeholder={"Current Password"} id={"currentPassword"} name={"currentPassword"} value={currentPassword} onChange={(event) =>setcurrentPassword(event.target.value)} error={(error == "Password is required to change password" || error == "Password is wrong") ? error : ""} />
            <Input type={"password"} placeholder={"New Password"} id={"newPassword"} name={"newPassword"} value={newPassword} onChange={(event) =>setnewPassword(event.target.value)} error={(error == "New Password is required to change password" || error == "Password must be atleast 6 characters") ? error : ""} />
            <button disabled={isUpdating} type='submit' className='bg-slate-700 w-full mt-7 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-2 rounded-md'>{isUpdating ? <><Loader2 className='animate-spin size-4' /><span className='capitalize'>Loading...</span></> : "Update"}</button>
        </form>

        {/* Create Listing Button */}
        <Link to={`/create/listing/${id}`} className='bg-green-700 w-[300px] sm:w-[400px] mt-5 disabled:bg-green-700/70 hover:bg-green-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-2 rounded-md'>Create Listing</Link>
        
        {/* Logout */}
        <div className='w-[300px] sm:w-[400px] flex justify-end'>
            <button onClick={logout} disabled={isLoggingOut} className='mt-5 mr-5 cursor-pointer flex gap-x-1 font-medium '>{isLoggingOut ? <Loader2 className='animate-spin size-5' /> : <><LogOut />Sign out</>}</button>
        </div>

        <button onClick={() =>settoggle(!toggle)} className='cursor-pointer text-green-600 mt-5 font-bold'>Show Listings</button>
        {toggle && <Listings id={id} navigate={navigate} />}
    </section>
  )
}

export default Profile