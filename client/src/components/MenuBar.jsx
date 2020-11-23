import React, { useState,useEffect ,useContext} from "react";
import { NavLink, useHistory } from "react-router-dom";
import {AuthContext} from './../context/auth';
import './MenuBar.scss';

function MenuBar() {
  const {user,logout} = useContext(AuthContext);
  const [activeItem, setactiveItem] = useState("home");
  const history = useHistory();
  const {location:{pathname}} = history;
  const handleItemClick = React.useCallback((e) => {
    const {name} = e.target
    setactiveItem(name);
  },[])

  useEffect(() => {
    if(pathname === '/') { setactiveItem('home') 
    return;
    }
    setactiveItem(pathname.substr(1))
}, [])

  const menuBar = user? (
    <ul className = {user ? 'menubar':'menubar-loggedout'}>
    <li className = {activeItem ==='home'?'active':''}>
      <NavLink exact name = 'home' onClick = {handleItemClick} to="/" className="ui item active" >
        {user.username}
      </NavLink>
    </li>
    <li>
    </li>
    <li className = {activeItem ==='logout'?'active':''}>
      <NavLink name = 'logout'  onClick = {logout} to="logout" className="ui item" >
        logout
      </NavLink>
    </li>
  </ul>
  ):
  ( <ul className = 'menubar'>
  <li className = {activeItem ==='home'?'active':''}>
    <NavLink exact name = 'home' onClick = {handleItemClick} to="/" className="ui item " activeClassName="active">
      Home
    </NavLink>
  </li>
  <li>
  </li>
  <li className = {activeItem ==='login'?'active':''}>
    <NavLink name = 'login' onClick = {handleItemClick} to="/login" className="ui item" activeClassName="active">
      Login
    </NavLink>
  </li>
  <li className = {activeItem ==='register'?'active':''}>
    <NavLink name = 'register'  onClick = {handleItemClick} to="register" className="ui item" activeClassName="active">
      Register
    </NavLink>
  </li>
</ul>)


  

  return menuBar;
}

export default React.memo(MenuBar);
