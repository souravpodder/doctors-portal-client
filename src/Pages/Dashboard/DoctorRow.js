import React, { useState } from 'react';

const DoctorRow = ({ doctor, index, refetch, setRemoveDoctor }) => {
  const { name, email, img, specialization } = doctor;

  return (
    <tr>
      <th>{index + 1}</th>
      <td><div class="avatar">
        <div class="w-20 rounded">
          <img src={img} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div></td>
      <td>{name}</td>
      <td>{specialization}</td>
      <td>
        <label for="delete-confirm-modal" class="btn btn-sm btn-error" onClick={() => setRemoveDoctor(doctor)}>Remove</label>
      </td>
    </tr>
  );
};

export default DoctorRow;