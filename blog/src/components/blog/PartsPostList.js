import React from 'react'
import PostList from './PostList'
import { useStaticQuery, graphql } from 'gatsby'

export default function PartsPostList ({ tabularLayout }) {
  const { posts } = useStaticQuery(graphql`
    query PostQuery {
      posts: allFile(
        filter: {
          sourceInstanceName: {eq: "parts"},
          relativeDirectory: {regex: "/^(instruments|panels|frames)/"}
          name: {eq: "index"},
          extension: {in: ["md", "mdx"]}
        }
        sort: {childMdx: {frontmatter: {updated: DESC}}}
        limit: 9
      ) {
        ...PostListQuery
      }
    }
  `)
  
  return <PostList posts={posts.nodes} tabularLayout={tabularLayout} />
}
