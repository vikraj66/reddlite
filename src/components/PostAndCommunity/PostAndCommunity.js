import React from 'react'
import Community from '../Community/Community';
import PopularPosts from '../PopularPosts/PopularPosts';
import './PostAndCommunity.css';

const PostAndCommunity = () => {
  return (
    <div className='postAndCommunity'>
        <PopularPosts />
        <Community />
    </div>
  )
}

export default PostAndCommunity