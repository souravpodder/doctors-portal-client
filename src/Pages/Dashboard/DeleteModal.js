import React from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({ removeDoctor, refetch, setRemoveDoctor }) => {
  const { name, email } = removeDoctor;
  const handleDelete = email => {
    fetch(`http://localhost:5000/doctor/${email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        toast('doctor deleted');
        setRemoveDoctor(null);
        refetch();
      })

  }
  return (
    <div>
      <input type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-red-700">Sure to delete {name} from the list?</h3>
          <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div class="modal-action">
            <button class="btn btn-sm btn-warning" onClick={() => handleDelete(email)}>Delete</button>
            <label for="delete-confirm-modal" class="btn btn-sm">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;