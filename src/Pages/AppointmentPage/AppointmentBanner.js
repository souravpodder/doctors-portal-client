import React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <div className="hero min-h-screen">

      <div className="hero-content flex">
        <div className='shadow-lg'>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>

        <div>
          <img src={chair} className="max-w-sm rounded-lg shadow-2xl ml-10 lg:ml-20" alt='chair-image' />
        </div>

      </div>

    </div>

  );
};

export default AppointmentBanner;