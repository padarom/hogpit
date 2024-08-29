import * as React from 'react'
import Layout from '../components/Layout'
import Author from '../components/Author'
import Icon from '../components/Icon'
import PartsPostList from '../components/blog/PartsPostList'
import tw from 'twin.macro'
import { graphql } from 'gatsby'

const Header = tw.div`
  mt-0 mb-8 md:(mt-4 mb-24)
`

const Introduction = tw.div` 
  font-sans font-medium max-w-2xl leading-tight mb-20
  w-full text-3xl md:(w-3/4 text-4xl)
`

const IndexPage = ({ data }) => {
  const [useTabularLayout, setTabularLayout] = React.useState(false)

  return (
    <Layout>
      <Header>
        <Introduction>
          Welcome to my Hogpit project, where I try to document my journey
          of building an <span tw="font-black">A&#8209;10C</span> simulator&nbsp;pit.
        </Introduction>

        <div tw="flex justify-between items-center">
          <div tw="flex-shrink-0 w-full md:w-3/5 xl:w-1/2">
            <Author {...data.author} />
          </div>

          <div tw="text-xl md:block hidden">
            <Icon
              className="fa-solid fa-objects-column"
              tw="mr-4"
              active={useTabularLayout}
              onClick={ () => setTabularLayout(true) }
            />

            <Icon
              className="fa-solid fa-list-timeline"
              active={!useTabularLayout}
              onClick={ () => setTabularLayout(false) }
            />
          </div>
        </div>
      </Header>

      <PartsPostList
        css={{ marginTop: '100px'}}
        tabularLayout={useTabularLayout}
      />
    </Layout>
  )
}

export const query = graphql`{
  author: authorsYaml(featured: {eq: true}) {
    avatar
    bio
    slug
  }
}`

export default IndexPage
