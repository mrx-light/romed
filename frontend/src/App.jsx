import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Categorys from "./Components/Categorys/Categorys";
import AdminComponent from "./Components/Admin/Admin.jsx"
import CardProduct from './UI/CardProduct/CardProduct';
import Product from "./Components/Product/Product"
import CategoryType from './Components/CategoryType/CategoryType';
import Type from './Components/Type/Type';
function App(props) {

  return (

    < BrowserRouter >
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/categorys" exact>
          <Categorys />
        </Route>
        <Route path="/categorys/:id" exact>
          <CategoryType />
        </Route>
        <Route path="/admin" exact>
          <AdminComponent />
        </Route>
        <Route path="/card" exact>
          <CardProduct />
        </Route>
        <Route path="/type/:type" exact>
          <Type />
        </Route>
        <Route path="/product/:id" exact>
          <Product />
        </Route>
        <Redirect to="/" />
      </Switch>


    </BrowserRouter >

  );
}

export default App;
