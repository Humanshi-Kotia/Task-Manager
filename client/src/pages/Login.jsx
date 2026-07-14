import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login(){
    const navigate= useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(email ===""){
            alert("enter email");
            return;
        }

        if(password ===""){
            alert("enter password");
            return;
        }

        try{

        const response = await API.post("/login",{
            email,
            password
        });

        localStorage.setItem("token",response.data.token);

        navigate("/dashboard");

        }

        catch(error){

            alert(error.response?.data?.message || "Login Failed");

        }
    }

    return(
        <div className="login_container">
            <div className="loginbox">
                <h5>TASK MANAGER</h5>
                <h2>Welcome back!</h2>
                <form onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input type="email" value={email} placeholder="you@example.com" onChange={(e)=>setEmail(e.target.value)}></input>
                    <p>Password</p>
                    <input type="password" value={password} placeholder="******" onChange={(e)=>setPassword(e.target.value)}></input>
                    <button type="Submit" className="login_btn">Login</button>
                </form>
                {/* <p onClick={()=>navigate("/register")}>Create new account</p> */}
                <Link to="/register" className="create_account_link">Create new account</Link>
            </div>
        </div>
    )
}

export default Login;