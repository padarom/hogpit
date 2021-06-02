import React from 'react'
import Header from './Header'
import tw from 'twin.macro'
import { Global } from '@emotion/react'
import { GlobalStyles } from 'twin.macro'
import globalStyles from './styles'

const Container = tw.div`
  container mx-auto px-6 md:px-16 pb-28
`

export default function Layout ({ children }) {
  return (
    <Container>
      <GlobalStyles />
      <Global styles={globalStyles} />

      <Header />

      {children}
    </Container>
  )
}
