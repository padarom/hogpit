import { component$ } from '@builder.io/qwik'
import type { ClassList } from '@builder.io/qwik'

type Props = {
  active: boolean,
  class?: ClassList
}

export default component$<Props>(({ active, class: classes }) => (
  <i class={[
    'p-2 rounded-full cursor-pointer',
    'bg-transparent hover:bg-gray-100',
    'dark:hover:bg-gray-700',
    'transition-colors duration-300',
    !active && 'text-gray-400 dark:text-gray-400 ',
    active && 'text-gray-900 dark:text-gray-100',
    classes,
  ]}></i>
))
