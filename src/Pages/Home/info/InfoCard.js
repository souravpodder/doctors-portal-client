import React from 'react';

const InfoCard = ({ img, cardHeader, bgColor }) => {
  return (

    <div className={`card lg:card-side shadow-xl pl-5 pt-4 ${bgColor}`}>
      <figure><img src={img} alt="clock-icon" /></figure>
      <div className="card-body text-white">
        <h2 className="card-title">{cardHeader}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>

      </div>
    </div>


  );
};

export default InfoCard;