import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const data = method === "register"
        ? { username, password, first_name: firstName, last_name: lastName, email }
        : { username, password }

    try {
        const res = await api.post(route, data)

        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate("/")
        } else {
            // For registration, login automatically after successful registration
            const loginRes = await api.post("/api/token/", { username, password })
            localStorage.setItem(ACCESS_TOKEN, loginRes.data.access)
            localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh)
            navigate("/")
        }
    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
}

return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        {/* Register info */}
        {method === "register" && (
            <>
                <input
                    className="form-input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />

                <input
                    className="form-input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />

                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </>
        )}

        {/* Username and password*/}
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>

    </form>
)
}

export default Form