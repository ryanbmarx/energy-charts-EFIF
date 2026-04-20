<script lang="ts">
  import Swatch from './components/Swatch.svelte';

  type LegendItem = {
    label: string;
    color: string;
    isLine?: boolean;
    borderColor?: string;
  };
  const {
    items,
    class: addClass = '',
    stacked = false,
  }: {
    items: LegendItem[];
    class?: string;
    stacked?: boolean;
  } = $props();
</script>

{#if items.length}
  <dl class="legend text-sm {addClass}" class:stacked>
    {#each items as { label, color, borderColor, isLine = false } (label)}
      <div class="legend-divider" class:line={isLine}>
        <dt><Swatch background={color} {borderColor} /></dt>
        <dd class="font-bold">{label}</dd>
      </div>
    {/each}
  </dl>
{/if}

<style lang="postcss">
  .legend {
    display: flex;
    align-items: center;
    gap: calc(4 * var(--spacing));

    line-height: 1;

    &.stacked {
      flex-direction: column;
      gap: var(--spacing);
      align-items: start;
    }
  }
  .legend-divider {
    display: flex;
    gap: calc(2 * var(--spacing));
    align-items: center;
  }
</style>
