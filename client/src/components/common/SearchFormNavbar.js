import React from 'react';


const SearchFormNavbar = ({
  onChange,
  onSubmit,
  value
}) => {
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
      <input className="form-control mr-sm-2" type="search" onChange={onChange} placeholder="Search" value={value} aria-label="Search"/>
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    </form>
  );
}

export default SearchFormNavbar;
