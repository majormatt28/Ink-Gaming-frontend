import {useState} from "react"

function Profile ({ currentUser ,setCurrentUser }) {
    const [formData, setFormData] = useState({
        email: currentUser.email
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
        fetch ("http://localhost:3001/me", {
            method: "PATCH",
            headers: {
              "Content=Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(user => {
            setCurrentUser(user)
        })
    }

    const {email} = formData

    return (
        <form onSubmit={handleSubmit}>
            <h1>{currentUser.username}'s Profile</h1>
           <label>Email Address: </label>
           <textarea name="email" value={email} onChange={handleChange} />
           <input type="submit" value="Update" />
        </form>
    );
}

export default Profile;