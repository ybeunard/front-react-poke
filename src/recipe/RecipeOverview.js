import React, { Component } from 'react';
import { Card, CardTitle, CardText, Media, Button } from 'react-md';
import { Link } from "react-router-dom";

import './RecipeOverview.scss'

class RecipeOverview extends Component {
    state = {
        isExpanded: false
    };

    toggleInfos = () => {
        this.setState({isExpanded: !this.state.isExpanded});
    };

    delete = () => {
      this.props.onDelete(this.props.recipe.id);
    };

    render() {
        return (
            <div className="recipe">
                <Card className="md-block-centered">
                    <CardTitle title={this.props.recipe.name} subtitle="" />
                    <Media>
                        <img src={this.props.recipe.picture} alt="Nature from lorempixel" />
                    </Media>
                    { this.state.isExpanded && <CardText>
                            <p>
                                {this.props.recipe.description}
                            </p>
                        </CardText>
                    }
                    <Button flat onClick={this.toggleInfos}>
                        Show
                        { this.state.isExpanded ? <span> less</span> : <span> more</span> }
                    </Button>
                    <Button flat><Link to={"/recipe/" + this.props.recipe.id}>Go to recipe</Link></Button>
                    <Button flat onClick={this.delete}>Delete</Button>
                </Card>
            </div>
        );
    }
}

export default RecipeOverview;
