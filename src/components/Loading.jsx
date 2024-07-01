import React from 'react'

const Loading = ({ load }) => {
  if(load)
  return (
    <div className='bg-black bg-opacity-20 flex-center flex-col fixed top-0 left-0 hw-screen z-50'>
      <div className="h-[70px] w-[70px] bg-white overflow-hidden rounded-2xl">
        <img src="/images/loader.gif" alt="..." className="img-contain" />
      </div>
      <div className="text-center font-bold text-xs text-green-400">Loading...</div>
    </div>
  )
}

export default Loading