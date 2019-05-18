import React, { Component } from 'react';
import { SelectField } from 'react-md';

import './RecipeIngredient.scss'

class RecipeIngredient extends Component {

    state = {
        listItem: []
    };

    updateQuantity = (event) => {
        this.props.updateQuantity(event.target.value, this.props.index);
    };

    updateUnit = (event) => {
        this.props.updateUnit(event.target.value, this.props.index);
    };

    updateIngredient = (value) => {
        this.props.updateIngredient(this.props.ingredients[value], this.props.index)
    };

    listItemInit(ingredients) {
        const listItem = [];
        ingredients.forEach((ingredient, index) => listItem.push({label: ingredient.name, value: index}));
        this.setState({
            listItem: listItem
        });
    }

    componentDidMount() {
        this.listItemInit(this.props.ingredients);
    };

    componentWillReceiveProps(props) {
        this.listItemInit(props.ingredients);
    }

    render() {
        return (
            <div className="recipe-ingredient">
                <div className="recipe-ingredient-fields">
                    <div>
                        <SelectField
                            id="select-field-5"
                            placeholder="Strings button"
                            className="md-cell"
                            position={SelectField.Positions.BELOW}
                            menuItems={this.state.listItem}
                            onChange={this.updateIngredient}
                        />
                    </div>
                    <div className="standard-field">
                        <div className="field">
                            <input value={this.props.ingredient.quantity} onChange={this.updateQuantity}
                                   type="number" className="input-field" placeholder="Qtt"/>
                        </div>
                    </div>

                    <div className="standard-field">
                        <div className="field">
                            <input value={this.props.ingredient.unit} onChange={this.updateUnit}
                                   type="text" className="input-field" placeholder="Unit"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default RecipeIngredient;
