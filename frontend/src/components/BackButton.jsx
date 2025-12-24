import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='glass p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm'
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;