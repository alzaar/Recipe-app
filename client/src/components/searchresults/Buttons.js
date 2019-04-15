import React from 'react';

//Connector to redux state
import { connect } from 'react-redux';
//Get actions
import { deleteIngredient } from '../../actions/recipeAction';
class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
  }
  deleteIngredient = (e, ingredient) => {
    this.props.deleteIngredient(ingredient);
  }
  componentDidMount() {
    this.setState({
      ingredients: this.props.recipe.ingredients
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ingredients: nextProps.recipe.ingredients
    })
  }
  render() {
    let buttons = '';
    if (this.props.recipe.ingredients.length !== 0) {
      buttons = this.state.ingredients.map(ingredient =>
        <button key={ingredient} id={ingredient} onClick={((e) => this.deleteIngredient(e, ingredient))}
        className="btn btn-sm btn-dark m-1">{ingredient} <i className="fas fa-times-circle"></i></button>)
    }
    return(
      <div>
        {buttons}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}

export default connect(mapStateToProps, { deleteIngredient })(Buttons);
