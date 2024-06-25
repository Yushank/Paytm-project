import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Navigate, useNavigate } from "react-router-dom"


export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white border w-80 p-2 text-center px-4 h-max">
                <Heading label={"Signin"}></Heading>
                <InputBox label={"username"} onChange={(e) => { setUsername(e.target.value) }} placeholder={"john@gmail.com"}></InputBox>
                <InputBox label={"password"} onChange={(e) => { setPassword(e.target.value) }} placeholder={"123456"}></InputBox>
                <div className="p-4">
                    <Button label={"sign in"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token) //storing the generated token after signing in
                        navigate("/dashboard")
                    }}></Button>
                </div>
                <BottomWarning label={"Don't have an account"} buttonText={"sign up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
}