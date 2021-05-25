import { NavLink, useHistory } from 'react-router-dom'

function NavBar ({currentUser, setCurrentUser}) {
    const history = useHistory()
    const logout = () => {
        localStorage.removeItem("token")
        setCurrentUser(null)
        history.push("/")
    }

    return (
        <div>
           <nav>
               {currentUser? (
                   <div>
                   <NavLink className="button" to="/posts">
                       Main Page
                   </NavLink>
                   <br/>
                   <NavLink className="button" to="/profile">
                        Profile Page
                   </NavLink>
                   <br/>
                   <button onClick={logout}>Logout</button>
                   </div>
               ):(
                    <div>
                        <NavLink className="button" to="/login">
                            Login
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