<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { type FormatParts } from '@/utils/format-money';

  let {
    parts,
  }: {
    parts: FormatParts | null;
  } = $props();
</script>

<div class="callout flex flex-col gap-1 text-center">
  <span class="text-lg font-bold md:text-2xl">
    {#if parts}
      <NumberFlow {...parts} />
    {:else}
      —
    {/if}
  </span>
</div>

<style lang="postcss">
  .callout {
    border-radius: 0.75rem;
    padding: calc(2 * var(--spacing));
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: calc(2 * var(--spacing));
    border: 1px solid #eee;
    max-width: 8rem;
    width: 100%;
    margin: 0 auto;
  }
</style>
