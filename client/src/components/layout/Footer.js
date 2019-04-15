import React from 'react';
import './css/footer.css';
export default () => {
  return (
    <div className="container-fluid d-flex justify-content-center footer">
      <div>Copyright &copy; {new Date().getFullYear()}</div>
    </div>
  )
}
