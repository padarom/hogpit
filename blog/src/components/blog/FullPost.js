import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock, github } from 'react-code-blocks'
import { Disqus } from 'gatsby-plugin-disqus'
import tw from 'twin.macro'

const InlineCode = tw.code`
  text-gray-500 px-[2px] bg-gray-100
  dark:text-gray-400 dark:bg-gray-700
`

const components = {
  p: tw.p`
    mb-6
  `,
  a: tw.a`
    text-indigo-400 hover:underline
    dark:text-indigo-300
  `,
  code: ({ className, children }) => {
    if (!className) return <InlineCode>{children}</InlineCode>

    const language = className.replace('language-', '')
    
    return <CodeBlock
      text={children}
      language={language}
      theme={github}
    />
  },
}

export default function FullPost ({ post, children }) {
  const disqusConfig = {
    identifier: post.parent.relativeDirectory,
    title: post.frontmatter.title
  }

  return (
    <>
      <MDXProvider components={components}>
        {children}
      </MDXProvider>

      <hr tw="mt-10 mb-20" />

      <Disqus config={disqusConfig} />
    </>
  )
}
