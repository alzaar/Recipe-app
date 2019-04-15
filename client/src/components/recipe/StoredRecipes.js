import React from 'react';
import './css/storedrecipes.css';
import { connect } from 'react-redux';
import { getStoredRecipes } from '../../actions/recipeAction';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard'
import Spinner from '../common/Spinner';

class StoredRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storedRecipes: []
    }
  }
  componentWillMount() {
    this.props.getStoredRecipes();
    this.setState({
      storedRecipes: this.props.recipe.storedRecipes.data
    })
  }
  render() {
    let recipes = <Spinner/>
    if (this.state.storedRecipes) {
      recipes = this.state.storedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />);
    }
    return(
      <div className="recipes-container">
        <h4 className="header-title">Your Recipes</h4>
        <div className="container">
          <div className="row">
          {recipes}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}

StoredRecipes.propTypes = {
  recipe: PropTypes.object.isRequired,
  getStoredRecipes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getStoredRecipes })(StoredRecipes);
