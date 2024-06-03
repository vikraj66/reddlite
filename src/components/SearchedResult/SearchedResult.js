import React, { useState } from 'react'
import ReactImageFallback from 'react-image-fallback'
import { useSelector, useDispatch } from 'react-redux'
import { changeModal, getData } from '../../store/modal/modalSlice'
import './SearchedResult.css'
import { Icon } from '@iconify/react'

const SkeletonResult = () => (
  <div className="search-results-container">
    <div className="search-result">
      <div className="img-skeleton"></div>
      <div className="content-skeleton">
        <div className="text-skeleton"></div>
        <div className="search-category">
          <div className="category-skeleton"></div>
        </div>
      </div>
    </div>
  </div>
)

const SearchedResult = (props) => {
  const [clickedData, setClickedData] = useState({})
  const { data, loading } = useSelector((state) => state.search)
  const searchTerm = props.searchTerm
  const dispatch = useDispatch()

  // Number formatter changes number to 'k' or 'm' accordingly
  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num < 900) {
      return num
    }
  }


  //We must pass type of content (user, post, community) and the user or id to display info
  const openModal = (info) => {
    const args =
      info.kind === 't2'
        ? { type: 'user', title: info.data.name }
        : { type: 'community', title: info.data.display_name_prefixed }

    if (info.kind === 't2') {
      const image =
        info.data.snoovatar_img?.trim() === ''
          ? info.data.icon_img
          : info.data.snoovatar_img
      dispatch(changeModal.updateIcon(image))
    } else {
      dispatch(changeModal.updateIcon(info.data.icon_img))
    }

    dispatch(changeModal.updateInfo(info))
    dispatch(changeModal.toggleModal())
    dispatch(getData(args))
  }

  const results = data?.map((d) => (
    <div className="search-results-container">
      {/* Checking if the search result is user type or community type */}
      {d.kind === 't2' ? (
        <div className="search-result search-user" onClick={() => openModal(d)}>
          {/* Image or Icon */}
          <ReactImageFallback
            src={
              d.data.snoovatar_img?.trim() === ''
                ? d.data.icon_img
                : d.data.snoovatar_img
            }
            fallbackImage="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"
          />
          <div className="search-content">
            {/* UserName */}
            u/{d.data.name}
            {/* Type of content */}
            <div className="search-category">
              <span>User</span>
              <Icon icon="akar-icons:circle-fill" className="circle-divider" />
              {/* Karma of content */}
              {numFormatter(d.data.link_karma + d.data.comment_karma)} Karma
            </div>
          </div>
        </div>
      ) : (
        <div
          className="search-result search-community"
          onClick={() => openModal(d)}
        >
          {/* Icon  of the community */}
          <ReactImageFallback
            src={d.data.icon_img}
            fallbackImage="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"
          />
          <div className="search-content">
            {/* Display name of the community */}
            {d.data.display_name_prefixed}
            <div className="search-category">
              <span>Community</span>
              <Icon icon="akar-icons:circle-fill" className="circle-divider" />
              {/* Subscriber or member count for the community */}
              {numFormatter(d.data.subscribers)}
            </div>
          </div>
        </div>
      )}
    </div>
  ))

  return (
    <div className="all-search-results">
      {searchTerm === '' && (
        <div className="search-hint">
          <h4>Hint: Fill in the field above...</h4>
          <div>
            <Icon icon="ant-design:search-outlined" className="hint-icon" />
          </div>
        </div>
      )}
      {(searchTerm.length > 0) & (searchTerm.length < 4) ? (
        <div className="search-hint">
          <h4>Try something more specific...</h4>
          <div>
            <Icon icon="ant-design:search-outlined" className="hint-icon" />
          </div>
        </div>
      ) : null}
      {loading || searchTerm.length < 4 ? [...Array(6)].map(() => <SkeletonResult />) : results}
    </div>
  )
}

export default SearchedResult
