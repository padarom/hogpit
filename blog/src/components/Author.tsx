import { component$ } from '@builder.io/qwik'

const author = {
	slug: 'chris',
	avatar: 'https://avatars.githubusercontent.com/u/3678770?v=4',
	bio: `
		Written by Christopher, a programmer and maker from the Frankfurt metropolitan
    area in Germany who loves to build things. He's a fan of aviation and flight simulators
    and is currently building an A-10C simulator cockpit.
	`.trim(),
}

export default component$(() => {
  return (
    <a href={author.slug || '#'}>
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img
            class="inline-block h-9 w-9 rounded-full"
            src={author.avatar}
            alt=""
          />
        </div>
        <div class="ml-5">
          <p
            class="text-sm font-sans text-gray-700 dark:text-gray-400 transition-colors"
            dangerouslySetInnerHTML={ author.bio }
          />
        </div>
      </div>
    </a>
  )
})
