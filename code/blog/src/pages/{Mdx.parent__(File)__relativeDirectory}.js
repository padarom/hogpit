import * as React from 'react'
import Layout from '../components/Layout'
import tw from 'twin.macro'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import FullBlogPost from '../components/FullBlogPost'

const Title = tw.h1`
  text-5xl mx-auto font-serif font-bold max-w-2xl mb-16
`

const Content = tw.div`
  mx-auto max-w-2xl text-lg
`

const BlogPost = ({ data }) => {
  const hero = data.post.frontmatter.heroImage.childImageSharp.fluid

  return (
    <Layout>
      <div tw="px-10">
        <Title>{data.post.frontmatter.title}</Title>
        <Img tw="mb-16" fluid={hero} />

        <Content>
          <FullBlogPost post={data.post} />
        </Content>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    post: mdx(id: { eq: $id }) {
      parent {
        ... on File {
          relativeDirectory
        }
      }
      frontmatter {
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`

export default BlogPost
