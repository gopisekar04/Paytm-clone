import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";



function Signup (){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const createUser = async() =>{
        const response = await axios.post("http://localhost:3000/v1/api/user/signup", {
            firstName,
            lastName,
            email,
            password
        })

        if(response.status === 200){
            navigate('/dashboard')
        }
    }

    return <div className="bg-neutral-500 h-screen flex justify-center items-center">
        <div className="w-96 padding-6 bg-white rounded p-6">
            <Heading title="Sign UP"></Heading>
            <SubHeading subheading="Enter your information to create an account"></SubHeading>
            <Inputbox type="text" labelText="First Name" placeholder="John" id="firstname" onChange={(e) => {
                setFirstName(e.target.value)                
            }}></Inputbox>
            <Inputbox type="text" labelText="Last Name" placeholder="Doe" id="lastname" onChange={(e) => {
                setlastName(e.target.value)                
            }}></Inputbox>
            <Inputbox type="email" labelText="Email" placeholder="johndoe@gmail.com" id="email" onChange={(e) => {
                setUsername(e.target.value)                
            }}></Inputbox>
            <Inputbox type="password" labelText="Password" id="password" onChange={(e) => {
                setPassword(e.target.value)                
            }}></Inputbox>
            <Button btnText="Sign Up" onClick={ async() =>{
                 const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                })

                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
            }               
            } ></Button>                                
            <BottomWarning label="Already have an account? " login="Login" to="/signin" ></BottomWarning>
        </div>
    </div>
}   

export default Signup
