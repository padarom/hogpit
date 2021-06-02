import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { CodeBlock, github } from 'react-code-blocks'
import { Disqus } from 'gatsby-plugin-disqus'
import tw from 'twin.macro'

const components = {
  p: tw.p`
    mb-6
  `,
  a: tw.a`
    text-indigo-400 hover:underline
    dark:text-indigo-300
  `,
  code: ({ children, className }) => {
    const language = className.replace('language-', '')
    
    return <CodeBlock
      text={children}
      language={language}
      theme={github}
    />
  },
}

export default function FullBlogPost ({ post }) {
  const disqusConfig = {
    identifier: post.parent.relativeDirectory,
    title: post.frontmatter.title
  }
  
  return (
    <>
      <MDXProvider components={components}>
        <MDXRenderer>
          {post.body}
        </MDXRenderer>
      </MDXProvider>

      <hr tw="mt-10 mb-20" />

      <Disqus config={disqusConfig} />
    </>
  )
}
