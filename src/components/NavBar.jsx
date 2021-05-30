import { NavLink, useHistory } from 'react-router-dom'

function NavBar ({user, setUser}) {
    
    const history = useHistory()
    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        history.push("/")
    }

    return (
        <div>
           <nav>
               {user ? (
                   <div>
                   <NavLink className="button" to="/posts">
                       Main Page
                   </NavLink>
                   <br/>
                   <NavLink className="button" to="/profile">
                        {user.username}
                   </NavLink>
                   <br/>
                   <button onClick={logout}>Logout</button>
                   </div>
               ):(
                    <div>
                        <NavLink className="button" to="/login">
                            {/* Login */}
                        </NavLink>
                        <NavLink className="button" to="/signup">
                            SignUp!
                        </NavLink>
                    </div>
               )}
            </nav> 
        </div>
    );
}

export default NavBar