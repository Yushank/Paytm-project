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

    return <div className="flex justify-center h-screen bg-slate-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div>
                                <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} onChange={(e) => { setAmount(e.target.value) }}></InputBox>
                            </div>
                        </div>
                        <div >
                            <button onClick={async () => {
                                await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                    to: id,
                                    amount
                                }, {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                            }} className="flex justify-center rounded-md text-sm font-medium bg-green-500 text-white h-10 px-4 py-2 w-full transition-colors ring-offset-background">Initiate Transfer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}