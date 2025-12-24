import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books, onShowModal }) => { // Accept onShowModal as a prop
  return (
    <div className='p-4 overflow-x-auto'>
      <table className='w-full border-separate border-spacing-y-4'>
        <thead>
          <tr>
            <th className='p-4 text-slate-500 uppercase text-[10px] font-black tracking-widest text-center'>No</th>
            <th className='p-4 text-slate-500 uppercase text-[10px] font-black tracking-widest text-center'>Title</th>
            <th className='p-4 text-slate-500 uppercase text-[10px] font-black tracking-widest text-center max-md:hidden'>Author</th>
            <th className='p-4 text-slate-500 uppercase text-[10px] font-black tracking-widest text-center max-md:hidden'>Year</th>
            <th className='p-4 text-slate-500 uppercase text-[10px] font-black tracking-widest text-center'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='group'>
              <td className='glass p-4 rounded-l-[1.5rem] text-center font-bold text-slate-600'>{index + 1}</td>
              <td className='glass p-4 text-center font-black text-slate-800'>{book.title}</td>
              <td className='glass p-4 text-center text-slate-500 max-md:hidden'>{book.author}</td>
              <td className='glass p-4 text-center text-slate-500 max-md:hidden'>{book.publishYear}</td>
              <td className='glass p-4 rounded-r-[1.5rem] text-center'>
                <div className='flex justify-center gap-x-6'>
                  <BsInfoCircle 
                    className='text-2xl text-indigo-600 cursor-pointer hover:scale-125 transition-all' 
                    onClick={() => onShowModal(book)} // Calls the Home.jsx function
                  />
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-amber-500 hover:scale-125 transition-all' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-500 hover:scale-125 transition-all' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;