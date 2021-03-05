import React,{useEffect} from 'react'
import {Route,Redirect} from "react-router-dom"
import {isAuth} from "../auth"
export default function ProtectedRoute({component:Component,user, ...rest}) {

    return (
        <Route {...rest}  render={(props)=>{
            
            if(isAuth()){
                return <Component {...rest} {...props} user={user}/>;                
            }else{
                return <Redirect to={{pathname:"/login", state:{from:props.location}}}/>
            }
        }}/>

        
    )
}
