import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, date, setTreatment }) => {
  const { _id, name, slots } = treatment;
  const bookingDate = format(date, 'PP');
  const [user, loading] = useAuthState(auth);
  const handleBooking = event => {
    event.preventDefault();
    const slot = event.target.slot.value;
    console.log(_id, name, slot);

    const bookingInfo = {
      treatmentId: _id,
      treatment: name,
      bookingDate: bookingDate,
      slot,
      name: user.displayName,
      patientEmail: user.email,
      phone: event.target.phone.value

    }
    fetch('http://localhost:5000/booking', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          toast(`Appointment is set on, ${bookingDate} at ${slot}`);
        } else {
          toast.error(`Appointment is already set on, ${data.booking?.bookingDate} at ${data.booking?.slot}`);
        }
        // close the modal 
        setTreatment('')
      })



  }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className='text-secondary'>Book for: {name}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 justify-items-center">
            <input type="text" value={format(date, 'PP')} disabled className="input input-bordered w-full max-w-xs" />
            <select className="select select-bordered w-full max-w-xs" name='slot'>

              {
                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
              }


            </select>
            <input type="text" disabled value={user?.displayName} className="input input-bordered w-full max-w-xs" name='name' />
            <input type="email" name='email' disabled value={user?.email} className="input input-bordered w-full max-w-xs" />
            <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
            <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
          </form>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;