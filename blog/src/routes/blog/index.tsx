import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <h1 class="text-5xl font-serif">Blog</h1>
  )
})

export const head: DocumentHead = {
  title: 'Blog Posts',
}
