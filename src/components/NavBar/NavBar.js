import { useEffect } from 'react'
import logo from '../../img/logo.svg'
import logoWhite from '../../img/logo-white.svg';
import SearchBar from '../SearchBar/SearchBar'
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux'
import { getHomeData } from '../../store/home/homeSlice'

import { getPostData } from '../../store/post/postSlice'
import { getCommunityData } from '../../store/community/communitySlice'
import { getUserData } from '../../store/user/userSlice'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

function NavBar (props) {
  const homeData = useSelector(state => state.home);
  const { pending, loading, data } = homeData;
  const dispatch = useDispatch();
  const currTheme = props.theme;

  // using useEffect to fetch Home data by dispatching action getHomeData()
  useEffect(() => {
    dispatch(getHomeData())
  }, [dispatch, getHomeData])

  // Fetching community data just to test
  const community = useSelector(state => state.community)
  useEffect(() => {
    dispatch(getCommunityData('Cricket'))
  }, [dispatch, getCommunityData])

  // Fetching community data just to test
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getUserData('CricketMatchBot'))
  }, [dispatch, getUserData])

  return (
    <div className='nav-bar'>
      <div className='logo'>
        <img src={currTheme === 'light' ? logo : logoWhite} alt='reddlite logo' />
      </div>
      <div className="desktop-bar">
        <SearchBar />
      </div>
      
      <ThemeToggle />
    </div>
  )
}

export default NavBar
