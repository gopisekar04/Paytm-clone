export function BottomWarning({label, login, to}){
    return <div className="mt-3">
    <button className="w-full rounded-md font-semibold">{label}<a className="underline" href={to} >{login}</a></button>
</div>
}