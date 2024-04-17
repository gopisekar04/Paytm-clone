export function Appbar({username}){ 
    const initial = username[0]

    return <div className="flex justify-between shadow px-4 py-3 items-center">            
            <div className="font-bold text-xl">Payments App</div>
            <div className="flex items-center">
                <h2 className="font-semibold">Hello, {username}</h2>                
                <div className="bg-slate-200 h-12 w-12 rounded-full ml-2 flex items-center justify-center">
                    {initial}
                </div>
            </div>
        </div>
}