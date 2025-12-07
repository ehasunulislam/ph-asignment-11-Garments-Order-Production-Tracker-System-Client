import React, { useState } from 'react'

const AllProductsCard = ({ images, productName, description, category, price, createdBy }) => {
      const [hover, setHover] = useState(false);
      const image0 = Array.isArray(images) ? images[0] : images;
      const image1 = Array.isArray(images) && images[1] ? images[1] : image0;
      const shortDescription = description.split(" ").slice(0, 10).join(" ") + "...";
  return (
     <section>
      <div className="card bg-base-100 w-50 md:w-60 lg:w-89 shadow-sm border border-gray-200">
        <figure
          className="relative h-30 md:h-48 overflow-hidden rounded-t-xl pt-4"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* First Image */}
          <img
            src={image0}
            alt={productName}
            className={`absolute w-30 md:w-50 object-top transition-opacity duration-500 ${
              hover ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Second Image (hover image) */}
          <img
            src={image1}
            alt={productName}
            className={`absolute w-30 md:w-50 object-top transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mx-auto">{productName}</h2>
          <p className="text-justify text-[0.8rem]">{shortDescription}</p>
          <div className="card-actions">
            <section className="flex gap-3 justify-between items-center">
              <p><span className="text-gray-600">category:</span> {category}</p>
              <p><span className="text-gray-600">price: </span> {price}$</p>
            </section>

            <p>Manager: {createdBy}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllProductsCard