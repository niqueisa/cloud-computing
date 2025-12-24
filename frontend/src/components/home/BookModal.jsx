import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4'
      onClick={onClose}
    >
      {/* Increased brightness (bg-white/90) and added shadow-2xl to make it pop */}
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full bg-white/90 backdrop-blur-xl rounded-[3rem] relative flex flex-col p-8 md:p-12 overflow-hidden border border-white shadow-2xl'
      >
        {/* Close Button with vibrant red */}
        <button
          className='absolute right-8 top-8 text-3xl text-red-500 cursor-pointer hover:rotate-90 transition-all duration-300 z-50'
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        
        {/* Aesthetic Watermark - Lightened for better visibility */}
        <PiBookOpenTextLight className='absolute -left-10 -bottom-10 text-[20rem] text-indigo-500/10 pointer-events-none' />

        <div className='flex justify-start items-center gap-x-4 mb-6 relative z-10'>
          <span className='bg-indigo-600 text-white px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200'>
            PUB. {book.publishYear}
          </span>
          <span className='text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]'>
            ID: {book._id.slice(-8)}
          </span>
        </div>

        {/* Title - Large and Bold */}
        <h1 className='text-5xl font-black text-slate-900 mb-2 tracking-tighter leading-tight relative z-10'>
          {book.title}
        </h1>

        <div className='flex items-center gap-x-3 mb-10 relative z-10'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100'>
            <BiUserCircle className='text-indigo-600 text-3xl' />
          </div>
          <h2 className='text-xl font-bold text-slate-600 tracking-tight italic'>by {book.author}</h2>
        </div>

        {/* Info Grid - Styled as mini glass cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10'>
          <div className='bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100'>
             <p className='text-[10px] font-black uppercase text-indigo-500 mb-2 tracking-widest'>Date Cataloged</p>
             <p className='text-sm font-bold text-slate-700'>{new Date(book.createdAt).toLocaleDateString()}</p>
          </div>
          <div className='bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100'>
             <p className='text-[10px] font-black uppercase text-indigo-500 mb-2 tracking-widest'>System Update</p>
             <p className='text-sm font-bold text-slate-700'>{new Date(book.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Footer Quote Area */}
        <div className='mt-10 p-8 rounded-[2.5rem] bg-slate-900 text-white relative z-10 shadow-xl'>
          <p className='text-slate-300 text-sm leading-relaxed italic font-medium'>
            "This record is a permanent part of the decentralized Book Archive. Managed and secured via cloud-native infrastructure."
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;