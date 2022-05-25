import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const imageStorageKey = 'dbbd0a8d381fd84bbdce6b986586a74a';

  const { data: services, isLoading } = useQuery('services', () => {
    return fetch('http://localhost:5000/services')
      .then(res => res.json())
  }
  )

  /* const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json())) */



  // console.log(services);

  const onSubmit = async data => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialization: data.specialization,
            img: img
          }
          console.log(doctor);

          fetch('http://localhost:5000/doctor', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(doctor)

          })
            .then(res => res.json())
            .then(inserted => {
              if (inserted.insertedId) {
                toast.success('Doctor Added Successfully');
                reset()
              } else {
                toast.error('Doctor not Added');
              }
            })
        }
        console.log(result);
      })
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <h3 className='text-2xl'>Add a Doctor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Name is required"
              }
            }
            )}
            type="text"
            placeholder="Doctor's Name"
            className="input input-bordered w-full max-w-xs" />
          <label className="label">
            {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required"
              }
            },
              {
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Enter a valid email'
                }
              })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs" />
          <label className="label">
            {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialization</span>
          </label>

          <select
            {...register('specialization')}
            class="select select-primary w-full max-w-xs">

            {
              services?.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
            }

          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Doctor's Photo</span>
          </label>
          <input
            {...register("image", {
              required: {
                value: true,
                message: "Image is required"
              }
            }
            )}
            type="file"
            placeholder="Doctor's Image"
            className="input input-bordered w-full max-w-xs" />
          <label className="label">
            {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
          </label>
        </div>
        <input className="btn w-full max-w-xs" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddDoctor;