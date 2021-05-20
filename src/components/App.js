import Home from "./Home";
import PostContainer from "./PostContainer";
import Profile from "./Profile";
import {Switch, Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path= "/">
        <Home />
      </Route>
      
      <PostContainer />
      
      <Profile />
     
     </Switch>
    </div>
  );
}

export default App;
