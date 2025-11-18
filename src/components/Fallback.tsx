import loadingIcon from '../assets/load-icon-png-8.png';

const Fallback = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <img src={loadingIcon} alt="Loading..." className='animate-spin' width={50} height={50} />
    </div>
  )
}

export default Fallback;