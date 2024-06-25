import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom"


export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 p-2 text-center h-max px-4">
            <Heading label={"Signup"}></Heading>
            <InputBox label={"username"} onChange={(e) => { setUsername(e.target.value) }} placeholder={"john@gmail.com"}></InputBox>
            <InputBox label={"password"} onChange={(e) => { setPassword(e.target.value) }} placeholder={"123456"}></InputBox>
            <InputBox label={"first name"} onChange={(e) => { setFirstName(e.target.value) }} placeholder={"john"}></InputBox>
            <InputBox label={"last name"} onChange={(e) => { setLastName(e.target.value) }} placeholder={"titor"}></InputBox>
            <div className="p-4">
            <Button label={"sign up"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    password,
                    firstName,
                    lastName
                });
                localStorage.setItem("token", response.data.token) //storing the token generated after signing up
                navigate("/dashboard")
            }}></Button>
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}