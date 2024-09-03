import { component$, $, useSignal } from '@builder.io/qwik'
import { getCollection, CollectionEntry } from 'astro:content'
import { Icon } from '../components/Icon'
import { Author } from '../components/Author'
import { PostsList } from '../components/PostsList'

const author = {
	slug: 'chris',
	avatar: 'https://avatars.githubusercontent.com/u/3678770?v=4',
	bio: `
		Written by Christopher, a programmer and maker from the Frankfurt metropolitan
    area in Germany who loves to build things. He's a fan of aviation and flight simulators
    and is currently building an A-10C simulator cockpit.
	`.trim(),
}

let posts: CollectionEntry<'parts'>[] = await getCollection('parts')
posts = posts
  .sort((a, b) => a.data.updated > b.data.updated ? -1 : 1)
  .slice(0, 6)
  .map(post => ({ data: post.data, body: post.body, slug: post.slug }))

export const IndexPage = component$(() => {
  const useTabularLayout = useSignal(false)
  const setTabularLayout = $((value: boolean) => {
    useTabularLayout.value = value
  })

  return (
    <div class="mt-0 mb-8 md:(mt-4 mb-24)">
      <div class="
        font-sans font-medium max-w-2xl leading-tight tracking-tighter mb-20
        w-full text-5xl md:(w-3/4 text-4xl)
      ">
        Welcome to my Hogpit project, where I try to document my journey
        of building an <span class="font-black dark:text-gray-400 font-serif transition-colors">A&#8209;10C</span> simulator&nbsp;pit.
      </div>

      <div class="flex justify-between items-center">
        <div class="flex-shrink-0 w-full md:w-3/5 xl:w-1/2">
          <Author {...author} />
        </div>

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

      <PostsList tabular={useTabularLayout.value} posts={posts} />
    </div>
  )
})
