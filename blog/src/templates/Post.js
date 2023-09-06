import React from 'react'
import Layout from '../components/Layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import FullBlogPost from '../components/FullBlogPost'
import tw from 'twin.macro'

const Title = tw.h1`
  text-5xl mx-auto font-serif font-bold max-w-2xl mb-16
`

const Content = tw.div`
  mx-auto max-w-2xl text-lg
`

const PageWrapper = tw.div`px-10`
const ImageWrapper = tw.div`mb-16`

// TODO: tw props do not work in this file. I assume it is because the file
//   is loaded using the gatsby-mdx loader and does therefore not get parsed
//   by twin.macro. I have not found a solution to this yet.

const Post = ({ data: { post }, children }) => {
  return (
    <Layout>
      <PageWrapper>
        <Title>{post.frontmatter.title}</Title>
        
        <ImageWrapper>
          <GatsbyImage image={getImage(post.frontmatter.heroImage)} />
        </ImageWrapper>

        <Content>
          <FullBlogPost post={post} children={children} />
        </Content>
      </PageWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
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
            gatsbyImageData(
              width: 1920,
              placeholder: BLURRED,
              formats: [AUTO, WEBP, JPG]
            )
          }
        }
      }
    }
  }
`

export default Post
