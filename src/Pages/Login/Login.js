import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';


const Login = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  let loginError;
  let googleLoginError;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate])

  if (loading || googleLoading) {
    return <Loading />
  }




  if (error) {
    loginError = <small className='text-red-500 text-center'>{error?.message}</small>
  }

  if (googleError) {
    googleLoginError = <small className='text-red-500 text-center'>{googleError?.message}</small>
  }
  const onSubmit = data => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password)
  }
  return (
    <div className='flex  h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

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
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs" />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required"
                  }
                },
                  {
                    minLength: {
                      value: 1,
                      message: 'Password must be 6 characters or more'
                    }
                  })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs" />
              <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
              </label>
            </div>
            <input className="btn w-full max-w-xs" type="submit" value="Login" />
          </form>
          {loginError}
          <p className='text-center'><small>New to Doctor's Portal? <Link className='text-primary font-bold' to="/signup">create new account</Link></small></p>
          <div className="divider">OR</div>


          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-primary font-bold">Continue with Google</button>

          {googleLoginError}

        </div>
      </div>
    </div>
  );
};

export default Login;