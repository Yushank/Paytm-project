

export function Balance({ value }) {
    return <div className="flex">
        <div className="font-bold text-lg">
            You have balance -  
        </div>
        <div className="font-semibold text-lg ml-4">
            Rs {value}
        </div>
    </div>
}