import { useParams } from "react-router-dom";
export default function Reset() {
    const { token } = useParams();
    return (
        <div className="login-background">
            { token }
        </div>
    )
}