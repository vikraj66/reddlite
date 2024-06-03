import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPopularPosts } from '../../../store/post/popularPostsSlice'
import DummyIcon from '../../../img/reddit-logo.svg'
import './PopularFeed.css'
import { getComments, postSliceActions } from '../../../store/post/postSlice'

const PopularFeed = () => {
  const popularPosts = useSelector(selectPopularPosts)
  const { data, loading, error } = popularPosts

  const dispatch = useDispatch()

  /*
      convertToK is the function using
      to check if a number is ready
      for converting
      to K form 
      Example: 16000 --> 16k
      Example: 5400 --> 5.4k
    */
  function convertToK(number) {
    if (number < 1000) {
      return number
    }
    let newNumber = number / 1000
    newNumber = newNumber.toFixed(1)
    let result = newNumber.toString()
    result += 'k'
    return result
  }

  /*
      Create img use for if the user icon does exist
      If yes pass it to the screen 
      If no passing a dummy one instead
  */
  function createImg(url) {
    if (url) {
      return <img src={url.icon_url} alt="icon" className="postIcon" />
    }
    return <img src={DummyIcon} alt="icon" className="postIcon" />
  }

  /*
      isNew checking existence of the post time
      If yes and it new pass it to the screen
      If no there're nothing happen
    */
  function isNew(post) {
    if (post) {
      if (post.is_new) {
        return <p>NEW!</p>
      }
    }
  }

  /*
      someUnwantedImg checking the existence of the thumbnail
      If yes and it new pass it to the screen
      If no there're nothing happen
    */
  function someUnwantedImg(img) {
    if (
      img === 'default' ||
      img === 'spoiler' ||
      img === 'self' ||
      img === 'nsfw' ||
      img === 'image'
    ) {
      return false
    }
    return true
  }

  function mouseOverColor() {}

  function mouseOutColor() {}

  const modalHandler = (post) => {
    dispatch(postSliceActions.updatePost(post))
    dispatch(getComments(post.data.permalink))
    dispatch(postSliceActions.toggleModal())
  }

  if (data) {
    return (
      <div className="popularFeed">
        {data.map((eachData) => {
          return (
            <div className="feed">
              <div className="voteSection">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 10V18H6V10H0L10 0L20 10H14ZM5 8H8V16H12V8H15L10 3L5 8Z"
                    fill="#878A8C"
                  />
                </svg>
                <p>{convertToK(eachData.data.score)}</p>
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 8L10 18L0 8H6V0H14V8H20ZM10 15L15 10H12V2H8V10H5L10 15Z"
                    fill="#878A8C"
                  />
                </svg>
              </div>
              <div
                className="postContent"
                onClick={() => modalHandler(eachData)}
              >
                <div className="postHeader">
                  <div className="leftPostHeader">
                    {createImg(eachData.data.all_awardings[0])}
                    <p className="username">{`r/${eachData.data.subreddit}`}</p>
                    <p className="subredditName">{`r/${eachData.data.author}`}</p>
                    {isNew(eachData.data.all_awardings[0])}
                  </div>
                </div>
                <div className="postBody">
                  <h3>{eachData.data.title}</h3>
                  {someUnwantedImg(eachData.data.thumbnail) && (
                    <img src={eachData.data.thumbnail} alt="thumbnail" />
                  )}
                  <div className="commentsBlock">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.9375 11.25C2.29103 11.25 1.67105 10.9932 1.21393 10.5361C0.756807 10.079 0.5 9.45897 0.5 8.8125V2.4375C0.5 1.79103 0.756807 1.17105 1.21393 0.713927C1.67105 0.256807 2.29103 0 2.9375 0H13.0625C13.3826 0 13.6996 0.0630478 13.9953 0.185544C14.291 0.308039 14.5597 0.487584 14.7861 0.713927C15.0124 0.94027 15.192 1.20898 15.3145 1.50471C15.437 1.80044 15.5 2.1174 15.5 2.4375V8.8125C15.5 9.1326 15.437 9.44956 15.3145 9.74529C15.192 10.041 15.0124 10.3097 14.7861 10.5361C14.5597 10.7624 14.291 10.942 13.9953 11.0645C13.6996 11.187 13.3826 11.25 13.0625 11.25H8.759L5 14.0625C4.86071 14.1667 4.69517 14.2302 4.52188 14.2457C4.3486 14.2612 4.17441 14.2282 4.01882 14.1504C3.86322 14.0725 3.73236 13.9529 3.64086 13.805C3.54937 13.657 3.50085 13.4865 3.50075 13.3125V11.25H2.93825H2.9375ZM8.3855 10.125H13.0625C13.4106 10.125 13.7444 9.98672 13.9906 9.74058C14.2367 9.49444 14.375 9.1606 14.375 8.8125V2.4375C14.375 2.0894 14.2367 1.75556 13.9906 1.50942C13.7444 1.26328 13.4106 1.125 13.0625 1.125H2.9375C2.5894 1.125 2.25556 1.26328 2.00942 1.50942C1.76328 1.75556 1.625 2.0894 1.625 2.4375V8.8125C1.625 9.537 2.213 10.125 2.9375 10.125H4.62425V12.9375L8.3855 10.125Z"
                        fill="#878A8C"
                      />
                    </svg>
                    <p>Comments: {convertToK(eachData.data.num_comments)}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PopularFeed
