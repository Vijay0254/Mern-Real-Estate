import React, { useEffect, useState } from 'react'
import { ProfileLetterGenerator } from '../utils/utils'

const ProfilePic = ({ user, width }) => {

    //Input to store Profile Pic Letters
    const [profileLetter, setprofileLetter] = useState('')
    
    useEffect(() =>{
        setprofileLetter(ProfileLetterGenerator(user?.username))
    }, [user?.username])

  return (
    <div className={`bg-black font-bold ${width > 10 ? "text-4xl size-20" : "size-10"} rounded-full p-2 flex justify-center items-center text-white`}>{profileLetter}</div>
  )
}

export default ProfilePic