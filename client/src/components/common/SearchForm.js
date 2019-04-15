import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({
  onChange,
  onSubmit,
  value
  }) => {
  return (
    <form className="form-inline my-2 my-lg-0 form" onSubmit={onSubmit}>
      <input
      className="form-control mr-sm-2 form-input landing-search"
      onChange={onChange}
      type="search"
      value={value}
      placeholder="Search"
      />
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    </form>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default SearchForm;
