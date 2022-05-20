import React from 'react';
import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import Review from './Review';

const Reviews = () => {

  const reviews = [
    {
      _id: 1,
      reviewerName: 'Winson Herry',
      location: 'California',
      img: people1,
      description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    },
    {
      _id: 2,
      reviewerName: 'Lucia Johns',
      location: 'California',
      img: people2,
      description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    },
    {
      _id: 3,
      reviewerName: 'Winson Herry',
      location: 'California',
      img: people3,
      description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    }

  ]
  return (
    <section className='px-5 lg:px-20 my-32'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-primary font-bold'>Testimonial</h3>
          <h1 className='text-3xl'>What our Patients Say</h1>
        </div>
        <img className=' w-24 lg:w-48' src={quote} alt="" />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-5'>
        {
          reviews.map(review => <Review key={review._id} review={review} />)
        }
      </div>
    </section>
  );
};

export default Reviews;