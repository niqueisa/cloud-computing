import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
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
    <div className='min-h-screen bg-slate-50 flex flex-col items-center p-8'>
      <div className='w-full max-w-2xl'>
        <BackButton />
        <div className='bg-white mt-6 rounded-[2rem] p-10 shadow-xl shadow-slate-200 border border-white'>
          <div className='mb-10 text-center'>
            <h1 className='text-3xl font-black text-slate-800 mb-2'>Create New Entry</h1>
            <p className='text-slate-400'>Fill in the details below to add a book to the vault</p>
          </div>

          <div className='space-y-6'>
            <div className='group'>
              <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Title</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter book title...'
                className='w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 placeholder:text-slate-300'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Author</label>
                <input
                  type='text'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder='Author name...'
                  className='w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 placeholder:text-slate-300'
                />
              </div>
              <div>
                <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Publish Year</label>
                <input
                  type='number'
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder='YYYY'
                  className='w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 placeholder:text-slate-300'
                />
              </div>
            </div>

            <button 
              className='w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]' 
              onClick={handleSaveBook}
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooks