import React from 'react'

const Loader = () => {
  return (
    <div
      className="flex justify-center items-center mt-4"
      style={{
        background: '#414141',
        padding: 10,
        color: 'white',
      }}
    >
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <b className="ml-2">Please Wait</b>
    </div>
  )
}
export default Loader
