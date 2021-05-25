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
  const [currentUser, setCurrentUser] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  console.log("current user", currentUser)
  
  useEffect (() => {
    const token = localStorage.getItem("token")

    fetch ("http://localhost:3001/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(r => r.json())
      .then(user => {
        setCurrentUser(user);
      })
  }, []);

    console.log(currentUser)

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
     
     <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
     
     <Switch>
      <Route exact path= "/">
        <LandingPage />
      </Route>

      <Route exact path="/posts/:id/">
        <PostShow removePost={removePost} currentUser={currentUser}/>
      </Route>

      <Route exact path ="/posts/">
      <PostContainer removePost={removePost} currentUser={currentUser} allPosts={allPosts} setAllPosts={setAllPosts}/>
      </Route>

      <Route exact path ="/posts/:id/edit">
        <UpdatePostForm removePost={removePost} currentUser={currentUser}/>
      </Route>

     <Route exact path="/signup">
       <Signup setCurrentUser={setCurrentUser}/>
     </Route>
     
     <Route exact path="/login">
      <Login setCurrentUser={setCurrentUser} />
     </Route>

      <Route exact path="/profile">
      <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Route>



     </Switch>
    </div>
  );
}

export default App;
