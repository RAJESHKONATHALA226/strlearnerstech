import React from 'react'

const Card = ({ title, desc, image }) => {
  return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden border-5 border-blue-50 hover:shadow-xl transition">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-fit"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}

export default Card
