import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import MenuBar from "../components/MenuBar";
import Register from "../components/pages/Register";
import {AuthProvider} from './../context/auth';
import AuthRoute from './AuthRoute';
import SinglePost from "../components/pages/SinglePost";
function Routes() {
  return (
    <AuthProvider>
    <Router>
      <MenuBar />
      <Container>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} />
        <Route exact path="/posts/:postId" component={SinglePost} />
      </Container>
    </Router>
    </AuthProvider>
  );
}
export default Routes;
