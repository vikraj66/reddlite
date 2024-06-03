import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPopularPosts,
  filterDescendingMod,
} from '../../../store/post/popularPostsSlice'
import './PopularFilter.css'

// The selecting most voted ascending is not comleted

const PopularFilter = () => {
  const dispatch = useDispatch()

  const [country, setCountry] = useState('GLOBAL')

  const [toggleColorNewest, setToggleColorNewest] = useState(false)

  const [toggleColorMostVoted, setToggleColorMostVoted] = useState(true)

  useEffect(() => {
    dispatch(fetchPopularPosts(`.json?geo_filter=${country}`))
  }, [country])

  function getNewestPopularPosts() {
    //target.value represent country
    dispatch(fetchPopularPosts(`new/.json`))
  }

  function getMostVotedPopularPosts() {
    dispatch(fetchPopularPosts(`top/.json`))
  }

  function funcColorMostVoted() {
    if (toggleColorNewest) {
      return
    }
    setToggleColorNewest(true)
    setToggleColorMostVoted(false)
  }

  function funcColorNewest() {
    if (toggleColorMostVoted) {
      return
    }
    setToggleColorMostVoted(true)
    setToggleColorNewest(false)
  }

  const countryChangeHandler = ({ target }) => {
    setCountry(target.value)
    dispatch(fetchPopularPosts(`.json?geo_filter=${country}`))
  }

  return (
    <div className="popularFilter">
      <select name="placeOption" className='disabled-button' onChange={countryChangeHandler} disabled>
         <option value="GLOBAL">Global</option>
        {/*<option value="AR">Argentina</option>
        <option value="AU">Australia</option>
        <option value="BG">Bulgaria</option>
        <option value="CA">Canada</option>
        <option value="CL">Chile</option>
        <option value="HR">Croatia</option>
        <option value="CZ">Czech Republic</option>
        <option value="FI">Finland</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
        <option value="GR">Greece</option>
        <option value="HU">Hungary</option>
        <option value="IS">Iceland</option>
        <option value="IN">India</option>
        <option value="IE">Ireland</option>
        <option value="IT">Italy</option>
        <option value="JP">Japan</option>
        <option value="MY">Malaysia</option>
        <option value="MX">Mexico</option>
        <option value="NZ">New Zealand</option>
        <option value="PH">Philippines</option>
        <option value="PL">Poland</option>
        <option value="PT">Portugal</option>
        <option value="PR">Puerto Rico</option>
        <option value="RO">Romania</option>
        <option value="RS">Serbia</option>
        <option value="SG">Singapore</option>
        <option value="ES">Spain</option>
        <option value="SE">Sweden</option>
        <option value="TW">Taiwan</option>
        <option value="TH">Thailand</option>
        <option value="TR">Turkey</option>
        <option value="GB">United Kingdom</option> */}
      </select>

      <div
        className="newest hoverFilter"
        onClick={() => {
          getNewestPopularPosts()
          funcColorNewest()
        }}
        style={{ border: !toggleColorNewest ? '1px solid #1484D6' : 'none' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.965 6.521C17.988 6.347 18 6.173 18 6C18 3.622 15.857 1.712 13.479 2.036C12.786 0.802 11.466 0 10 0C8.534 0 7.214 0.802 6.521 2.036C4.138 1.712 2 3.622 2 6C2 6.173 2.012 6.347 2.035 6.521C0.802 7.214 0 8.535 0 10C0 11.465 0.802 12.786 2.035 13.479C2.01193 13.6517 2.00024 13.8258 2 14C2 16.378 4.138 18.284 6.521 17.964C7.214 19.198 8.534 20 10 20C11.466 20 12.786 19.198 13.479 17.964C15.857 18.284 18 16.378 18 14C18 13.827 17.988 13.653 17.965 13.479C19.198 12.786 20 11.465 20 10C20 8.535 19.198 7.214 17.965 6.521ZM16.523 11.924L15.421 12.217L15.855 13.27C15.95 13.5 16 13.753 16 14C16 15.103 15.103 16 14 16C13.753 16 13.501 15.95 13.27 15.855L12.216 15.421L11.923 16.523C11.8101 16.9468 11.5604 17.3215 11.2127 17.5888C10.8649 17.8561 10.4386 18.001 10 18.001C9.5614 18.001 9.13508 17.8561 8.78732 17.5888C8.43957 17.3215 8.18985 16.9468 8.077 16.523L7.784 15.421L6.73 15.855C6.49834 15.9501 6.25042 15.9994 6 16C4.897 16 4 15.103 4 14C4 13.753 4.05 13.5 4.145 13.27L4.579 12.217L3.477 11.924C3.05416 11.8097 2.68073 11.5594 2.41445 11.2116C2.14817 10.8638 2.00388 10.438 2.00388 10C2.00388 9.56199 2.14817 9.13618 2.41445 8.7884C2.68073 8.44063 3.05416 8.19026 3.477 8.076L4.579 7.783L4.145 6.73C4.04981 6.49836 4.00056 6.25043 4 6C4 4.897 4.897 4 6 4C6.247 4 6.499 4.05 6.73 4.145L7.784 4.579L8.077 3.477C8.18985 3.05316 8.43957 2.67848 8.78732 2.41121C9.13508 2.14393 9.5614 1.99903 10 1.99903C10.4386 1.99903 10.8649 2.14393 11.2127 2.41121C11.5604 2.67848 11.8101 3.05316 11.923 3.477L12.216 4.579L13.27 4.145C13.501 4.05 13.753 4 14 4C15.103 4 16 4.897 16 6C16 6.247 15.95 6.5 15.855 6.73L15.421 7.783L16.523 8.076C16.9458 8.19026 17.3193 8.44063 17.5856 8.7884C17.8518 9.13618 17.9961 9.56199 17.9961 10C17.9961 10.438 17.8518 10.8638 17.5856 11.2116C17.3193 11.5594 16.9458 11.8097 16.523 11.924V11.924Z"
            fill={toggleColorNewest ? '#878A8C' : '#1484D6'}
          />
        </svg>
        <h4 style={{ color: toggleColorNewest ? '#878A8C' : '#1484D6' }}>
          Newest
        </h4>
      </div>
      <div
        className="popular hoverFilter"
        onClick={() => {
          getMostVotedPopularPosts()
          funcColorMostVoted()
        }}
        style={{ border: !toggleColorMostVoted ? '2px solid #1484D6' : 'none' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1L19 8H14.01L14 19H6V8H1L10 1Z"
            stroke={toggleColorMostVoted ? '#878A8C' : '#1484D6'}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h4 style={{ color: toggleColorMostVoted ? '#878A8C' : '#1484D6' }}>
          Most voted
        </h4>
      </div>
    </div>
  )
}

export default PopularFilter
