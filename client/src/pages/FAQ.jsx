import React from 'react'
import FaqCollaspe from '../components/FaqCollaspe'

const FAQ = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
        <FaqCollaspe />
      </div>
    </div>
  )
}

export default FAQ
