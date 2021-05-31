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
                   <NavLink className="main-page-button" to="/posts">
                       Main Page
                   </NavLink>
                   <br/>
                   <NavLink className="profile-button" to="/profile">
                        {user.username}
                   </NavLink>
                   <br/>
                   <button onClick={logout} className="logout-button">Logout</button>
                   </div>
               ):(
                    <div>
                        <div className="home=page-button">
                        <NavLink className="home-page-button" to="/">
                            Welcome Page
                        </NavLink>
                        </div>
                        <div className="signup-button-div">
                        <NavLink className="signup-page-button" to="/signup">
                            SignUp!
                        </NavLink>
                        </div>
                    </div>
               )}
            </nav> 
        </div>
    );
}

export default NavBar