import React, { Component } from 'react';
import RecipeOverview from "./RecipeOverview";

import './Recipes.scss'

class Recipes extends Component {

    state = {
        url: 'http://10.0.1.212:8080/api/v1/recipes',
        recipes: []
    };

    getRecipes = () => {
        fetch(this.state.url).then((result) => {
            result.json().then((recipes) => {
                this.setState({
                    recipes: recipes
                });
            })
        }).catch((error) => {
            console.log(error);
        });
    };

    deleteRecipe = (id) => {
        fetch(this.state.url + '/' + id, {
            method: 'delete'
        }).then(() => {
            this.getRecipes();
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        return (
            <div className="recipes">
                {
                    this.state.recipes.map(
                        (recipe) => {
                            return <div key={recipe.id} className="recipes">
                                    <RecipeOverview recipe={recipe} onDelete={this.deleteRecipe} />
                                </div>
                        }
                    )
                }

            </div>

        );
    }
}

export default Recipes;
