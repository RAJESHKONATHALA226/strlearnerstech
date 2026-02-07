import React from 'react'
import CardsGrid from './GridCard'

const Content = () => {
  return (
    <>
    <div className="contentSection1">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Explore Our Courses
      </h2>
    </div>

    <div className="contentSection">
      <CardsGrid />
    </div>
    </>
  )
}

export default Content
