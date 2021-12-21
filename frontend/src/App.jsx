import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Categorys from "./Components/Categorys/Categorys";
import AdminComponent from "./Components/Admin/Admin.jsx";
import CardProduct from "./UI/CardProduct/CardProduct";
import Product from "./Components/Product/Product";
import CategoryType from "./Components/CategoryType/CategoryType";
import HomePage from "./HomePage/HomePage";
import Login from "./Components/Login/Login";
function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/categorys" exact>
          <Categorys />
        </Route>
        <Route path="/categorys/:type" exact>
          <CategoryType />
        </Route>
        <Route path="/admin" exact>
          <AdminComponent />
        </Route>
        <Route path="/card" exact>
          <CardProduct />
        </Route>
        <Route path="/product/:id" exact>
          <Product />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
