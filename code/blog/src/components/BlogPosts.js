import React from 'react'
import tw from 'twin.macro'
import { Link } from 'gatsby'

const Container = tw.div`
  grid grid-cols-1 gap-12 pb-12
`

const styles = {
  title: tw`font-serif text-xl font-bold mb-3`,
  excerpt: tw`mb-3`,
  subtext: tw`text-gray-300 font-bold`,
}

export default function BlogPosts ({ data, tabularLayout }) {
  const posts = data.posts.nodes.map((node) => <BlogPost node={node} key={node.relativeDirectory} />)

  return (
    <Container>
      {posts}
    </Container>
  )
}

function BlogPost ({ node }) {
  return (
    <Link to={`/${node.relativeDirectory}`} className="group" tw="flex">
      <div tw="w-1/2 aspect-w-8 aspect-h-4 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1622405632591-9cb4a647f189?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt={node.content.frontmatter.title}
        />
      </div>
      <div tw="w-1/2 pl-20 py-10">
        <h3 css={styles.title}>{node.content.frontmatter.title}</h3>
        <div css={styles.excerpt}>{node.content.excerpt}</div>
        <div css={styles.subtext}>
          {node.changeTime} &middot; {node.content.timeToRead} min read
        </div>
      </div>
    </Link>
  )
}
