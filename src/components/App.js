import Home from "./Home";
import PostContainer from "./PostContainer";
import PostShow from './PostShow'
// import Profile from "./Profile";
import {Switch, Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path= "/">
        <Home />
      </Route>
      <Route exact path="/posts/:id/">
        <PostShow />
      </Route>
      <Route exact path ="/posts/">
      <PostContainer />
      </Route>
      {/* <Profile /> */}
     
     </Switch>
    </div>
  );
}

export default App;
