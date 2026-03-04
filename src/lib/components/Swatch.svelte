<script lang="ts">
  import { cn } from '../utils';

  const {
    background,
    class: addClass = '',
    sizeInEm = 0.85,
  }: { background: string; class?: string; sizeInEm?: number } = $props();
</script>

<span
  role="presentation"
  class={cn('swatch', addClass)}
  style:background
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
