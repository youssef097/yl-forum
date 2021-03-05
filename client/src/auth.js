import axios from "axios"

export function initAxiosInterceptors(){
    axios.interceptors.request.use((config)=>{        
        if(getToken()){            
            config.headers.authorization = "bearer " + getToken()        
        }
        return config
    })
}
export function deleteToken(){
    return localStorage.removeItem("token")
}
export function getToken(){
    return localStorage.getItem("token")
}
export function setToken(token){
    return localStorage.setItem("token",token)
}
export function isAuth(){
    if(getToken()){
        return true;
    }
}