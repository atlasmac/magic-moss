import React from 'react'

const FAQ = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-center text-2xl font-robotoSlab font-bold'>Frequently Asked Questions</h1>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              What is cubic feet per second (cfs)?
            </div>
            <div className="collapse-content">
              <p>The measurement cubic foot per second (cfs or ft3/s) is the rate of water movement representing a volume of 1 cubic foot passing a given point during 1 second.</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              Focus me to see content
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              Focus me to see content
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              Focus me to see content
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              Focus me to see content
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
            <div className="collapse-title text-xl font-medium">
              Focus me to see content
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
