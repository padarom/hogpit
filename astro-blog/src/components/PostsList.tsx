import { component$, useResource$ } from '@builder.io/qwik'

type Props = {
  tabular: boolean,
  posts: any[],
}

export const PostsList = component$(({ tabular, posts }: Props) => {
  console.log(posts[0].data.title)

  return (
    <span>Hi!</span>
  )
})
