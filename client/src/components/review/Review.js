import React from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../actions/commentAction'
import './css/review.css'
import Comment from './Comment';
import correctRecipe from '../../helpers/correctRecipe';
import Spinner from '../common/Spinner';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      name: ''
    }
  }
  componentWillMount() {
    let { recipe } = this.props;
    this.props.getComments(recipe.recipe.id);
    let { comments } = this.props.comment
    let { user } = this.props.auth;
    this.setState({
      comments: comments.data,
      name: user.name
    })
  }

  componentWillReceiveProps(nextProps) {
    let newArray = nextProps.comment.comments.data;
    let currentArray = this.state.comments
    if (newArray && currentArray) {
      // Case - 1 - No comments
      if (currentArray.length === 0) {
        let { recipe } = this.props;
        this.props.getComments(recipe.recipe.id);
        let { comments } = this.props.comment
        let { user } = this.props.auth;
        this.setState({
          comments: comments.data,
          name: user.name
        })
      } else {
        //case - 2 - updating comments
        if (newArray[newArray.length - 1] && currentArray[currentArray.length - 1]) {
          if (newArray[newArray.length - 1].date !== currentArray[currentArray.length - 1].date) {
            let { recipe } = this.props;
            this.props.getComments(recipe.recipe.id);
            let { comments } = this.props.comment
            let { user } = this.props.auth;
            this.setState({
              comments: comments.data,
              name: user.name
            })
          }
        }
      }

    }
  }

  // console.log(1);
  // if (newArray && currentArray) {
  //   console.log(2);
  //   if (newArray.length !== 0) {
  //     console.log(3);
  //     if (newArray[newArray.length - 1] && currentArray[currentArray.length - 1]) {
  //       console.log(4);
  //       if (newArray[newArray.length - 1].date !== currentArray[currentArray.length - 1].date) {
  //         console.log(5);
  //         let { recipe } = this.props;
  //         this.props.getComments(recipe.recipe.id);
  //         let { comments } = this.props.comment
  //         let { user } = this.props.auth;
  //         this.setState({
  //           comments: comments.data,
  //           name: user.name
  //         })
  //       }
  //     }
  //   }
  // }

  // componentWillUpdate() {
  //   let { recipe } = this.props;
  //   this.props.getComments(recipe.recipe.id);
  // }
  //
  // componentDidMount() {
  //   let { recipe } = this.props;
  //   this.props.getComments(recipe.recipe.id);
  // }

  render() {
    let comments = <p className="lead text-muted" style={{fontSize: '15px'}}>No reviews yet</p>;
    let all_comments = this.state.comments;
    let recipe_id = this.props.recipe.recipe.id;
    let correctComments = correctRecipe(all_comments, recipe_id)
    if (correctComments) {
      if (correctComments.length !== 0) {
        comments = correctComments.map(comment => <Comment key={comment._id} comment={comment} />);
      }
    } else {
      comments = <Spinner/>
    }
    return(
      <div className="comments-box">
        {comments}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comment: state.comment,
    recipe: state.recipe,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getComments })(Review);
