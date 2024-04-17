export function Button({btnText, onClick}){
    return <div className="mt-3">
        <button onClick={onClick} type="submit" className="bg-black w-full text-white py-1.5 rounded-md font-sans">{btnText}</button>
    </div>
}