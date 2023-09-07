import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import PostList from '../components/blog/PostList'
import tw from 'twin.macro'

const Title = tw.h1`text-5xl font-sans`
const Subtitle = tw.h1`text-xl mb-10 text-slate-400 font-sans`

const Titles = {
  posts: { title: 'Posts', subtitle: 'All blog posts I have written' },
  parts: { title: 'Parts', subtitle: 'Part descriptions' },
}

const CollectionList = ({ data: { posts }, pageContext }) => {

  return (
    <Layout>
      <Title>{Titles[pageContext.collection].title}</Title>
      <Subtitle>{Titles[pageContext.collection].subtitle}</Subtitle>
      
      <PostList posts={posts.nodes} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($collection: String!, $limit: Int!, $skip: Int!) {
    posts: allFile(
      limit: $limit,
      skip: $skip,
      filter: {sourceInstanceName: {eq: $collection}, name: {eq: "index"}, extension: {in: ["md", "mdx"]}}
      sort: {childMdx: {frontmatter: {updated: DESC}}}
    ) {
      ...PostListQuery
    }
  }
`

export default CollectionList
