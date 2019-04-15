import React from 'react';
import spinner from './spinner.gif';
class Spinner extends React.Component {
  render () {
    const style = {
      margin: 'auto',
      width: '200px',
      display: 'block'
    }
    return (
      <div>
        <img
          src={spinner}
          alt='Loading...'
          style={style}
          />
      </div>
    );
  }
}

export default Spinner;
