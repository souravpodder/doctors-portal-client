import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import DeleteModal from './DeleteModal';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
  const [removeDoctor, setRemoveDoctor] = useState(false);

  const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctors', {
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()))

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <h2 className="text-2xl">Manage Doctors : {doctors.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">

          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors?.map((doctor, index) => <DoctorRow
                setRemoveDoctor={setRemoveDoctor}
                key={doctor._id} doctor={doctor}
                index={index} refetch={refetch}></DoctorRow>)
            }

          </tbody>
        </table>
      </div>

      {removeDoctor && <DeleteModal removeDoctor={removeDoctor} refetch={refetch} setRemoveDoctor={setRemoveDoctor} ></DeleteModal>}
    </div>
  );
};

export default ManageDoctors;