import React, { useState } from 'react'
import './BestCommunites.css'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSubbreditsList } from '../../../store/subreddits/subredditSlice'
import { changeModal, getData } from '../../../store/modal/modalSlice'
import ReactImageFallback from 'react-image-fallback'

const BestCommunites = () => {
  const openModal = (community) => {
    const args =
      community.kind === 't2'
        ? { type: 'user', title: community.data?.display_name_prefixed }
        : { type: 'community', title: community.data?.display_name_prefixed }

    dispatch(changeModal.updateInfo(community))
    dispatch(changeModal.toggleModal())
    dispatch(
      changeModal.updateIcon(
        community.data?.community_icon?.replace('&amp;', '&'),
      ),
    )
    dispatch(getData(args))
  }

  const dispatch = useDispatch()

  const { data, error, loading } = useSelector((state) => state.subreddits)
  const [more, setMore] = useState(false)

  useEffect(() => {
    dispatch(getSubbreditsList())
  }, [])
  const filterTopFiveCommunites = (data) => {
    let topFive = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].data.community_icon) topFive.push(data[i])
      if (topFive.length >= 5 && !more) break
    }
    return topFive
    // return topFive.map((item) => {
    //   return {
    //     community_icon: item.data?.community_icon?.replace('&amp;', '&'),
    //     display_name: item.data?.display_name_prefixed,
    //   }
    // })
  }

  const topFive = filterTopFiveCommunites(data)

  return (
    <div class="best-communities-container">
      <div class="best-communities-heading">Recommended communities</div>
      {topFive.map((community, index) => (
        <div class="best-community-wrapper">
          <div class="subreddit">
            <span class="index">{index + 1}</span>
            <div class="best-community">
              <div class="eclipse">
                <img
                  src={community.data?.community_icon?.replace('&amp;', '&')}
                />
              </div>

              <div class="thread">{community.data?.display_name_prefixed}</div>
            </div>
          </div>
          <button onClick={() => openModal(community)} class="btn">
            <Icon
              className="right-arrow"
              icon="ic:baseline-keyboard-arrow-right"
            />
          </button>
        </div>
      ))}
      <div class="button-wrapper">
        <button onClick={() => setMore((prev) => !prev)} class="btn">
          {more ? 'Hide' : 'More'}
        </button>
      </div>
    </div>
  )
}

export default BestCommunites
