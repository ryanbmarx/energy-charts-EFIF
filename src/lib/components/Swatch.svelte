<script lang="ts">
  import { cn } from '../utils';

  const { background, class: addClass = '' }: { background: string; class?: string } = $props();
</script>

<span role="presentation" class={cn('swatch', addClass)} style:background> </span>

<style lang="postcss">
  .swatch {
    flex: 0 0 1rem;
    height: 1em;
    width: 1em;
    display: inline-block;
    border: 1px solid #222;
  }
</style>
