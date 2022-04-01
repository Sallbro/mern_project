import React from 'react'
import { Switch } from 'react-router';
import { Route } from 'react-router';

import About from './About';
import Service from './Service';
// import Home from './Home';
import Contact from './Contact';
import Details from './Details';
import App from './App';
import Addshop from './Addshop';
import { createContext, useReducer } from 'react';
// import { Sal } from './App';
import Singin from './Singin';
import Singup from './Singup';
import Logout from './Logout';
import { Reducer } from '../src/reducer/userreducer'
import { initialState } from '../src/reducer/userreducer'
import  Menus  from './Menus'
import Addshop_con from './container/Addshop_con';
export const Usercontext = createContext();

const Navs = () => {
  // const chal = useContext(Sal);
  // const namaste = useContext(Sal);
  // const abhirok=namaste;
  // console.log("namaste"+namaste);
  // console.log("good"+good);
  const [state, dispatch] = useReducer(Reducer, initialState);
  

  return (
    <>
      <Usercontext.Provider value={{state, dispatch}}>
        {/* <h1> salman{this.props.wata}</h1>  */}
        <Menus />
        <Switch>
          <Route path="/" component={App} exact></Route>
          <Route path="/about" component={About} exact></Route>
          <Route path="/service" component={Service} exact></Route>
          <Route path="/contact" component={Contact} exact></Route>
          {/* <Route path="/addtocart" exact>
            <Addshop goog1={"good"} />
          </Route> */}
          <Route path="/addtocart" exact>
            <Addshop_con/>
          </Route>
          <Route path="/singin" component={Singin} exact></Route>
          <Route path="/singup" component={Singup} exact></Route>
          <Route path="/logout" component={Logout} exact></Route>
          <Route path="/details" component={Details} exact></Route>
          <Route component="App"></Route>
          {/* <Redirect to="/" /> */}

        </Switch>
      </Usercontext.Provider>
    </>
  )
}

export default Navs;
