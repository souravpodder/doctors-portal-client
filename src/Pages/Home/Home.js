import React from 'react';
import Footer from '../Shared/Footer';
import Appointment from './Appointment/Appointment';
import Banner from './Banner';
import Info from './info/Info';
import Reviews from './Reviews';
import Services from './Services/Services';

const Home = () => {
  return (
    <div>
      <Banner />
      <Info />
      <Services />
      <Appointment />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;