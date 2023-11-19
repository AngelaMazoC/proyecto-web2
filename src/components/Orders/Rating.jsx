import React, { useContext, useEffect, useState } from 'react'

import { FaStar } from 'react-icons/fa';
import { authContext } from '../../context/AuthContext';

const Rating = ({ sendRating, item, user, userRatings }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isRating, setIsRating] = useState(null);


  useEffect(() => {
    ValidateRating();   
  }, [])

  const ValidateRating = () => {
    const comparacion = userRatings.some(data => data.productId === item.productId);
    const filterRating = userRatings.filter(value => value.productId === item.productId);
    setRating(filterRating);
    setIsRating(comparacion);
  }

  return (
    <div className='RatingContent'>
      {
        [...Array(5)].map((star, index) => {
          const currentRating = index + 1
          if (!isRating) {
            return (
              <label htmlFor="" key={index}>
                <FaStar
                  className='Star'
                  size={50}
                  color={currentRating <= hover ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => sendRating(currentRating, item.productId, user.uid)}
                />
              </label>
            )
          } else {
            return (
              <label key={index}>
                <FaStar
                  className='Star'
                  size={50}
                  color={currentRating <= rating.map(data => data.rating) ? "#ffc107" : "#e4e5e9"}
                />
              </label>
            )
          }
        })

      }
    </div>
  )
}

export default Rating