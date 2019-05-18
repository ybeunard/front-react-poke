import React, { Component } from 'react';
import Header from './Header'
import './App.css';
import Recipes from "./recipe/Recipes";
import RecipeDetails from './recipe/RecipeDetails'
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecipeForm from "./recipe/RecipeForm";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Header/>
            <div className="page">
                <Route path="/" exact component={Recipes} />
                <Route path="/recipes" exact component={Recipes} />
                <Route path="/recipe/:id" component={RecipeDetails} />
                <Route path="/recipes/add" component={RecipeForm}/>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
