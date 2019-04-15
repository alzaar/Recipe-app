import React from 'react';
import './css/landing.css';
import SearchForm from '../common/SearchForm';
//Actions
import { getRecipeByIngredients, addIngredients, clearIngredients } from '../../actions/recipeAction';
//REeact-redux connector
import { connect } from 'react-redux';
//React With router to redirect to a different page
import { withRouter } from 'react-router';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }
  componentDidMount() {
    document.getElementsByClassName('landing-search')[0].focus();
    this.props.clearIngredients()
  }
  handleOnChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.getRecipeByIngredients(this.state.searchValue);
    this.props.addIngredients(this.state.searchValue);
    this.props.history.push('/results');
  }

  render() {
    return (
      <div>
        <div className="bgimage">
          <div className="mygrid">
            <div className="title">
              Find Your Recipes
            </div>
            <SearchForm
              onChange={this.handleOnChange}
              onSubmit={this.handleOnSubmit}
              value={this.state.value}
              />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  }
}

export default connect(mapStateToProps, { getRecipeByIngredients, addIngredients, clearIngredients })(withRouter(Landing));
