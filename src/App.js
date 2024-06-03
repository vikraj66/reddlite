/*
  #BIG NOTE: I want to add some change in how the component arrange themselves:
  - I put the BestCommunites component into a larger component called Community
  - I combine the two component Community and PopularPosts in newly created component called PostAndCommunity
*/

import logo from './logo.svg'
import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import Trending from './components/Trending/Trending'
import PostAndCommunity from './components/PostAndCommunity/PostAndCommunity'
import SearchBar from './components/SearchBar/SearchBar'
import './responsive.css'
import PostModal from './components/ModalPreview/PostModal'
import UserModal from './components/ModalPreview/UserModal'

function App () {
  // fetching theme state from redux-store

  const style = useSelector(state => state.style);
  const userModalState = useSelector(state => state.modal);
  const postModalState = useSelector(state => state.post)
  const [currentUserModal, setCurrentUserModal] = useState(false);
  const [currentPostModal, setCurrentPostModal] = useState(false);
  const [theme, setTheme] = useState('');

  // here we are accessing the style property of state
  // To set the style of theme we can dispatch change action at toggleTheme component
  useEffect(() => {
    setTheme(style.theme)
  }, [style])

  useEffect(() => {
    setCurrentUserModal(userModalState.showUserModal) 
  }, [userModalState])

  useEffect(()=> {
    setCurrentPostModal(postModalState.showPostModal)
  }, [postModalState])

  return (
    <div className='App' id={theme}>
      <NavBar theme={theme} />
      <div className='app-body'>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <Trending />
        <div className='body-content'>
        <h2>Popular posts</h2>
        <PostAndCommunity />
        {currentUserModal && <UserModal />}
        {/* modal post preview */}
        {currentPostModal && <PostModal />}
        </div>
      </div>
    </div>
  )
}

export default App
