import React from "react";
import {  Switch, Route } from "react-router-dom";
import Dashboard from "../Components/HomeLayout";


const AppRoutes = props => {

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  )
}

export default AppRoutes;

