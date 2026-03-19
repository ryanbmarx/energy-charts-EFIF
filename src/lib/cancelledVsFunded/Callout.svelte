<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { grants, loans, planned } from './cancelledVsFunded';
  import * as Select from '$lib/components/ui/select/index.js';
  import { formatMoneyParts, type FormatParts } from '@/utils/format-money';

  let {
    segments,
    selectedSegment = $bindable(),
  }: {
    segments: Set<string>;
    selectedSegment: string | undefined;
  } = $props();

  const selectedSegmentLabel = $derived(selectedSegment || 'Select a segment to highlight');
  const highlightGrants = $derived(getHighlightValue(grants));
  const highlightLoans = $derived(getHighlightValue(loans));
  const highlightPlanned = $derived(getHighlightValue(planned));

  function getHighlightValue(data: typeof grants) {
    const highlightFigure = data.find((s) => s.name === selectedSegmentLabel)?.value;
    return highlightFigure ? formatMoneyParts(highlightFigure) : null;
  }
</script>

<div class="callout" role="menubar">
  <Select.Root type="single" bind:value={selectedSegment}>
    <Select.Trigger class="w-full min-w-4 flex-1 bg-white sm:hidden"
      >{selectedSegmentLabel}</Select.Trigger
    >
    <Select.Content
      portalProps={{
        disabled: true,
      }}
    >
      {#each segments as segment (segment)}
        <Select.Item value={segment}>{segment}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <ul class="w-full flex-1">
    {@render highlightValueListItem('Grants', highlightGrants)}
    {@render highlightValueListItem('Loans', highlightLoans)}
    {@render highlightValueListItem('Planned spending', highlightPlanned)}
  </ul>
</div>

{#snippet highlightValueListItem(label: string, parts: FormatParts | null)}
  <li class="flex flex-col gap-1 text-center">
    <span class="text-sm font-bold">{label}:</span>
    <span class="text-lg font-bold md:text-2xl">
      {#if parts}
        <NumberFlow {...parts} />
      {:else}
        —
      {/if}
    </span>
  </li>
{/snippet}

<style lang="postcss">
  .callout {
    padding: calc(4 * var(--spacing));
    background: var(--color-amber-50);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    /* gap: calc(4 * var(--spacing)); */

    ul {
      display: grid;
      align-items: center;
      gap: 0 calc(4 * var(--spacing));
      grid-template-columns: repeat(3, minmax(1px, 1fr));
      grid-template-rows: repeat(2, auto);

      li {
        display: grid;
        grid-row: 1/-1;
        grid-template-columns: minmax(1px, 1fr);
        grid-template-rows: subgrid;
        min-width: 7rem;
      }
    }
  }
</style>
