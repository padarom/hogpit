import type { DocumentHeadProps } from '@builder.io/qwik-city'

export type PartPost = any

const content = import.meta.glob('/../content/**/*.mdx', { eager: true })

function mapContentToCollection(slug: string, content: DocumentHeadProps): PartPost {
  const frontmatter = content.head.frontmatter

  return {
    title: content.head.title || '',
    frontmatter,
    slug,
    // @ts-ignore
    excerpt: content.excerpt,
    // @ts-ignore
    readingTime: content.readingTime,
    // @ts-ignore
    rendered: content.default().children,
    // @ts-ignore
    released: (frontmatter.released && new Date(frontmatter.released)) as Date | null,
    // @ts-ignore
    updated: (frontmatter.updated && new Date(frontmatter.updated)) as Date | null,
  }
}

export const partsCollection = Object.keys(content).reduce<Record<string, PartPost>>((collection, path) => {
  const slug = path.split('/').slice(-2).join('/').replace('.mdx', '')
  collection[slug] = mapContentToCollection(slug, content[path])

  return collection
}, {})
