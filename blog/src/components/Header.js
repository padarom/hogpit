import React, { useState } from 'react'
import Icon from './Icon'
import tw from 'twin.macro'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

const Container = tw.div`
  pt-16 pb-24 flex justify-between items-center
`

const LinkedLogo = tw(Link)`
  font-page-title text-4xl p-2 -m-2
`

const IconContainer = tw.div`
  text-2xl text-gray-500 dark:text-gray-300
`

export default function Header () {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <Container>
      <Helmet>
        <html lang="en" className={ darkMode ? 'dark' : '' } />
      </Helmet>

      <LinkedLogo to="/">
        <span>Hog</span>
        <span tw="text-gray-600 dark:text-gray-400">pit</span>
      </LinkedLogo>

      <IconContainer>
        <Icon
          active={darkMode}
          className="fa-solid fa-moon"
          onClick={ () => setDarkMode(!darkMode) }
        />
      </IconContainer>
    </Container>
  )
}
