import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import UserRow from './UserRow';

const Users = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, refetch } = useQuery('users', () =>
    fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        if (res.status === 403 || res.status === 401) {
          navigate('/');
        }
        return res.json();
      }


      ))



  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <h3 className='text-3xl'>All users: {users.length}</h3>
      <div class="overflow-x-auto">
        <table class="table w-full">

          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map(user => <UserRow key={user._id} user={user} refetch={refetch}></UserRow>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;