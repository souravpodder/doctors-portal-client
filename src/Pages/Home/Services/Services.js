import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
  const services = [
    {
      _id: 1,
      img: fluoride,
      title: 'Fluoride Treatment',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
    },
    {
      _id: 2,
      img: cavity,
      title: 'Cavity Filling',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
    },
    {
      _id: 3,
      img: whitening,
      title: 'Teeth Whitening',
      description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'
    }
  ]
  return (
    <div className='mt-28 w-11/12 m-auto'>
      <div className='text-center '>
        <h3 className='uppercase text-primary font-bold'>Our Services</h3>
        <h2 className='text-3xl'>Services We Provide</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4'>
        {
          services.map(service => <Service key={service._id} service={service} />)
        }
      </div>
    </div>
  );
};

export default Services;