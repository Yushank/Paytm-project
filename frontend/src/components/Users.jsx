import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("response data:", res.data);
                setUsers(res.data.user)
            }
            catch (error) {
                console.error("error fetching users", error)
            }
        }
        fetchUsers();
    }, [filter])

    return <>
        <div>
            Users
        </div>
        <div>
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="search users.." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
            {/* sending every filtered user list we got from the backend in users state to <User/> component to render it one by one */}
        </div>
    </>
}


function User({user}) {
    const navigate = useNavigate();

    return <div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            {user.firstName[0]}
        </div>
        <div>
            {user.firstName} {user.lastName}
        </div>

        <div>
            <Button label={"Send Money"} onClick={()=>{
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}></Button>
        </div>
    </div>

}




