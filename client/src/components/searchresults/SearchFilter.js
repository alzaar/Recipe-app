import React from 'react';
import './css/searchfilter.css'
//Button comp to show ingredients
import Buttons from './Buttons';
//actions
import { getIngredients, addIngredients, getRecipeByIngredients } from '../../actions/recipeAction'
//Connector
import { connect } from 'react-redux';
//Validations
import isEmpty from '../../validation/is-empty';
//Helpers
import compare from '../../helpers/compare';
class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchArray: [],
      error: ''
    }
  }
  componentDidMount() {
    this.props.getIngredients();
    this.setState({
      searchArray: this.props.recipe.ingredients
    })
  }
  componentWillReceiveProps(nextProps) {
    let ingredients = nextProps.recipe.ingredients;

    if (compare(ingredients, this.state.searchArray)) {
      this.setState({
        searchArray: ingredients
      })
      console.log(ingredients, this.state.searchArray);
      ingredients = this.state.searchArray.join(',');
      this.props.getRecipeByIngredients(ingredients);
    }
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty(this.state.value)) {
      this.props.addIngredients(this.state.value);
    }
    this.setState({
      value: ''
    });
    let ingredients = this.state.searchArray.join(',');
    console.log('SearchFilter - onSubmit');
    this.props.getRecipeByIngredients(ingredients);
  }
  render() {
    return (
      <div className="search-box">
        <div className="buttons m-1">
          <Buttons/>
        </div>
        <form className="form-inline my-2 my-lg-0 search-input" onSubmit={this.handleOnSubmit}>
            <input className="form-control mr-sm-2 ingredient-input" size="40" type="search" name='value' placeholder="Filter Ingredients" value={this.state.value} onChange={this.handleOnChange} aria-label="Search"/>
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}
export default connect(mapStateToProps, { getIngredients, addIngredients, getRecipeByIngredients })(SearchFilter);
