import Form from "../components/Form"

function Register() {
    return <div>
            <div className="header">
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            </ul>
            </div>


        <Form route="/api/user/register/" method="register" />
    </div>
}

export default Register