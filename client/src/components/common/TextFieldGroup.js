import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


//Capitalize First Letter

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{capitalize(info)}</label>
        <div className="col-sm-10">
          <input
            onChange={onChange}
            type={type}
            name={name}
            className={classnames('form-control', {
              'is-invalid': error
            })}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            />
        {error && (<div className="invalid-feedback">{error}</div>)}
      </div>
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
}

TextFieldGroup.defaultProps = {
  text: 'text'
}

export default TextFieldGroup;
