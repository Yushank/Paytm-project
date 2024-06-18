import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { useEffect, useState } from "react"


export const Dashboard=()=>{
    const [balance, setBalance] = useState("");

    useEffect(()=>{
        const fetchBalance= async()=>{
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("response.data: ", res.data);
                setBalance(res.data.balance)
            }catch(error){
                console.error("error fetching balance", error)
            }
        }
        fetchBalance();
    }, [])
    //using useEffect to fetch balance , because it helps fetch data from outside api as component mounts
    //also send token with fetch link as it is required in backend to auth the request
    //then the fetched data is passed through component and rendered

    return <div>
        <Appbar></Appbar>
        <Balance value={balance}></Balance>
    </div>
}