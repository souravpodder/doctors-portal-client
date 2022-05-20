import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';



const info = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 py-10'>
      <InfoCard img={clock} cardHeader="Opening Hours" bgColor="bg-gradient-to-r from-secondary to-primary" />
      <InfoCard img={marker} cardHeader="Visit our location" bgColor="bg-accent" />
      <InfoCard img={phone} cardHeader="Contact Us Now" bgColor="bg-gradient-to-r from-secondary to-primary" />
    </div>
  );
};

export default info;