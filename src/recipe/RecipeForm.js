import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'react-md';
import RecipeIngredient from './RecipeIngredient'

import './RecipeForm.scss'

class RecipeForm extends Component {
    state = {
        urlRecipes: 'http://10.0.1.212:8080/api/v1/recipes',
        urlIngredients: 'http://10.0.1.212:8080/api/v1/ingredients',
        recipe: {
            name: '',
            picture: '',
            description: '',
            ingredients: [],
            instructions: []
        },
        ingredients: [],
        ingredientName: ''
    };

    updateIngredientName = (event) => {
        this.setState({
            ingredientName: event.target.value
        });
    };

    createIngredient = () => {
      fetch(this.state.urlIngredients, {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: this.state.ingredientName
      }).then(() => {
          this.getIngredients();
          this.setState({
              ingredientName: ''
          });
      }).catch((error) => {
          console.log(error);
      })
    };

    createRecipe = () => {
        fetch(this.state.urlRecipes, {
           method: 'post',
           headers: {'Content-Type' : 'application/json'},
           body: JSON.stringify(this.state.recipe)
        }).then(() => {
            this.props.history.push('/recipes')
        }).catch((error) => {
            console.log(error)
        });
    };

    getIngredients = () => {
      fetch(this.state.urlIngredients).then((result) => {
          result.json().then((ingredients) => {
              this.setState({
                  ingredients: ingredients
              });
          })
      });
    };

    updateName = (event) => {
        const recipe = this.state.recipe;
        recipe.name = event.target.value;
        this.setState({
           recipe: recipe
        });
    };

    updatePicture = (event) => {
        const recipe = this.state.recipe;
        recipe.picture = event.target.value;
        this.setState({
           recipe: recipe
        });
    };

    updateDescription = (event) => {
        const recipe = this.state.recipe;
        recipe.description = event.target.value;
        this.setState({
           recipe: recipe
        });
    };

    addInstruction = () => {
      const recipe = this.state.recipe;
      recipe.instructions.push('');
      this.setState({
          recipe: recipe
      });
    };

    updateInstruction = (event, index) => {
        const recipe = this.state.recipe;
        recipe.instructions[index] = event.target.value;
        this.setState({
            recipe: recipe
        });
    };

    removeInstruction = (index) => {
        const recipe = this.state.recipe;
        recipe.instructions.splice(index, 1);
        this.setState({
            recipe: recipe
        })
    };

    addIngredient = () => {
        const recipe = this.state.recipe;
        recipe.ingredients.push({
            ingredient: {
                id: null
            },
            name: '',
            unit: '',
            quantity: ''
        });
        this.setState({
            recipe: recipe
        });
    };

    updateIngredient = (value, index) => {
        const recipe = this.state.recipe;
        recipe.ingredients[index].ingredient = value;
        this.setState({
           recipe: recipe
        });
    };

    updateQuantity = (value, index) => {
      const recipe = this.state.recipe;
      recipe.ingredients[index].quantity = value;
      this.setState({
         recipe: recipe
      });
    };

    updateUnit = (value, index) => {
      const recipe = this.state.recipe;
      recipe.ingredients[index].unit = value;
      this.setState({
         recipe: recipe
      });
    };

    removeIngredient = (index) => {
        const recipe = this.state.recipe;
        recipe.ingredients.splice(index, 1);
        this.setState({
            recipe: recipe
        })
    };

    componentDidMount() {
        this.getIngredients();
    }

    render() {
        return (
            <div className="recipe-form">
                <h3>Add new recipe</h3>

                <div className="field">
                    <input onChange={this.updateName} value={this.state.recipe.name}
                           type="text" className="input-field" placeholder="Name"/>
                </div>

                <div className="field">
                    <input onChange={this.updatePicture} value={this.state.recipe.picture}
                           type="text" className="input-field" placeholder="Picture"/>
                </div>

                <div className="field">
                    <textarea onChange={this.updateDescription} className="input-field"
                              placeholder="Description" value={this.state.recipe.description}>
                    </textarea>
                </div>

                <div className="complex-section">
                    <h4>Instructions</h4>

                    {
                        this.state.recipe.instructions.map(
                            (instruction, index) => {
                                return <div key={index} className="complex-section-fields">
                                    <div className="field">
                                        <input onChange={(event) => { this.updateInstruction(event, index) }} value={instruction}
                                        type="text" className="input-field" placeholder="Instruction"/>
                                    </div>
                                    <div className="buttons">
                                        <Button flat onClick={() => {this.removeInstruction(index)}} className="add-button">
                                        -
                                        </Button>

                                        {
                                            this.state.recipe.instructions.length - 1 === index &&
                                            <Button flat onClick={this.addInstruction} className="add-button">
                                            +
                                            </Button>
                                        }
                                    </div>
                                </div>
                            }
                        )
                    }

                </div>

                {
                    this.state.recipe.instructions.length === 0 &&
                        <Button flat onClick={this.addInstruction}>
                            New instruction
                        </Button>
                }

                <div className="complex-section">
                    <h4>Ingredients</h4>

                    {
                        this.state.recipe.ingredients.map(
                            (ingredient, index) => {
                                return <div key={index} className="complex-section--fields">
                                    <RecipeIngredient ingredient={ingredient} index={index}
                                        updateQuantity={this.updateQuantity} updateUnit={this.updateUnit}
                                        ingredients={this.state.ingredients} updateIngredient={this.updateIngredient}/>

                                    <div className="buttons">
                                        <Button flat onClick={() => {this.removeIngredient(index)}} className="add-button">
                                            -
                                        </Button>

                                        {
                                            this.state.recipe.ingredients.length - 1 === index &&
                                            <Button flat onClick={this.addIngredient} className="add-button">
                                                +
                                            </Button>
                                        }
                                    </div>
                                </div>
                            }
                        )
                    }

                </div>

                {
                    this.state.recipe.ingredients.length === 0 &&
                    <Button flat onClick={this.addIngredient}>
                        New ingredient
                    </Button>
                }

                <div className="input-add-ingredient">

                    <div className="field">
                        <input value={this.state.ingredientName} className="input-field"
                            type=" text" placeholder="Ingredient Name" onChange={this.updateIngredientName}/>
                    </div>

                    <Button flat className="submit-button" onClick={this.createIngredient}>
                        New ingredient
                    </Button>

                </div>


                <Button flat className="submit-button" onClick={this.createRecipe}>
                    Add recipe
                </Button>
            </div>

        );
    }
}

export default withRouter(RecipeForm);
