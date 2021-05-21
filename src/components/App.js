import LandingPage from "./LandingPage";
import PostContainer from "./PostContainer";
import PostShow from './PostShow'
import Login from './Login'
import Signup from './Signup'
// import Profile from "./Profile";
import {Switch, Route} from "react-router-dom";



function App() {
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
      <Login />
     </Route>

     <Route exact path="/signup">
       <Signup />
     </Route>
     </Switch>
    </div>
  );
}

export default App;
