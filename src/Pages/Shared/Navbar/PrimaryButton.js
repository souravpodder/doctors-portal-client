import React from 'react';

const PrimaryButton = ({ children }) => {
  return (

    <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary   font-bold text-white uppercase">{children}</button>

  );
};

export default PrimaryButton;