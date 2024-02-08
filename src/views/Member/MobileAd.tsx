import adIMG from '../../assets/UWsweaterAd.jpeg'
const MobileAd = () => {
  return (
    <div className='border border-red-600 rounded-lg flex flex-row overflow-hidden shadow-lg'>
      <img src={adIMG} className='w-24 m-2 object-cover' alt='Ad Image' />
      <div className='flex flex-col p-3'>
        <span className=' text-red-500 font-bold py-1 px-2 rounded-full mb-1'>
          Featured Now
        </span>
        <h2 className='font-bold mb-2'>UWBC Hoodies</h2>
        <p className='text-gray-700 mb-3 text-xl'>$50.00</p>
        <div className='mt-auto'>
          <a 
            className='bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300'
            href='https://badmintonclub.uwaterloo.ca/'
            target='_blank' rel="noreferrer"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default MobileAd