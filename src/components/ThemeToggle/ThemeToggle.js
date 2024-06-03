import React, { useEffect, useState } from 'react'
import './ThemeToggle.css'
import { Icon } from '@iconify/react'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { styleActions } from '../../store/styleSlice'

function ThemeToggle () {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.style)

  const handleTheme = () => {
    theme === 'light'
      ? dispatch(styleActions.toggleTheme('dark'))
      : dispatch(styleActions.toggleTheme('light'))
  }

  return (
    <div onClick={handleTheme} className='theme-toggle'>
      <div className='day-mode'>
        <Icon icon='clarity:sun-solid' />
      </div>
      <div className='night-mode'>
        <Icon icon='akar-icons:moon-fill' />
      </div>
    </div>
  )
}

export default ThemeToggle
