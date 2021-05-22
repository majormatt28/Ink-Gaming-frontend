import LandingPage from "./LandingPage";
import PostContainer from "./PostContainer";
import PostShow from './PostShow'
import Login from './Login'
import Signup from './Signup'
import NavBar from './NavBar'
// import Profile from "./Profile";
import {Switch, Route} from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  console.log("current user", currentUser)
  
  useEffect (() => {
    const token = localStorage.getItem("token")
    fetch ("http://localhost:3001/me", {
      headers: {"Authorization": `Bearer ${token}`}
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
        .then(user => setCurrentUser(user))
  }, [])

  return (
    <div className="App">
     <Switch>
      <Route exact path= "/">
        <LandingPage />
      </Route>
      <Route exact path="/posts/:id/">
        <PostShow />
      </Route>
      <Route exact path ="/posts/">
      <PostContainer />
      </Route>
      {/* <Profile /> */}
     
     <Route exact path="/login">
      <Login setCurrentUser={setCurrentUser} />
     </Route>

    <Route>
     <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    </Route>

     <Route exact path="/signup">
       <Signup setCurrentUser={setCurrentUser}/>
     </Route>
     </Switch>
    </div>
  );
}

export default App;
