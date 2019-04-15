import React from 'react';
import './css/recipecard.css';
//helper function to limit word
import { limit } from '../../helpers/limit';
//import Action to store selected Recipe
import { getRecipeInfo } from '../../actions/recipeAction';
//Redux Connector for component
import { connect } from 'react-redux';
//withRouter to get to Recipe Page
import { withRouter } from 'react-router-dom';
//Props Validation
import PropTypes from 'prop-types';

class Card extends React.Component {
  handleOnClick = () => {
    this.props.getRecipeInfo(this.props.recipe.id, this.props.history);

  }
  render() {
    const recipe = this.props.recipe;
    let title = limit(recipe.title);
    return (
      <div className="col-md-4">
        <div className="card" id="media-card">
          <div className="card-body" id="media-body">
            <h5 className="card-title">{title}</h5>
          </div>
          <img className="card-img-bottom card-img" onClick={this.handleOnClick} id="media-img" src={recipe.image} alt={recipe.title} />
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  recipe: PropTypes.object.isRequired,
  getRecipeInfo: PropTypes.func.isRequired
}

export default connect(null, { getRecipeInfo })(withRouter(Card));
