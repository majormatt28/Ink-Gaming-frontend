import LandingPage from "./LandingPage";
import PostContainer from "./PostContainer";
import PostShow from './PostShow'
import Login from './Login'
import Signup from './Signup'
import NavBar from './NavBar'
import Profile from "./Profile";
import {Switch, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import UpdatePostForm from './UpdatePostForm'


function App() {
  const [user, setUser] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  console.log("user", user)
  
  useEffect (() => {
    const token = localStorage.getItem("token")

    fetch ("http://localhost:3001/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => {
        return resp.json().then(data => {
          if (resp.ok) {
            return data
          } else {
            throw data
          }
        })
      })
      .then(user => {
        setUser(user);
      })
  }, []);

    console.log(user)

    console.log(allPosts)

    useEffect(() => {
        fetch(`http://localhost:3001/posts`)
        .then(r => r.json())
        .then(setAllPosts)
    }, [])

    function removePost(id) {
        const filteredPosts = allPosts.filter(post => post.id !==id)
        setAllPosts(filteredPosts)
    }

  return (
    <div className="App">
     
     <NavBar User={user} setUser={setUser}/>
     
     <Switch>
      <Route exact path= "/">
        <LandingPage />
      </Route>

      <Route exact path="/posts/:id/">
        <PostShow removePost={removePost} user={user}/>
      </Route>

      <Route exact path ="/posts/">
      <PostContainer removePost={removePost} user={user} allPosts={allPosts} setAllPosts={setAllPosts}/>
      </Route>

      <Route exact path ="/posts/:id/edit">
        <UpdatePostForm removePost={removePost} user={user} allPosts={allPosts} setAllPosts={setAllPosts}/>
      </Route>

     <Route exact path="/signup">
       <Signup setUser={setUser}/>
     </Route>
     
     <Route exact path="/login">
      <Login setUser={setUser} />
     </Route>

      <Route exact path="/profile">
      <Profile user={user} setCurrentUser={setUser} />
      </Route>

     </Switch>
    </div>
  );
}

export default App;
