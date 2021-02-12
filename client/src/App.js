import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/FogotPassword";

//for navigation from ant Header
import Header from "./components/nav/Header";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  //to check the firebase auth state; this
  //loads wheneverever component mounts or state change happens
  //useEffect takes a function and dependency array as arguments
  useEffect(() => {
    //dispatch user information to redux store
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //if we have user get user's token -> access protected routes later
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        //dispatch token to redux store (make sure you send all the user fields you need!!)
        dispatch({
          //expecting type and payload
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    //cleanup

    return () => unsubscribe();
  }, []);

  return (
    //this is wrapped in index.js with BrowserRouter
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </React.Fragment>
  );
};

export default App;