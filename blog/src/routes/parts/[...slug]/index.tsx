import { component$ } from '@builder.io/qwik'
import { useLocation, type StaticGenerateHandler } from '@builder.io/qwik-city'
import { partsCollection } from '~/collections/parts-collection'
import { Image } from '@unpic/qwik'
import { Disqus } from '~/components'

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: Object.keys(partsCollection).map(slug => ({ slug }))
  }
}

export default component$(() => {
  const loc = useLocation()
  const entry = partsCollection[loc.params.slug]

  return (
    <main class="px-10">
      <h1 class="text-5xl font-bold font-serif max-w-2xl mx-auto mb-1">{entry.title}</h1>
      <p class="text-gray-500 text-sm dark:text-gray-400 transition-colors max-w-2xl mx-auto mb-16">Written {entry.frontmatter.released as string}{(entry.frontmatter.updated as string) && `, last updated ${entry.frontmatter.updated}`}</p>

      <div class="mb-16">
        <Image
          src={entry.frontmatter.heroImage}
          alt={entry.frontmatter.heroSubtitle}
          layout="constrained"
          class="w-full h-full object-center object-cover rounded-md"
        />
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">{entry.frontmatter.heroSubtitle as string}</p>
      </div>

      <div class="max-w-2xl mx-auto text-lg font-serif">
        {entry.rendered}
      </div>

      <hr class="mt-10 mb-20 dark:opacity-20 transition-opacity" />

      <div class="max-w-2xl mx-auto">
        <Disqus shortname="hogpit" identifier={entry.slug as string} url={loc.url.href} title={entry.title as string} />
      </div>
    </main>
  )
})
