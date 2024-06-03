import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react'
import './ModalPreview.css'
import { postSliceActions } from '../../store/post/postSlice'
import ReactImageFallback from 'react-image-fallback'

function PostModal() {
  const { post, comments, loading } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const changeModal = postSliceActions.toggleModal()

  const modalHandler = () => {
    dispatch(changeModal)
    dispatch(changeModal.comments([]))
  }

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

  const commentsData = comments.map(({ data }) => ({
    author: data?.author,
    body: data?.body,
    body_html: data?.body_html,
    created: data?.created,
    utc: data?.created_utc,
    up: data?.up,
    score: data?.score,
    name: data?.subreddit_name_prefixed,
  }))

  return (
    <div class="modal">
      <div class="modal-content">
        {loading ?
          <>
            <div className="modal-head">
              <span class="close" onClick={modalHandler}>
                <Icon icon="eva:arrow-ios-back-fill" />
              </span>
              <p className="url-preview-skeleton"></p>
            </div>
            <div className="modal-body">
              <div className="main-post">
                <h3 className='p-preview-skeleton'></h3>
                <h3 className='p-preview-skeleton'></h3>
                <h3 className='p-preview-skeleton'></h3>
              </div>
              <div className="post-preview-stats">
                <div className="comments-amount">
                  <Icon className="stats-icon" icon="fluent:comment-24-regular" />{' '}
                  Comments:
                </div>
                <div className="upvote-ratio">
                  <Icon className="stats-icon" icon="mdi:arrow-up-bold-outline" />{' '}
                  % upvoted
                </div>
              </div>
              {[...Array(6)].map(() =>
              <div className="comments-content-section">
                    <div className="post-comment">
                      <div className="comment-head">
                        <></>
                        <p className="url-preview-skeleton"></p>
                        <p className="url-preview-skeleton"></p>
                      </div>
                      <div className="comment-body">
                      <h3 className='p-preview-skeleton'></h3>
                <h3 className='p-preview-skeleton'></h3>
                <h3 className='p-preview-skeleton'></h3>
                      </div>
                    </div>
              </div>)}
            </div>
          </>
          :

          <>
            <div className="modal-head">
              <span class="close" onClick={modalHandler}>
                <Icon icon="eva:arrow-ios-back-fill" />
              </span>
              {/* <div className="author-photo-post">
        <ReactImageFallback
            className="r-main-picture"
            src={
              post?.data?.snoovatar_img?.trim() === ''
                ? post?.data?.icon_img
                : post?.data?.snoovatar_img
            }
            fallbackImage="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"
          />
        </div> */}
              <p className="url-preview">/{`u/${post?.data?.author}`}</p>
            </div>
            <div className="modal-body">
              <div className="main-post">
                <h3>{post?.data?.title}</h3>
                <div className="thumbnail">
                  {someUnwantedImg(post?.data?.thumbnail) && (
                    <img src={post.data?.thumbnail} alt="thumbnail" />
                  )}
                </div>
              </div>
              <div className="post-preview-stats">
                <div className="comments-amount">
                  <Icon className="stats-icon" icon="fluent:comment-24-regular" />{' '}
                  Comments: {post.data?.num_comments}
                </div>
                <div className="upvote-ratio">
                  <Icon className="stats-icon" icon="mdi:arrow-up-bold-outline" />{' '}
                  {post.data?.upvote_ratio}% upvoted
                </div>
              </div>
              <div className="comments-content-section">
                {/* Fetch data from user/community posts here */}
                {commentsData.map((item) => {
                  return (
                    <div className="post-comment" key={item.created}>
                      <div className="comment-head">
                        <></>
                        <p>{`/u/${item.author}`}</p>
                        <span>
                          {new Date(item.created * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="comment-body">
                        <h3>{item.body}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

/* <h1>{post.data?.title}</h1>
            {commentsData.map((item) => {
            return (
              <ul key={item.created}>
                <li>{item.author}</li>
                <li>{item.body}</li>
                <li>{new Date(item.created).toLocaleDateString()}</li>
              </ul>
            )
          })} */

export default PostModal
