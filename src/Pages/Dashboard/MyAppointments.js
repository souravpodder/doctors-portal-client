import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/booking?email=${user.email}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => {
          console.log('response', res);
          if (res.status === 403 || res.status === 401) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return res.json();
        })
        .then(data => {
          setMyAppointments(data)
        });
    }
  }, [user])
  return (
    <div>
      <h3>My Appointments</h3>
      <div class="overflow-x-auto">
        <table class="table w-full">

          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>

            {
              myAppointments.map((appointment, index) => <tr key={index}>
                <th>{index + 1}</th>
                <td>{appointment.name}</td>
                <td>{appointment.treatment}</td>
                <td>{appointment.bookingDate}</td>
                <td>{appointment.slot}</td>
                <td>
                  {(appointment.price && !appointment.paid) && <Link to={`/dashboard/payment/${appointment._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                  {(appointment.price && appointment.paid) && <>
                    <p><span className='text-success'>Paid</span></p>
                    <p>Transaction Id: {appointment.transanctionId}</p>
                  </>}
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;