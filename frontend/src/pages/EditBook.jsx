import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='relative min-h-screen px-4 py-8 md:px-16 flex flex-col items-center justify-center overflow-hidden'>
      {/* 1. Floating Aesthetic Blobs - Matching Home.jsx */}
      <div className='fixed top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10'></div>
      <div className='fixed bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10'></div>

      {/* 2. Main Container Area */}
      <div className='w-full max-w-2xl relative z-10'>
        <div className='mb-6'>
          <BackButton />
        </div>

        {loading && (
          <div className='absolute inset-0 flex justify-center items-center z-50 glass-card rounded-[3rem]'>
            <Spinner />
          </div>
        )}

        {/* 3. Glassmorphism Form Card */}
        <div className='glass-card relative overflow-hidden'>
          {/* Decorative corner accent */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-[5rem]'></div>

          <div className='mb-12 text-center relative z-10'>
            <h1 className='text-5xl font-black tracking-tighter text-slate-900 mb-2'>
              Edit <span className='text-indigo-600'>Entry</span>
            </h1>
            <p className='text-slate-400 font-medium tracking-wide uppercase text-[10px]'>
              Database Modification • ID: {id.slice(-6)}
            </p>
            <div className='h-1 w-12 bg-indigo-500 rounded-full mt-4 mx-auto' />
          </div>

          <div className='space-y-8 relative z-10'>
            <div className='group'>
              <label className='block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1'>
                Book Title
              </label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter book title...'
                className='w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-800 font-medium'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className='block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1'>
                  Author
                </label>
                <input
                  type='text'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder='Author name...'
                  className='w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-800 font-medium'
                />
              </div>
              <div>
                <label className='block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1'>
                  Publish Year
                </label>
                <input
                  type='number'
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder='YYYY'
                  className='w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-800 font-medium'
                />
              </div>
            </div>

            <button 
              className='w-full mt-10 py-5 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200/50 transition-all duration-500 transform hover:scale-[1.02] active:scale-95 tracking-widest text-sm flex justify-center items-center gap-2' 
              onClick={handleEditBook}
            >
              CONFIRM & UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBook