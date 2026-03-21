<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { type FormatParts } from '@/utils/format-money';
  import { cn } from '../utils';

  let {
    parts,
  }: {
    parts: FormatParts | null;
  } = $props();

  const colorClass = $derived.by(() => {
    const isNegative = parts?.prefix.includes('-');
    if (parts?.value) {
      return isNegative ? 'text-(--red)' : 'text-(--middle-blue)';
      // return parts.value > 0 ? 'text-(--orange)':'text-(--middle-green)'  ;
    }

    return 'text-muted-foreground';
  });
</script>

<div class="callout">
  {#if parts}
    <NumberFlow {...parts} class={cn('text-lg font-bold md:text-2xl', colorClass)} />
  {:else}
    <span class="text-muted-foreground text-lg font-bold">—</span>
  {/if}
</div>

<style lang="postcss">
  .callout {
    border-radius: 0.75rem;
    padding: 0 calc(2 * var(--spacing));
    border: 1px solid var(--color-slate-300);
    max-width: 9rem; /* Magic number to accomadate the widest value*/
    width: 100%;
    margin: 0 auto;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3.5rem; /* a bit of a magic number that accomadates the number flow*/
  }
</style>
