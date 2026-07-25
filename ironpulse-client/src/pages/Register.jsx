import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Register = () => {
  const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    
    createUser(email, password)
      .then((result) => {
       
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log('User registered successfully:', result.user);
            form.reset();
            navigate('/'); 
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        console.log('Google Sign-In successful:', result.user);
        navigate('/');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 font-medium text-slate-950 rounded-lg transition-colors mt-6"
          >
            Register
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-700 w-full"></div>
            <span className="absolute bg-slate-900 px-3 text-xs text-slate-400 uppercase">Or continue with</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Google
          </button>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;