import React from 'react'
import Loader from './Loader'

const Waiting = ({
  heading,
  body,
  text2,
  nextQuestion,
  loader,
  buttonText,
}: any) => {
  return (
    <div
      className="flex flex-column items-center justify-center m-4 bg-slate-300 text-dark"
      style={{
        border: '1px solid white',
        padding: 20,
      }}
    >
      {heading && (
        <h5 className="text-dark-50 text-xl leading-tight font-medium mb-3">
          {heading}
        </h5>
      )}
      {body && <p className="text-dark-50 text-base mb-4">{body}</p>}
      {text2 && <p className="text-dark-50 text-base mb-4">{text2}</p>}

      {loader ? (
        <Loader />
      ) : (
        <button
          onClick={nextQuestion}
          className="flex items-center justify-center bg-dark text-slate-50 font-bold p-4 rounded mt-4"
        >
          {buttonText ? buttonText : 'Refresh'}
        </button>
      )}
    </div>
  )
}

export default Waiting
