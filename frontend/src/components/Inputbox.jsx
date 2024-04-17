export function Inputbox({labelText, placeholder, id, type, onChange}){    

    return <div className="mt-3">
    <label htmlFor={id} className="block text-sm mb-2 font-semibold">{labelText}</label>
    <input onChange={onChange}  type={type} id={id} className="rounded-md border w-full text-sm px-2 py-1.5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder={placeholder} required />
</div>
}