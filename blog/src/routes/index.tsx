import { $, component$, useSignal, noSerialize } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { Author, Icon, PostExcerpt } from '~/components'
import { partsCollection } from '~/collections/parts-collection'

export default component$(() => {
  const collection = Object.values(partsCollection).slice(0, 6)

  const useTabularLayout = useSignal(false)
  const setTabularLayout = $((value: boolean) => {
    useTabularLayout.value = value
  })

  return (
    <div class="mt-0 mb-8 md:(mt-4 mb-24)">
      <div class="
        font-sans font-medium max-w-2xl leading-tight tracking-tighter mb-6
        w-full text-5xl md:(w-3/4 text-4xl)
      ">
        Welcome to my Hogpit project, where I try to document my journey
        of building an <span class="font-black dark:text-gray-400 font-serif transition-colors">A&#8209;10C</span> simulator&nbsp;pit.
      </div>

      <div class="shrink-0 w-full md:w-3/5 xl:w-1/2">
        <Author />
      </div>

      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-serif font-black mt-16">Recent blog posts</h2>

        <div class="text-xl md:flex hidden">
          <div onClick$={ () => setTabularLayout(true) } class="mr-4">
            <Icon
              class="fa-solid fa-objects-column"
              active={useTabularLayout.value}
            />
          </div>

          <div onClick$={ () => setTabularLayout(false) }>
            <Icon
              class="fa-solid fa-list-timeline"
              active={!useTabularLayout.value}
            />
          </div>
        </div>
      </div>

      <div class={[
        'grid grid-cols-1 gap-12 pb-12 pt-12',
        useTabularLayout.value && 'grid grid-cols-3 gap-x-10 gap-y-20'
      ]}>
        {
          collection.map((post: any, i: number) =>
            <PostExcerpt key={post.title} index={i} tabular={useTabularLayout.value} post={noSerialize(post)} />
          )
        }
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Hogpit',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
