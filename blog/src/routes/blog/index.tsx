import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { blogPostsCollection } from '~/collections/blog-posts-collection'

export default component$(() => {
  const collection = Object.values(blogPostsCollection).slice(0, 6)

  return (
    <div>
      <h1 class="text-5xl font-serif">Blog</h1>

      <ul>
        <li>
          {Object.values(collection).map((post) => (
            <a href={`/blog/${post.slug}`}>{ post.title }</a>
          ))}
        </li>
      </ul>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Blog Posts',
}
