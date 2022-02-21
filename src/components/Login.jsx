import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

function Login ({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
    setChecked(event.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("username", username)
        console.log("password", password)
        console.log(JSON.stringify({ username, password }))

        fetch("https://obscure-caverns-42124.herokuapp.com/login", {
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
        .then (data => {
            const {user, token} = data
            localStorage.setItem("token", token)
            setUser(user)
            history.push('/posts')
        })
        .catch(error => {
            setErrors(error.errors)
        })
    } 

    return (
        <div className="login-form-box">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-content">
                <h2>Login</h2>
                <label>Username: </label>
                <input 
                className="username-input"
                type="text" 
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input 
                className="password-input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {errors.map(error=><h3 style={{color:"red"}} key={error}>{error}</h3>)}
                <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <text>Remember me?</text>
                <button type="submit" className="login-btn">Login</button> 
                </div>
            </form>
        </div>
    );
}

export default Login;
