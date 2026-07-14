import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

function Register(){
    const navigate= useNavigate();

    const [formData, setFormData] = useState({
        "name":"",
        "email":"",
        "password":"",
        "confirmpassword":""
    });

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        for (const [key,value] of Object.entries(formData)){
            if (value === ""){
                alert(`enter ${key}`)
                return;
            }
        }

        if (formData.password !== formData.confirmpassword){
            alert("Check password")
            return;
        }

        try{
            await API.post("/register",{
                name: formData.name,
                email: formData.email,
                password: formData.password
            })

            alert("registration successful!")
            navigate("/");
        }catch(err){
            alert(err.response?.data?.message || "Registration Failed");

        }
    }

    return(
        <div className="register_container">
            <div className="registerbox">
                <h5>TASK MANAGER</h5>
                <h2>Register here!</h2>
                <form onSubmit={handleSubmit}>
                    <p>Full Name</p>
                    <input type="text" name="name" value={formData.name} placeholder="your name" onChange={handleChange}></input>
                    <p>Email</p>
                    <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange}></input>
                    <p>Password</p>
                    <input type="password" name="password" value={formData.password} placeholder="******" onChange={handleChange}></input>
                    <p>Confirm Password</p>
                    <input type="password" name="confirmpassword" value={formData.confirmpassword} placeholder="******" onChange={handleChange}></input>
                    <button type="Submit" className="register_btn">Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default Register;