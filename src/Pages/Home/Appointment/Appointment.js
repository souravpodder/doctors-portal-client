import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import PrimaryButton from '../../Shared/Navbar/PrimaryButton';
import appointment from '../../../assets/images/appointment.png';


const Appointment = () => {
  return (
    <section
      style={
        {
          background: `url(${appointment})`
        }
      }
      className='flex justify-center items-center px-20 py-10 lg:py-0 mt-[120px]'>
      <div className='flex-1 mt-[-180px] hidden lg:block h-full'>
        <img src={doctor} alt="doctor-img" />
      </div>
      <div className='flex-1'>
        <h3 className='text-xl font-bold text-secondary'>Appointment</h3>
        <h2 className='text-3xl my-5 text-white'>Make an appointment today</h2>
        <p className='my-5 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dignissimos numquam, nulla quia maiores temporibus nemo aliquam rerum inventore delectus ducimus aliquid ullam eaque! Iure architecto porro id, repellat ipsum reprehenderit consequatur cupiditate aperiam corporis explicabo aut sit voluptatibus repudiandae!</p>
        <PrimaryButton >Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default Appointment;