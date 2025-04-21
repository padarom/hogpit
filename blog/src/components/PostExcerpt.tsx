import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
// import { createExcerpt } from '../../../blog/src/utils/excerpt'

// TODO: Determine how to properly type this generically.
export type Props = {
  post?: any,
  tabular: boolean,
  index: number,
}

export default component$<Props>(({ post, tabular, index }) => {
  return (
    <a href={`/parts/${post.slug}`} class={[
      'group',
      tabular && 'grid grid-cols-1',
      !tabular && 'grid grid-cols-2 gap-20',
    ]}>
      <div class="aspect-w-8 aspect-h-4 shadow-2xl">
        <Image
          class="w-full h-full object-center object-cover rounded-xs"
          alt={post.frontmatter.heroSubtitle}
          src={post.frontmatter.heroImage}
        />
      </div>

      <div class={[
        tabular && 'border-gray-100 dark:border-gray-700 transition-[border-color]',
        tabular && (index % 2 != 0) && 'pb-7 pt-4 border-t -order-1',
        tabular && (index % 2 == 0) && 'pt-7 pb-2 border-b',
        !tabular && 'py-10',
      ]}>
        <h3 class="font-serif text-2xl font-bold mb-3">{post.title}</h3>
        <p class="mb-3">{post.excerpt.longer}</p>
        <p class="text-gray-400 font-bold text-sm">
          {new Date(post.updated).toLocaleDateString()} &middot; {post.readingTime.text}
        </p>
      </div>
    </a>
  )
})
