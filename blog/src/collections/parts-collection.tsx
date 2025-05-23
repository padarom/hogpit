import type { DocumentHeadProps } from '@builder.io/qwik-city'

export interface PartMeta {
  excerpt: string
  readingTime: any
  released?: Date
  updated?: Date
  references: string[]
}

export interface PartPost {
  title: string
  rendered: any
  slug: string
  meta: PartMeta
  hero: {
    image: string | null,
    subtitle: string | null
  }
}

const content = import.meta.glob('/../content/parts/**/*.mdx', { eager: true })

function mapContentToCollection(slug: string, content: DocumentHeadProps): PartPost {
  const frontmatter = content.head.frontmatter

  return {
    title: content.head.title || '',
    // @ts-ignore
    rendered: content.default().children,
    slug,
    hero: {
      // @ts-ignore
      image: frontmatter.hero?.image,
      // @ts-ignore
      subtitle: frontmatter.hero?.subtitle,
    },
    meta: {
      // @ts-ignore
      excerpt: content.excerpt,
      // @ts-ignore
      readingTime: content.readingTime,
      // @ts-ignore
      released: (frontmatter.released && new Date(frontmatter.released)) as Date | null,
      // @ts-ignore
      updated: (frontmatter.updated && new Date(frontmatter.updated)) as Date | null,
      references: [],
    },
  }
}

export const partsCollection = Object.keys(content).reduce<Record<string, PartPost>>((collection, path) => {
  const slug = path.split('/').slice(-2).join('/').replace('.mdx', '')
  collection[slug] = mapContentToCollection(slug, content[path])

  return collection
}, {})
