import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Signin(){    
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")

    return <div className="bg-neutral-500 h-screen flex justify-center items-center">
        <div className="w-96 padding-6 bg-white rounded p-6">
            <Heading title="Sign In"></Heading>
            <SubHeading subheading="Enter your your credentials to access yor account"></SubHeading>
            <Inputbox labelText="Email" placeholder="johndoe@gmail.com" type="text" id="email" onChange={e => setUsername(e.target.value)} ></Inputbox>
            <Inputbox labelText="Password" placeholder="" type="password" id="password" onChange={e => setPassword(e.target.value)}></Inputbox>
            <Button btnText="Sign In" onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                    username,
                    password
                })         
                
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
                
            }} ></Button>                                
            <BottomWarning label="Don't have an account? " login="Sign Up" to="/signup" ></BottomWarning>
        </div>
    </div>
}

export default Signin