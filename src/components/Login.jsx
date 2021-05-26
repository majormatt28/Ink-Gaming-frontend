import { useState } from "react";
import { useHistory } from 'react-router-dom';

function Login ({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("username", username)
        console.log("password", password)
        console.log(JSON.stringify({ username, password }))

        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json', 
            },
            body: JSON.stringify({ username, password })
        })
        .then(resp => {
            console.log("login response",resp)
            return resp.json().then(data => {
                console.log(data)
                if (resp.ok) {
                    return data
                } else {
                    throw data
                }
            });
        })
        .then (userInfo => {
            // console.log(userInfo)
            const {user, token} = userInfo
            localStorage.setItem("token", token)
            setUser(user)
            history.push('/posts')
        })
        .catch(error => {
            setErrors(error.errors)
        })
    } 

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username: </label>
                <input 
                type="text" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {errors.map(error=><h3 style={{color:"black"}} key={error}>{error}</h3>)}
                <br/>
                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default Login;