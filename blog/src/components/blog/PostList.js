import React from 'react'
import tw from 'twin.macro'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Container = tw.div`
  grid grid-cols-1 gap-12 pb-12
`

const styles = {
  title: tw`font-serif text-2xl font-bold mb-3`,
  excerpt: tw`mb-3`,
  subtext: tw`text-gray-400 font-bold text-sm`,
  container: ({ tabularLayout }) => [
    tabularLayout && tw`grid grid-cols-3 gap-x-10 gap-y-20`,
  ],
  post: ({ tabularLayout }) => [
    tabularLayout && tw`grid grid-cols-1`,
    !tabularLayout && tw`grid grid-cols-2 gap-20`,
  ],
  description: ({ index, tabularLayout }) => [
    tabularLayout && (index % 2 ? tw`pb-7 pt-4 border-gray-100 border-t -order-1` : tw`pt-7 pb-2 border-gray-100 border-b`),
    !tabularLayout && tw`py-10`,
  ],
}

export default function PostList ({ posts, tabularLayout }) {  
  const blogPosts = posts.map((node, i) => (
    <BlogPost index={i} tabularLayout={tabularLayout} node={node} key={node.id} />
  ))

  return (
    <Container css={styles.container({ tabularLayout })}>
      {blogPosts}
    </Container>
  )
}

function BlogPost ({ node, index, tabularLayout }) {
  const date = node.content.frontmatter.updated

  return (
    <Link to={`/${node.relativeDirectory}`} className="group" css={styles.post({ tabularLayout })}>
      <div tw="aspect-w-8 aspect-h-4 shadow-2xl">
        <GatsbyImage
          tw="w-full h-full object-center object-cover rounded-sm"
          image={getImage(node.content.frontmatter.heroImage)}
        />
      </div>
      
      <div css={styles.description({ tabularLayout, index })}>
        <h3 css={styles.title}>{node.content.frontmatter.title}</h3>
        <div css={styles.excerpt}>{node.content.excerpt}</div>
        <div css={styles.subtext}>
          {node.content.frontmatter.updated} &middot; {node.content.fields.timeToRead.minutes} min read
        </div>
      </div>
    </Link>
  )
}
