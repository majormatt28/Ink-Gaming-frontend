import { useState } from "react";
import { useHistory } from 'react-router-dom';

function Login ({ setCurrentUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        })
        .then(r => {
            return r.json().then(data => {
                if (r.ok) {
                    return data
                } else {
                    throw data
                }
            })
        })
        .then (data => {
            // console.log(data)
            const {user, token} = data
            localStorage.setItem("token", token)
            setCurrentUser(user)
            history.push('/posts')
        })
        .catch(error => setErrors(error.errors))
    } 

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username: </label>
                <input type="text" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default Login;