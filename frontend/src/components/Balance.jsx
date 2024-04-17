export function Balance({balance}){
    return <div className="mt-4 flex">
        <div className="font-bold text-lg">Your balance </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}