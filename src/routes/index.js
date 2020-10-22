import React, { useEffect } from "react";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginRoute from "./Login";
import { useIsAuthenticated } from "../App/Context";
import AppRoutes from "./ProtectedApp";

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginRoute} />
        <ProtectedRoute path="/" component={AppRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

const ProtectedRoute = (props) => {
  const auth = useIsAuthenticated()  
  return auth ? (
    <Route {...props}  />
  ) : (
    <Redirect to={"/login"} />
  );
};

export default AppRouter;
