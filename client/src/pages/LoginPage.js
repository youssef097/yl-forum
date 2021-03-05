import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom"
import Loading from "../components/Loading"
import axios from "axios"
import { isAuth, setToken } from "../auth"

export default function LoginPage(props) {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [result, setResult] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        // if()
        setResult("loading")

        axios.post("http://localhost:3001/api/user/login", { email, pass })
            .then(({ data }) => {
                if (data.token) {
                    setToken(data.token)
                    console.log();
                    setResult("Logged correctly")
                    setRedirect(true)
                }
            }).catch((err) => {
                setRedirect(false)
                if (err && err.response && err.response.data === "USER_DOES_NOT_EXIST") {
                    setResult("User does not exist")
                } else if (err && err.response && err.response.data === "WRONG_PASSWORD") {
                    setResult("Wrong password")
                } else {
                    setResult(JSON.stringify(err))
                }
            })
    }
    if (isAuth()) {
        return <Redirect to="/home" />
    }
    return (redirect ? <Redirect to={{ pathname: "/home", state: { from: "/login" } }} /> :
        <div className="form-container">          
            <form  onSubmit={(e) => handleSubmit(e)}>
                <input className=" " onChange={(e) => setEmail(e.target.value)} value={email} type="text" />
                <br />
                <input className=" " onChange={(e) => setPass(e.target.value)} value={pass} type="password" />
                <br />
                {/* <span>{email}  ---  {pss} </span>     <br /> */}
                <input disabled={!email||!pass} type="submit" value="Login" />
                <div>
                    {result==="loading"?<Loading/>:result}
                </div>
                    Dont have an Account? <Link to="/register">Register</Link>
                
            </form>
        </div>



    )
}
