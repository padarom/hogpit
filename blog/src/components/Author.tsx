import { component$ } from '@builder.io/qwik'

type Props = {
  bio: string,
  avatar: string,
  slug: string,
}

export const Author = component$(({ bio, avatar, slug }: Props) => {
  return (
    <a href={slug || '#'}>
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img
            class="inline-block h-9 w-9 rounded-full"
            src={avatar}
            alt=""
          />
        </div>
        <div class="ml-5">
          <p
            class="text-sm font-sans text-gray-700 dark:text-gray-400 transition-colors"
            dangerouslySetInnerHTML={ bio }
          />
        </div>
      </div>
    </a>
  )
})
