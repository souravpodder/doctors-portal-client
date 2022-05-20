import React from 'react';

const Review = ({ review }) => {
  const { img, description, location, reviewerName } = review;
  // console.log(review);
  return (

    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body">
        <p>{description}</p>
        <div className="flex items-center mt-6">
          <div className="avatar mr-5">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={img} alt='reviewer' />
            </div>
          </div>
          <div>
            <h3>{reviewerName}</h3>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Review;