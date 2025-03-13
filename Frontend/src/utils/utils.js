//Validating Email Format
export const validateEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

//Generating Profile Letter
//Example: ProfileLetterGenerator("John Doe") => JD
export const ProfileLetterGenerator = (name) =>{
    let splitedName = name?.split(" ")
    let result = splitedName[0][0]?.toUpperCase()

    if(splitedName.length > 1){
        result = splitedName[0][0]?.toUpperCase() + splitedName[1][0]?.toUpperCase()
    }

    return result
}