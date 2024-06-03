import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './ModalPreview.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeModal } from '../../store/modal/modalSlice'
import ReactImageFallback from 'react-image-fallback'

const UserModal = () => {
  const dispatch = useDispatch()
  const { info, data, icon, loading } = useSelector((state) => state.modal)
  
  const categorical_data = data
    .filter((d) => d.kind === 't3')
    .map((item) => {
      // selftext
      // thumbnail
      // url_overridden_by_dest
      // is_video then use media.fallback_url or scrubber_media_url thumbnail

      // TYPE 1: selftext or url_overidden_by_dest
      // TYPE 2. is_video or thumbnail

      const updated_item = {
        title: item?.data.title,
        text: item?.data?.selftext, // or use selftext ( which is in markdown )
        thumbnail: item?.data?.thumbnail,
        url: item?.data?.url_overridden_by_dest,
        isVideo: item?.data?.is_video,
        videoLink: item?.data?.media?.scrubber_media_url,
        numComments: item?.data?.num_comments,
        upVoteRatio: item?.data?.upvote_ratio,
        // Post data: username and image who commented + comment for that post
        comments: item?.data,
        permalink: item?.data?.permalink,
      }

      return updated_item
    })

  const modalHandler = () => {
    dispatch(changeModal.updateIcon(''))
    dispatch(changeModal.toggleModal())
    dispatch(changeModal.data([]))
  }

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num < 900) {
      return num
    }
  }
  const imgFormats = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp|gif)$/i)

  return (
    <div class="modal">
      <div class="modal-content">
        {loading ?
          <>
            <div className="modal-head">
              <span class="close" onClick={modalHandler}>
                <Icon icon="eva:arrow-ios-back-fill" />
              </span>
              <p className="url-preview-skeleton">
              </p>
            </div>
            <div className="modal-body">
              <div className="name-and-photo">
                <div className='icon-skeleton'></div>
                <div className="karma-or-members-skeleton">
                  <div className='name-skeleton'></div>
                  <div className='second-info-skeleton'></div>
                </div>
              </div>
              <div className="user-content-filter">
                <button className="btn-filter">Posts</button>
                <button className="btn-filter btn-disabled">Comments</button>
              </div>
              {[...Array(6)].map(() =>
                <div className="posts-content-section">
                  <div className="text-only">
                    <div className="post-preview-left-skeleton">
                      <p className="p-preview-skeleton"></p>
                      <p className="p-preview-skeleton"></p>
                      <p className="p-preview-skeleton"></p>
                      <p className="p-preview-skeleton"></p>
                    </div>
                    <div className="post-preview-stats">
                      <div className="comments-amount">
                        <Icon
                          className="stats-icon"
                          icon="fluent:comment-24-regular"
                        />{' '}
                        Comments:
                      </div>
                      <div className="upvote-ratio">
                        <Icon
                          className="stats-icon"
                          icon="mdi:arrow-up-bold-outline"
                        />{' '}% upvoted
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </> :
          <>
            <div className="modal-head">
              <span class="close" onClick={modalHandler}>
                <Icon icon="eva:arrow-ios-back-fill" />
              </span>
              <p className="url-preview">
                /
                {info?.kind === 't2'
                  ? `u/${info?.data.name}`
                  : info?.data.display_name_prefixed}
              </p>
            </div>
            <div className="modal-body">
              <div className="name-and-photo">
                <ReactImageFallback
                  className="r-main-picture"
                  src={
                    icon
                      ? icon
                      : (info?.data.snoovatar_img?.trim() === ''
                        ? info?.data.icon_img
                        : info?.data.snoovatar_img)
                  }
                  fallbackImage="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"
                />
                <div className="karma-or-members">
                  <h2>
                    {info?.kind === 't2'
                      ? info?.data.name
                      : info?.data.display_name}
                  </h2>
                  <span>
                    {info?.kind === 't2'
                      ? numFormatter(
                        info?.data.link_karma + info?.data.comment_karma,
                      ) + ' Karma'
                      : numFormatter(info?.data.subscribers) + ' Members'}
                  </span>
                </div>
              </div>
              <div className="user-content-filter">
                <button className="btn-filter">Posts</button>
                <button className="btn-filter btn-disabled">Comments</button>
              </div>
              <div className="posts-content-section">
                {/* Fetch data from user/community posts here */}
                {categorical_data.map((item) => {
                  return (
                    <>
                      {item.url?.toString().match(imgFormats) || item.thumnail ? (
                        <div className="image-content">
                          <div className="post-preview-two-col">
                            <div className="post-preview-left">
                              <h3>{item.title}</h3>
                              {item.text && (
                                <p className="p-preview">{item.text}</p>
                              )}
                            </div>
                            <div className="photo-section">
                              {item.thumnail && (
                                <img src={item.thumbnail} alt="thumbnail" />
                              )}
                              <img src={item.url} alt="thumbnail" />
                              {item.is_video && item.videoLink}
                            </div>
                          </div>
                          <div className="post-preview-stats">
                            <div className="comments-amount">
                              <Icon icon="fluent:comment-24-regular" /> Comments:{' '}
                              {item?.numComments}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-only">
                          <div className="post-preview-left">
                            <h3>{item.title}</h3>
                            {item.text && <p className="p-preview">{item.text}</p>}
                            <a href={item.url}>
                              <p>{item.url}</p>
                            </a>
                            {item.is_video && item.videoLink}
                          </div>
                          <div className="post-preview-stats">
                            <div className="comments-amount">
                              <Icon
                                className="stats-icon"
                                icon="fluent:comment-24-regular"
                              />{' '}
                              Comments: {item?.numComments}
                            </div>
                            <div className="upvote-ratio">
                              <Icon
                                className="stats-icon"
                                icon="mdi:arrow-up-bold-outline"
                              />{' '}
                              {item?.upVoteRatio}% upvoted
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            </div>
          </>}
      </div>
    </div>
  )
}

export default UserModal
