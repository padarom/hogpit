import * as React from 'react'
import Layout from '../components/Layout'
import Author from '../components/Author'
import Icon from '../components/Icon'
import BlogPosts from '../components/BlogPosts'
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
  const [useTabularLayout, setTabularLayout] = React.useState(true)

  return (
    <Layout>
      <Header>
        <Introduction>
          Welcome to my Hogpit project, where I try to document my journey
          of building an <span tw="font-black">A&#8209;10C</span> simulator&nbsp;pit.
        </Introduction>

        <div tw="rounded-md bg-yellow-50 p-4 mb-20 -mt-5">
          <div tw="flex">
            <div tw="flex-shrink-0">
              <Icon 
                className="fa-solid fa-exclamation-triangle"
                tw="h-5 w-5 p-0 text-yellow-400"
              />
            </div>
            <div tw="ml-3">
              <h3 tw="text-sm font-medium text-yellow-800">Keep in mind</h3>
              <div tw="mt-2 text-sm text-yellow-700">
                <p>
                  This page itself is currently still very much a work in progress.
                  I will be working on finishing the code for the site before adding
                  any real content to it, so do not expect a lot of content at the moment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div tw="flex justify-between items-center">
          <div tw="flex-shrink-0 w-full md:w-3/5 xl:w-1/2">
            <Author {...data.author} />
          </div>

          <div tw="text-xl md:block hidden">
            <Icon
              className="fa-solid fa-objects-column"
              tw="mr-4"
              active={!useTabularLayout}
              onClick={ () => setTabularLayout(false) }
            />

            <Icon
              className="fa-solid fa-list-timeline"
              active={useTabularLayout}
              onClick={ () => setTabularLayout(true) }
            />
          </div>
        </div>
      </Header>

      <BlogPosts
        css={{ marginTop: '100px'}}
        data={data}
        tabularLayout={useTabularLayout}
      />
    </Layout>
  )
}

export const query = graphql`
{
  # Load the last 6 posts
  posts: allFile(
    filter: {
      sourceInstanceName: { eq: "parts" },
      name: { eq: "README" },
      extension: { in: ["md", "mdx"] }
    },
    sort: { fields: changeTime, order: DESC }
  ) {
    nodes {
      relativeDirectory
      changeTime(formatString: "MMMM Do, YYYY")
      content: childMdx {
        excerpt
        slug
        timeToRead
        frontmatter {
          title
        }
      }
    }
  }

  # Load the default author data (me!)
  author: authorsYaml(featured: { eq: true }) {
    avatar
    bio
    slug
  }
}
`

export default IndexPage
