import {useState} from "react"

function Profile ({ user ,setUser }) {
    const [formData, setFormData] = useState({
        email: user.email
    })
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        fetch ("https://nameless-tor-13132.herokuapp.com/me", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(user => {
            setUser(user)
        })
    }

    const {email} = formData

    return (
        <form onSubmit={handleSubmit}>
            <h1>{user.username}'s Profile</h1>
           <label>Email Address: </label>
           <textarea name="email" value={email} onChange={handleChange} />
           <input type="submit" value="Update" />
        </form>
    );
}

export default Profile;
