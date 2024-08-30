import { component$, useResource$ } from '@builder.io/qwik'
import { type CollectionEntry } from 'astro:content'
import { createExcerpt } from '../utils/excerpt'
import { calculateReadTime } from '../utils/readtime'

type PostProps = {
  post: CollectionEntry<'parts'>,
  tabular: boolean,
  index: number
}

const Post = component$(({ tabular, post, index }: PostProps) => {
  const excerpt = createExcerpt(post.body || '', 280)
  const readTime = calculateReadTime(post.body || '')

  return (
    <a href={post.slug} class={[
      'group',
      tabular && 'grid grid-cols-1',
      !tabular && 'grid grid-cols-2 gap-20',
    ]}>
      <div class="aspect-w-8 aspect-h-4 shadow-2xl">
        <img
          class="w-full h-full object-center object-cover rounded-sm"
          alt={post.data.heroSubtitle}
          src={post.data.heroImage.src}
        />
      </div>

      <div class={[
        tabular && 'border-gray-100 dark:border-gray-700 transition-[border-color]',
        tabular && (index % 2 != 0) && 'pb-7 pt-4 border-t -order-1',
        tabular && (index % 2 == 0) && 'pt-7 pb-2 border-b',
        !tabular && 'py-10',
      ]}>
        <h3 class="font-serif text-2xl font-bold mb-3">{post.data.title}</h3>
        <p class="mb-3">{excerpt}</p>
        <p class="text-gray-400 font-bold text-sm">
          {new Date(post.data.updated).toLocaleDateString()} &middot; {readTime} min read
        </p>
      </div>
    </a>
  )
})

type Props = {
  tabular: boolean,
  posts: CollectionEntry<'parts'>[],
}

export const PostsList = component$(({ tabular, posts }: Props) => {
  const renderedPosts = posts.map((node, i) => (
    <Post index={i} tabular={tabular} post={node} />
  ))

  return (
    <div class={[
      'grid grid-cols-1 gap-12 pb-12 pt-20',
      tabular && 'grid grid-cols-3 gap-x-10 gap-y-20'
    ]}>
      {renderedPosts}
    </div>
  )
})
