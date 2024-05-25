export const errorMessage = (message)=>{
    return {
        "message" : message
    }
}

export const successMessage = (message , payload)=>{
    return {
        "message" : message,
        "payload" : payload
    }
}

export const serverError = ()=>{
    return {
        "message" : "Internal Server Error"
    }
}