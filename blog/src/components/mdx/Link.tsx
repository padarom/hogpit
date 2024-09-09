import { component$ } from '@builder.io/qwik'

type Props = object

export default component$<Props>((props) => (
  <a class="text-indigo-400 hover:underline dark:text-indigo-300 transition-colors" {...props}>
    <slot />
  </a>
))
