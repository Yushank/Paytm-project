import { useSearchParams } from "react-router-dom"
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    //getting the id and name from searchbar query using useSearchParams
    //we have sent id and name parameters along with /navigate route in Users component, so that we can sent that name user money

    const [amount, setAmount] = useState("");

    return <div>
        <div>
            Send Money
        </div>
        <div>
            {name}
        </div>
        <div>
            <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} onChange={(e)=>{setAmount(e.target.value)}}></InputBox>
        </div>
        <div>
            <button onClick={async()=>{
                await axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: id,
                    amount
                },{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }}>Initiate Transfer</button>
        </div>
    </div>
}