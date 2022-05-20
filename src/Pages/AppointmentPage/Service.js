import React from 'react';

const Service = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <div className='text-center text-secondary text-xl'>
          <p>{name}</p>
        </div>
        <p>
          {
            slots.length ?
              <span>{slots[0]}</span> :
              <span className='text-red-600'>Try Another Date</span>
          }
        </p>
        <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
        <div className="card-actions justify-center">

          <label htmlFor="booking-modal"
            disabled={slots.length === 0}
            className="btn btn-secondary btn-sm text-white"
            onClick={() => setTreatment(service)}
          >Book Appointment</label>
        </div>
      </div>
    </div>
  );
};

export default Service;