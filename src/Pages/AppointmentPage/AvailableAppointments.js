import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

const AvailableAppointments = ({ date }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState('');
  // console.log(treatment);

  const formattedDate = format(date, 'PP');
  //  fetch using react query 
  // function to solve reactquery fetch problem 
  const fetchData = async (formattedDate) => {
    try {
      const URL = `http://localhost:5000/available/?date=${formattedDate}`;
      const response = await fetch(URL).then(res => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetchData(formattedDate))

  if (isLoading) {
    return <Loading></Loading>;
  }

  // useEffect(() => {
  //   fetch(`http://localhost:5000/available/?date=${formattedDate}`)
  //     .then(res => res.json())
  //     .then(data => setServices(data))
  // }, [formattedDate])
  return (
    <div className='my-20'>
      <p className='text-center text-2xl text-secondary mb-5'>Available Appointments on {format(date, 'PP')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          services?.map(service => <Service key={service._id} service={service} setTreatment={setTreatment} />)
        }
      </div>

      {
        treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} date={date} refetch={refetch} />
      }
    </div>
  );
};

export default AvailableAppointments;