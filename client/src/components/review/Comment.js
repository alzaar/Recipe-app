import React from 'react';
import './css/comment.css';
import Moment from 'react-moment';

const Comment = (props) => {

  return (
    <div className="comment">
      <p className="name">{props.comment.name} - <span className="date"><Moment format="MMM Do YY">{props.comment.date}</Moment></span></p>
      <p className="text">{props.comment.text}</p>
    </div>
  );
}


export default Comment;
