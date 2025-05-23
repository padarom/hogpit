import type { DocumentHeadProps } from '@builder.io/qwik-city'

export interface BlogMeta {
  excerpt: string
  readingTime: any
  released?: any
  updated?: any
  references: string[]
}

export interface BlogPost {
  title: string
  rendered: any
  slug: string
  meta: BlogMeta
}

const content = import.meta.glob('/../content/blog/**/*.mdx', { eager: true })

function mapContentToCollection(slug: string, content: DocumentHeadProps): BlogPost {
  const frontmatter = content.head.frontmatter

  return {
    title: content.head.title || '',
    frontmatter,
    slug,
    // @ts-ignore
    rendered: content.default().children,
    meta: {
      // @ts-ignore
      excerpt: content.excerpt,
      // @ts-ignore
      readingTime: content.readingTime,
      references: (frontmatter.references as string[] | null) || [],
      // @ts-ignore
      released: (frontmatter.released && new Date(frontmatter.released)) as Date | null,
      // @ts-ignore
      updated: (frontmatter.updated && new Date(frontmatter.updated)) as Date | null,
    },
  }
}

export const blogPostsCollection = Object.keys(content).reduce<Record<string, BlogPost>>((collection, path) => {
  const slug = path.split('/').slice(-2)[0]
  collection[slug] = mapContentToCollection(slug, content[path])

  return collection
}, {})
