import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import SearchedResult from '../SearchedResult/SearchedResult';
import './SearchBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchedData } from '../../store/search/searchSlice';
import { useDetectClickOutside } from 'react-detect-click-outside';

function SearchBar (props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const showSearchResults = () => {
    setInputFocus(true);
  };

  const hideSearchResults = () => {
    searchTerm.length === 0 ? setInputFocus(false) : setInputFocus(true);
  };

  useEffect(() => {
    hideSearchResults()
  }, [searchTerm]);

  const searchedContent = useSelector(state => state.search)
  const dispatch = useDispatch()

  const handleChange = e => {
    setSearchTerm(e.target.value)
    dispatch(getSearchedData(`q=${searchTerm}`))
  }
  

  const closeSearchResult = () => {
    inputFocus === true && setInputFocus(false);
}

  const ref = useDetectClickOutside({ onTriggered: closeSearchResult });

  return (
    <div ref={ref}>
    <div className='search-bar'>
      <Icon icon='ant-design:search-outlined' className='search-icon' />
      <input
        onChange={handleChange}
        onClick={showSearchResults}
        value={searchTerm}
        type='search'
        placeholder='Search ReddLite'
        className='search-input'
      ></input>
      </div>
      {inputFocus === true ? <SearchedResult searchTerm={searchTerm} /> : null}
    </div>
  )
}

export default SearchBar
