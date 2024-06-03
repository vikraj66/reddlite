import React from 'react'
import BestCommunites from './BestCommunites/BestCommunites'
import PopularCommunities from './PopularCommunities/PopularCommunities'

const Community = () => {
  return (
    <div className='community'>
        <BestCommunites />
        <PopularCommunities />
    </div>
  )
}

export default Community