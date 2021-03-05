import axios from 'axios'
import { Link, Redirect } from "react-router-dom"
import React, { useState } from 'react'
import { isAuth } from '../auth';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", pass: "", pass2: "" });
    const [response, setResponse] = useState("");
    const [redirect, setRedirect] = useState(false)
    function handleSubmit(e) {
        e.preventDefault();
        setResponse("Loading...")
        axios.post("/api/user/register", { name: formData.name, email: formData.email, password: formData.pass })
            .then(({ data }) => {
                console.log(data);
                if (data["SUCCESS"]) {
                    setResponse("User registered correctly")
                    setRedirect(true)
                }
            }).catch(({ response }) => {
                let errorMessage = response.data.ERROR;
                console.log(errorMessage);
                if (errorMessage === "ER_DUP_ENTRY") {
                    setResponse("User already exists")
                }else if(errorMessage === "INCOMPLETE_USER_DATA") {
                    setResponse("Some fields are required")
                }
            })
    }

    if(isAuth()){
        return <Redirect  to ="/home" />
    }
    return (        
        redirect? <Redirect to="/login" />:<div className="form-container"   >
            <form onSubmit={handleSubmit}>
            <h2>REgister</h2>
                Name: <input type="text" onChange={(e) => { setFormData(({ ...formData, name: e.target.value })) }} value={formData.name} /> <br />
                Email: <input type="text" onChange={(e) => { setFormData(({ ...formData, email: e.target.value })) }} value={formData.email} /> <br />
                Password: <input type="password" onChange={(e) => { setFormData(({ ...formData, pass: e.target.value })) }} value={formData.pass} /> <br />
                Repeat password: <input type="password" onChange={(e) => { setFormData(({ ...formData, pass2: e.target.value })) }} value={formData.pass2} /> <br />
                <input type="submit" value="Register" />
            <h2>{response}</h2>
            <pre>
                {JSON.stringify(formData)}
            </pre>
            Already have an Account? <Link to="/login">Log In</Link>
            </form>
        </div>
    )
}
