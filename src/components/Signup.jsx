import { useState } from "react";
import { useHistory } from "react-router";

function Signup ({ setUser }) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({username, password, email})

        })
        .then (resp => {
            return resp.json().then(data => {
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
            history.push("/posts")
        })
        .catch(error => {
            setErrors(error.errors)
        })
    }

    return (
        <div className="signup-form-box">
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-form-content">
                <h2>SignUp Below!</h2>
                <label>UserName: </label>
                <input 
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />
                <br/>
                <label>Password: </label>
                <input 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <label>Email Address: </label>
                <input 
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                {errors.map(error => <h3 key={error} style={{color:"black"}}>{error}</h3>)}
                <button type="submit" className="signup-btn">Sign Up!</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;