import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import BookModal from '../components/home/BookModal'; // Import the Modal component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden px-4 py-8 md:px-12'>
      {/* Decorative Background Elements */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[120px] -z-10' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200/30 blur-[120px] -z-10' />

      {/* Header Section */}
      <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative z-10'>
        <div className='space-y-1'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-indigo-500'></span>
            </span>
            <span className='text-[10px] font-black text-indigo-600 uppercase tracking-widest'>System Live</span>
          </div>
          
          <h1 className='text-6xl font-black tracking-tighter text-slate-900 leading-none'>
            Book<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>Archive</span>
          </h1>
          <p className='text-slate-400 font-medium ml-1'>Curating your personal literary universe.</p>
        </div>
        
        {/* View Toggle */}
        <div className='glass p-1.5 rounded-2xl aesthetic-shadow flex gap-1 border border-white/50'>
          <button
            className={`${showType === 'table' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-white/50'} px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm`}
            onClick={() => setShowType('table')}
          >
            List View
          </button>
          <button
            className={`${showType === 'card' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-white/50'} px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm`}
            onClick={() => setShowType('card')}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className='glass rounded-[3rem] p-8 md:p-12 aesthetic-shadow relative overflow-hidden border border-white/60'>
        <div className='absolute inset-0 opacity-[0.03] pointer-events-none' 
             style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
        </div>

        <div className='flex justify-between items-center mb-10 relative z-10'>
          <div className='flex items-center gap-4'>
            <div className='w-1 h-10 bg-indigo-600 rounded-full' />
            <div>
              <h2 className='text-2xl font-black text-slate-800 tracking-tight'>Library Catalog</h2>
              <p className='text-slate-400 text-xs font-bold uppercase tracking-wider'>
                {books.length} Total Entries
              </p>
            </div>
          </div>
          
          <Link to='/books/create' className='group flex items-center gap-3 bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-200'>
            <MdOutlineAddBox className='text-2xl transition-transform group-hover:rotate-90' />
            <span className='font-bold tracking-tight'>Add New Book</span>
          </Link>
        </div>

        <div className='relative z-10'>
          {loading ? (
            <div className='py-20 flex justify-center'><Spinner /></div>
          ) : showType === 'table' ? (
            <div className='overflow-x-auto'>
              {/* Pass state function to trigger modal from Table */}
              <BooksTable 
                books={books} 
                onShowModal={(book) => { setSelectedBook(book); setShowModal(true); }} 
              />
            </div>
          ) : (
            /* Pass state function to trigger modal from Card */
            <BooksCard 
              books={books} 
              onShowModal={(book) => { setSelectedBook(book); setShowModal(true); }} 
            />
          )}
        </div>
      </div>

      {/* RENDER MODAL AT BOTTOM OF PAGE */}
      {showModal && (
        <BookModal book={selectedBook} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Home;