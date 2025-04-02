import Form from "../components/Form"

function Login() {
    return <div>
            <div className="header">
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            </ul>
            </div>
        <Form route="/api/token/" method="login" />
</div>
}

export default Login