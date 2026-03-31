<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { type FormatParts } from '@/utils/format-money';
  import { cn } from '../utils';

  let {
    parts,
  }: {
    parts: FormatParts[] | null;
  } = $props();

  const partsGroup = $derived.by(() => {
    return parts?.sort((a, b) => {
      const aValue = isNegative(a) ? -1 * a.value : a.value;
      const bValue = isNegative(b) ? -1 * b.value : b.value;
      return bValue - aValue;
    });
  });

  function isNegative(parts: FormatParts) {
    return parts?.prefix.includes('-');
  }
  function getColorClass(parts: FormatParts): string {
    if (parts?.value) {
      return isNegative(parts) ? 'text-(--red)' : 'text-(--middle-blue)';
    }
    return 'text-muted-foreground';
  }
</script>

<div class="callout">
  {#each partsGroup ?? [] as parts, index (index)}
    {#if !!parts.value}
      <NumberFlow {...parts} class={cn('text-lg font-bold md:text-2xl', getColorClass(parts))} />
    {:else}
      {@render negativePlaceholder()}
    {/if}
  {:else}
    {@render negativePlaceholder()}
  {/each}
</div>

{#snippet negativePlaceholder()}
  <span class="text-muted-foreground text-lg font-bold">—</span>
{/snippet}

<style lang="postcss">
  .callout {
    border-radius: 0.75rem;
    padding: 0 calc(2 * var(--spacing));
    border: 1px solid var(--color-slate-300);

    max-width: 14rem;
    width: 95%;

    margin: 0 auto;
    text-align: center;

    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: calc(4 * var(--spacing));
    justify-content: center;
    min-height: 3.5rem; /* a bit of a magic number that accomadates the number flow*/
  }
</style>
