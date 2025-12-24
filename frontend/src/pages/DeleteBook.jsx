import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record Purged Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error purging record', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='relative min-h-screen px-4 py-8 md:px-16 flex flex-col items-center justify-center overflow-hidden'>
      {/* Aesthetic Background Blobs */}
      <div className='fixed top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse'></div>
      <div className='fixed bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10'></div>

      <div className='w-full max-w-xl relative z-10'>
        {/* Improved Back Button placement */}
        <div className='mb-8 ml-2'>
          <BackButton />
        </div>

        {loading && <Spinner />}

        <div className='glass-card border-t-8 border-red-500/50 p-12 text-center relative overflow-hidden'>
          {/* Subtle watermark for the delete page */}
          <div className='absolute -right-10 -bottom-10 text-[15rem] font-black text-red-500/5 pointer-events-none'>
            !
          </div>

          <div className='w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner'>
             <div className='w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center'>
                <span className='text-4xl font-black text-red-600'>!</span>
             </div>
          </div>

          <h1 className='text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight'>
            Remove <span className='text-red-600'>Entry?</span>
          </h1>
          
          <p className='text-slate-400 font-medium mb-12 max-w-sm mx-auto leading-relaxed'>
            You are about to permanently delete this record from the <span className='font-bold text-slate-600'>Archive Database</span>. This action cannot be undone.
          </p>

          <div className='flex flex-col gap-4 relative z-10'>
            <button
              className='w-full py-5 bg-red-600 hover:bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-red-200 transition-all duration-500 transform hover:scale-[1.02] active:scale-95 tracking-[0.2em] text-xs'
              onClick={handleDeleteBook}
            >
              PURGE RECORD
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className='py-4 text-slate-400 font-black text-[10px] tracking-[0.4em] uppercase hover:text-indigo-600 transition-colors'
            >
              Cancel and Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;