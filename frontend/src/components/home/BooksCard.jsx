import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const BooksCard = ({ books, onShowModal }) => { 
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8'>
      {books.map((item, index) => (
        <div key={item.id} className='glass-card group relative overflow-hidden hover:-translate-y-3 transition-all duration-500 border-l-4 border-l-indigo-500'>
          <span className='absolute -right-6 -top-10 text-[12rem] font-black text-slate-200/20 pointer-events-none group-hover:text-indigo-200/30 transition-colors'>
            {index + 1}
          </span>
          <div className='relative z-10'>
            <div className='flex justify-between items-start mb-8'>
              <div className='bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg'>No. {index + 1}</div>
              <div className='bg-indigo-100/50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full'>Ref. {item.publishYear}</div>
            </div>
            <h2 className='text-3xl font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors'>{item.title}</h2>
            <div className='flex items-center gap-x-2 text-slate-400 mb-12'>
              <BiUserCircle className='text-lg' />
              <p className='font-bold text-sm tracking-tight'>Author: <span className='text-slate-600'>{item.author}</span></p>
            </div>
            <div className='flex justify-between items-center pt-6 border-t border-slate-200/50'>
              <div className='p-2 rounded-xl hover:bg-indigo-50 text-slate-300 hover:text-indigo-600 transition-all cursor-pointer'
                onClick={() => onShowModal(item)} 
              >
                <BiShow className='text-3xl' />
              </div>
              <div className='flex gap-3'>
                {/* CHANGED: item._id -> item.id */}
                <Link to={`/books/edit/${item.id}`}><AiOutlineEdit className='text-2xl text-amber-500 hover:scale-125 transition-all' /></Link>
                {/* CHANGED: item._id -> item.id */}
                <Link to={`/books/delete/${item.id}`}><MdOutlineDelete className='text-2xl text-red-500 hover:scale-125 transition-all' /></Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;