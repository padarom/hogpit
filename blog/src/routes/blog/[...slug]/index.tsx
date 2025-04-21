import {component$, useSignal} from '@builder.io/qwik'
import { useLocation, type StaticGenerateHandler } from '@builder.io/qwik-city'
import { blockPostsCollection } from '~/collections/blog-posts-collection'
import { Image } from '@unpic/qwik'
import { Disqus, Flipper } from '~/components'

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: Object.keys(blockPostsCollection).map(slug => ({ slug }))
  }
}

export default component$(() => {
  const loc = useLocation()
  const entry = blockPostsCollection[loc.params.slug]

  const wideText = useSignal(false)
  const maxWidthClass = wideText.value ? "max-w-7xl" : "max-w-4xl";

  return (
    <main class={["px-10 mx-auto transition-all duration-800", maxWidthClass]}>
      <div class="-mt-8 -ml-1 mb-6">
        <Flipper signal={wideText} icons={["fa-regular fa-expand", "fa-regular fa-compress"]} />
      </div>

      <h1 class="text-5xl font-bold font-serif mb-1">{entry.title}</h1>
      <p class="text-gray-500 text-sm dark:text-gray-400 mb-8">
        Written {entry.frontmatter.released}{(entry.frontmatter.updated) && `, last updated ${entry.frontmatter.updated}`}
      </p>

      {
        entry.frontmatter.heroImage &&
          <div class="mt-8 mb-16">
            <Image
              src={entry.frontmatter.heroImage}
              alt={entry.frontmatter.heroSubtitle}
              layout="constrained"
              class="w-full h-full object-center object-cover rounded-md"
            />
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">{entry.frontmatter.heroSubtitle as string}</p>
          </div>
      }

      <div class="text-lg font-serif">
        {entry.rendered}
      </div>

      <hr class="mt-10 mb-20 dark:opacity-20 transition-opacity" />

      <div class="max-w-2xl mx-auto">
        <Disqus shortname="hogpit" identifier={entry.slug as string} url={loc.url.href} title={entry.title as string} />
      </div>
    </main>
  )
})
