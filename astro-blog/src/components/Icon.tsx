import { component$ } from '@builder.io/qwik'
import type { ClassList } from '@builder.io/qwik'
// import './fontawesome-pro/js/fontawesome'

type Props = { active: Boolean, class?: ClassList }

export const Icon = component$((props: Props) => {
  return <i class={[
    props.class,
    'text-gray-400 p-2 rounded-full cursor-pointer',
    'bg-transparent hover:bg-gray-100',
    'dark:text-gray-400 dark:hover:bg-gray-700',
    'transition-colors duration-300',
    props.active && 'text-gray-900 dark:text-gray-100',
  ]}></i>
})
