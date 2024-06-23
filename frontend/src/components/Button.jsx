

export function Button({ label, onClick }) {
    return <div>
        <div className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <button onClick={onClick}>{label}</button>
        </div>
    </div>
}