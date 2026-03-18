<script lang="ts">
  import { cn } from '../utils';

  const {
    background,
    class: addClass = '',
    sizeInEm = 0.85,
    borderColor,
  }: { background: string; class?: string; sizeInEm?: number; borderColor?: string } = $props();
</script>

<span
  role="presentation"
  class={cn('swatch', addClass)}
  style:background
  style:border-color={borderColor || background}
  style:--size="{sizeInEm}em"
>
</span>

<style lang="postcss">
  .swatch {
    flex: 0 0 1rem;
    height: var(--size);
    width: var(--size);
    display: inline-block;
    border: 1px solid #222;
  }
</style>
