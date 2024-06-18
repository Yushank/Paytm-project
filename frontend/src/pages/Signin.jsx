import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Navigate, useNavigate } from "react-router-dom"


export const Signin = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    return <div>
        <Heading label={"Signin"}></Heading>
        <InputBox label={"username"} onChange={(e)=>{setUsername(e.target.value)}} placeholder={"john@gmail.com"}></InputBox>
        <InputBox label={"password"} onChange={(e)=>{setPassword(e.target.value)}} placeholder={"123456"}></InputBox>
        <Button label={"sign in"} onClick={async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            localStorage.setItem("token", response.data.token) //storing the generated token after signing in
            navigate("/dashboard")
        }}></Button>
        <BottomWarning label={"Don't have an account"} buttonText={"sign up"} to={"/signup"}></BottomWarning>
    </div>
}