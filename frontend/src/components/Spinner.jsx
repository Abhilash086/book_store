import React from 'react'

const Spinner = () => {
  return (
    // <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-500'></div>
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
    </div>
  )
}

export default Spinner