import { useHistory } from 'react-router-dom'

function LandingPage () {
    const history = useHistory()
    
    function animation() {
        setTimeout(() => history.push("/login"), 700)
    }
    
    return (
       <div>
    <input type="checkbox" id="screen" name="screen"/>
        <main className="nintendo-switch">
        <aside className="actions left">
    <i className="minus">-</i>
    <div className="analogic">
      <div className="center-circle"></div>
    </div>
    <div className="buttons">
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </div>
    <div className="square"></div>
  </aside>
  <label className="middle" htmlFor="screen">
      <div className="glass"></div>
      <div className="screen" onClick={animation}>
      <span>Click here to <br/>
        <strong>Login</strong>
      </span>
      </div>
  </label>
  <aside className="actions right">
    <i className="plus">+</i>
    <div className="analogic">
      <div className="center-circle"></div>
    </div>
    <div className="buttons">
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </div>
    <div className="circle"></div>
  </aside>
</main>
    </div>      
    );
}

export default LandingPage;