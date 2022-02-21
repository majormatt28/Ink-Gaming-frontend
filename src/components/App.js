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
  
  useEffect (() => {
    const token = localStorage.getItem("token")
    fetch ("https://ink-gaming.herokuapp.com/me", {
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

    useEffect(() => {
        fetch(`https://ink-gaming.herokuapp.com/posts`)
        .then(r => r.json())
        .then(setAllPosts)
    }, [])
    console.log(allPosts)
    function removePost(id) {
        const filteredPosts = allPosts.filter(post => post.id !==id)
        setAllPosts(filteredPosts)
    }

  return (
    <div className="App">
     
     <NavBar user={user} setUser={setUser}/>
     
     <Switch>

      <Route exact path="/posts/:id/">
        <PostShow removePost={removePost} user={user}/>
      </Route>

      <Route exact path= "/">
        <LandingPage user={user} setUser={setUser}/>
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
      <Profile user={user} setUser={setUser} />
      </Route>

     </Switch>
    </div>
  );
}

export default App;
