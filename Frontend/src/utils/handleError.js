//Handling Status Code Error
export const handleError = (err, seterror, navigate) => {
    console.log(err, "D")
    if(err.status == 500){
        return navigate("/500")
    }
    if(err.status == 401 || err.status == 409 || err.status == 400){
        return seterror(err.response.data.error)
    }
    if(err.status == 404){
        return navigate("/404")
    }
}