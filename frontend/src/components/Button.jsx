

export function Button({label, onClick}){
    return <div>
        <button onClick={onClick}>{label}</button>
    </div>
}