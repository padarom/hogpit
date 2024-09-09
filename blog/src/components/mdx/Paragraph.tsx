import { component$ } from '@builder.io/qwik'

type Props = object

export default component$<Props>((props) => (
  <p class="mb-6" {...props}>
    <slot />
  </p>
))
