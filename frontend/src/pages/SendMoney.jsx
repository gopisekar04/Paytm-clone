import axios from "axios";
import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function SendMoney(){    
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [transferAmount, setTransferAmount] = useState(0);

    return <div className="bg-gray-100 h-screen flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg w-96 shadow-md">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            <div className="flex items-center space-x-4 mt-6">
                <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0]}</span>                                    
                </div>
                <h3 className="text-3xl font-semibold">{name}</h3>
            </div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">Amount (in Rs)</label>
            <input type="number" className="rounded-md mt-2 h-10 border w-full text-sm px-2 py-1.5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Amount" onChange={(e) => {
                setTransferAmount(e.target.value)
            }} ></input>
            <button type="submit" className="hover:bg-green-500 hover:text-white rounded-md mt-4 h-10 border-2 border-green-500 w-full text-sm px-2 py-1.5 text-green-500 bg-white" placeholder="Enter Amount" onClick={async() => {
                console.log("hiii");
                const token = localStorage.getItem("token");
                const response =  await axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to: id,
                    amount: transferAmount
                }, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                })
                
                if(response.status === 200){
                    navigate("/dashboard")
                }
            }} >Initiate Transfer</button>
        </div>
    </div>
} 

export default SendMoney