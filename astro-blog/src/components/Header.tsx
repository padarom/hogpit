import { Slot, component$, useSignal, $ } from '@builder.io/qwik'
import { Icon } from './Icon'

const MenuLink = component$((props: { href: string }) =>
  <a
    href={props.href}
    class="px-3 hover:text-gray-700 dark:hover:text-gray-300"
  >
    <Slot />
  </a>
)

export const Header = component$(() => {
  const darkMode = useSignal(false)
  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark')
  })

  return (
    <div class="pt-16 pb-24 flex justify-between items-center">
      <a href="/" class="font-page-title text-4xl p-2 -m-2">
        <span>Hog</span>
        <span class="text-gray-600 dark:text-gray-400 transition-colors">pit</span>
      </a>

      <div class="px-3 ml-auto mr-10">
        <MenuLink href="/about">About</MenuLink>
        <MenuLink href="/simulator">Simulator</MenuLink>
        <MenuLink href="/parts/1">Parts</MenuLink>
        <MenuLink href="/posts/1">Blog</MenuLink>
      </div>

      <div class="text-2xl text-gray-500 dark:text-gray-300" onClick$={toggleDarkMode}>
        <Icon
          active={darkMode.value}
          class="fa-solid fa-moon"
        />
      </div>
    </div>
  )
})
