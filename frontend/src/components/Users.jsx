import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export function Users(){  

    const [searchedUser, setSearchUser] = useState("");
    const [users, setUsers] = useState([]);
    
    useEffect(() => {        
        const fetchDBUser = async() => {        
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk/?filter=" + searchedUser);
            setUsers(response.data.user);
        }
        fetchDBUser();
    }, [searchedUser])
    
    console.log(users);

    return <div>
        <div className='font-bold mb-3'>Users</div>
        <input  type="text" id="searchUser" onInput={(e) => {
            setSearchUser(e.target.value)            
        }} className="rounded-md border w-full text-sm px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Search users..." required />
        <ul className="list-none">
               {users.map((eachUser) => <User user={eachUser} key={eachUser._id} />)}
        </ul>
    </div>
}

function User({user}){
    const navigate = useNavigate();
    const data = user

    return <li className="flex justify-between mt-3" >
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <div>
                {user.firstName}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center h-ful">
    <button className="bg-black text-white px-5 py-1.5 md:py-2 mr-2 rounded-lg text-xs" onClick={(e) => {
        navigate("/send?id=" + user._id + "&name=" + user.firstName)
    }
    }>Send Money</button>
    </div>
</li>
}


