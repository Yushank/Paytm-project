import { Link } from "react-router-dom";


export function BottomWarning({label, buttonText, to}){
    return <div>
        {label}
        <Link to={to}>{buttonText}</Link>
    </div>
}