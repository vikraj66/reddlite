import React from 'react'
import PopularFeed from './PopularFeed/PopularFeed'
import PopularFilter from './PopularFilter/PopularFilter'

const PopularPosts = () => {
  return (
    <div className='popularPosts'>
        <PopularFilter />
        <PopularFeed />
    </div>
  )
}

export default PopularPosts