<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { type FormatParts } from '@/utils/format-money';

  let {
    parts,
  }: {
    parts: FormatParts | null;
  } = $props();
</script>

<div class="callout">
  {#if parts}
    <NumberFlow {...parts} class="text-lg font-bold md:text-2xl" />
  {:else}
    <span class="text-muted-foreground text-lg font-bold">—</span>
  {/if}
</div>

<style lang="postcss">
  .callout {
    border-radius: 0.75rem;
    padding: 0 calc(2 * var(--spacing));
    border: 2px solid var(--color-teal-300);
    max-width: 8rem;
    width: 100%;
    margin: 0 auto;
    box-shadow: var(--tw-shadow);
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3.5rem; /* a bit of a magic number that accomadates the number flow*/
  }
</style>
