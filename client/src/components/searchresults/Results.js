import React from 'react';
//React-redux connector
import { connect } from 'react-redux';
//Actions
import { getRecipeInfo } from '../../actions/recipeAction';
//Result Components
import Card from './Card';
import SearchFilter from './SearchFilter';
//css
import './css/results.css';
//Spinner For laoding
import Spinner from '../common/Spinner';

class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe) {
      this.setState({
        data: nextProps.recipe.data
      })
    }
  }

  render() {
    console.log(this.props.recipe.data);
    let results = '';
    if (this.props.recipe.data.length === 0) {
      results = <center style={{height: '100vh', marginTop: '20px'}}><Spinner/></center>
    } else {
      results = (
      <div>
        <SearchFilter/>
        <p className="lead text-muted found">Results: {this.state.data.length} recipes found</p>
        <div className="row">
        {this.state.data.map(recipe => <Card key={recipe.image} recipe={recipe}/>)}
        </div>
      </div>
      );
    }
    return(
      <div className="container-fluid results">

          {results}

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipe
  };
}

export default connect(mapStateToProps, { getRecipeInfo })(Results);
