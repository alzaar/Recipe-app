import React from 'react';
import './css/recipe.css';
import { connect } from 'react-redux';
import { getRecipeInfo } from '../../actions/recipeAction';
//Action for storing recipe
import { storeRecipe, getSimilarRecipe, getStoredRecipes, removeRecipe } from '../../actions/recipeAction';
import { withRouter } from 'react-router-dom';
//Helper function
import recipeChecker from '../../helpers/recipeChecker';
import ReviewForm from '../review/ReviewForm';
import Review from '../review/Review';
import Spinner from '../common/Spinner';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.recipe.recipe.title,
      image: this.props.recipe.recipe.image,
      readyInMinutes: this.props.recipe.recipe.readyInMinutes,
      instructions: this.props.recipe.recipe.instructions,
      id: this.props.recipe.recipe.id,
      servings: this.props.recipe.recipe.servings,

      storedRecipes: [],
      flag: false
    }
  }
  handleOnClickAdd = () => {
    let recipe = {
      title: this.state.title,
      image: this.state.image,
      readyInMinutes: this.state.readyInMinutes,
      instructions: this.state.instructions,
      id: this.state.id,
      servings: this.state.servings
    }
    const { user } = this.props.auth;
    this.props.storeRecipe(recipe, user);
    this.props.getStoredRecipes();
    this.setState({
      storedRecipes: this.props.recipe.storedRecipes.data,
    })
  }

  handleOnClickRemove = () => {
    console.log(this.state.id);
    this.props.removeRecipe(this.state.id);
  }

  handleOnClickSimilarRecipe = (recipe) => {
    this.props.getRecipeInfo(recipe.id, this.props.history);
  }
  componentWillMount() {
    this.props.getSimilarRecipe(this.state.id)
    this.props.getStoredRecipes();

    this.setState({
      storedRecipes: this.props.recipe.storedRecipes.data
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe.recipe.id !==  this.state.id) {
      this.setState({
        title: nextProps.recipe.recipe.title,
        image: nextProps.recipe.recipe.image,
        readyInMinutes: nextProps.recipe.recipe.readyInMinutes,
        instructions: nextProps.recipe.recipe.instructions,
        id: nextProps.recipe.recipe.id,
        servings: nextProps.recipe.recipe.servings
      })
    }
    this.props.getStoredRecipes();
    this.setState({
      storedRecipes: this.props.recipe.storedRecipes.data,
    })
    this.setState({
      flag: recipeChecker(this.state.storedRecipes, this.state.id)
    })
  }
  render() {
    let cards = <Spinner/>
    if (this.props.recipe.similarRecipes.data) {
      cards = this.props.recipe.similarRecipes.data.map(recipe => <button key={recipe.id} onClick={() => this.handleOnClickSimilarRecipe(recipe)} className="btn btn-success btn-sm recipe-button">{recipe.title}</button>);
    }
    let button = <button className="btn add-btn btn-sm btn-dark" onClick={this.handleOnClickAdd}>Add To Recipes</button>;
    if (this.state.flag) {
      button = <button className="btn add-btn btn-sm btn-dark" onClick={this.handleOnClickRemove}>Remove From Recipes</button>
    }
    return (
      <div className="recipe-container">
      <h1 className="recipe-title"> {this.state.title} </h1>
        <div className="instructions">
        <h3 className="making">Instructions</h3>
        <img src={this.state.image} className="recipe-img" alt={this.state.id} />
        <p className="">{this.state.instructions}</p>
        <div className="d-flex justify-content-between recipe-details">
          <p>Ready in: <span className="time">{this.state.readyInMinutes} minutes</span></p>
          {button}
          <p>Servings: <span className="time">{this.state.servings}</span></p>
        </div>
        </div>
        <div className="making m-3 button-container">
          <h3>Similar Recipes</h3>
        {cards}
        </div>
        <div>
          <h4 className="title-review">Reviews</h4>
          <Review/>
          <ReviewForm/>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
    auth: state.auth
  }
}
export default connect(mapStateToProps, { getRecipeInfo, storeRecipe, getSimilarRecipe, getStoredRecipes, removeRecipe })(withRouter(Recipe))
