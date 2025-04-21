import {Icon} from "~/components/index";
import {$, component$, type Signal} from "@builder.io/qwik";

interface FlipperProps {
  signal: Signal<boolean>,
  icons: [string, string],
}

export default component$((props: FlipperProps) => {
  const flip = $((value: boolean) => {
    props.signal.value = value
  })

  return (
    <div class="hidden text-xl md:flex gap-2">
      <div onClick$={() => flip(true)}>
        <Icon class={props.icons[0]} active={props.signal.value} />
      </div>

      <div onClick$={() => flip(false)}>
        <Icon
          class={props.icons[1]}
          active={!props.signal.value}
        />
      </div>
    </div>
  );
})
