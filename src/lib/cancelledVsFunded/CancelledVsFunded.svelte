<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { BarChart } from 'layerchart';
  import { grants, loans, planned } from './cancelledVsFunded';
  import * as Select from '$lib/components/ui/select/index.js';
  import { formatMoney, formatMoneyParts, type FormatParts } from '@/utils/format-money';
  import Legend from '../Legend.svelte';

  // highlight: name of the selected segment, or undefined for no highlight
  function makeSeries(d: typeof grants, highlight: string | undefined) {
    return d
      .filter((d) => d.value !== 0)
      .map(({ name, value }, i) => ({
        key: `s${i}`,
        label: name,
        // Ignores the data item; value is baked in since there's only one bar
        value: () => value,
        color:
          name === highlight
            ? value >= 0
              ? 'var(--middle-blue)'
              : 'var(--red)'
            : value >= 0
              ? 'var(--middle-green)'
              : 'var(--orange)',
        // stroke-none is applied per-series so highlighted bars can override it
        props:
          name === highlight ? { stroke: 'black', 'stroke-width': '1' } : { class: 'stroke-none' },
      }));
  }

  let selectedSegment = $state<string | undefined>();

  // Re-derives whenever selectedSegment changes to update highlight colors
  const charts = $derived([
    {
      data: [{ id: 'grants' }],
      series: makeSeries(grants, selectedSegment),
      title: 'Grants',
      totalPositiveValue: grants.reduce((s, d) => (d.value > 0 ? s + d.value : s), 0),
      totalNegativeValue: grants.reduce((s, d) => (d.value < 0 ? s + d.value : s), 0),
    },
    {
      data: [{ id: 'loans' }],
      series: makeSeries(loans, selectedSegment),
      title: 'Loans',
      totalPositiveValue: loans.reduce((s, d) => (d.value > 0 ? s + d.value : s), 0),
      totalNegativeValue: loans.reduce((s, d) => (d.value < 0 ? s + d.value : s), 0),
    },
    {
      data: [{ id: 'planned' }],
      series: makeSeries(planned, selectedSegment),
      title: 'Planned spending',
      totalPositiveValue: planned.reduce((s, d) => (d.value > 0 ? s + d.value : s), 0),
      totalNegativeValue: planned.reduce((s, d) => (d.value < 0 ? s + d.value : s), 0),
    },
  ]);
  const segments = $derived.by(() => {
    return grants.reduce((acc, curr) => {
      acc.add(curr.name);
      return acc;
    }, new Set<string>());
  });
  const selectedSegmentLabel = $derived(selectedSegment || 'Select a segment to highlight');
  const highlightGrants = $derived(getHighlightValue(grants));
  const highlightLoans = $derived(getHighlightValue(loans));
  const highlightPlanned = $derived(getHighlightValue(planned));

  function getHighlightValue(data: typeof grants) {
    const highlightFigure = data.find((s) => s.name === selectedSegmentLabel)?.value;
    return highlightFigure ? formatMoneyParts(highlightFigure) : null;
  }
</script>

{#snippet highlightValueListItem(label: string, parts: FormatParts | null)}
  <li class="flex flex-col gap-1">
    <span class="text-sm font-bold">{label}:</span>
    <span class="text-lg font-bold">
      {#if parts}
        <NumberFlow {...parts} />
      {:else}
        —
      {/if}
    </span>
  </li>
{/snippet}
<div class="chart-container">
  <div class="controls" role="menubar">
    <Select.Root type="single" bind:value={selectedSegment}>
      <Select.Trigger class="min-w-4 flex-1 bg-white">{selectedSegmentLabel}</Select.Trigger>
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
    <ul class="flex-1">
      {@render highlightValueListItem('Grants', highlightGrants)}
      {@render highlightValueListItem('Loans', highlightLoans)}
      {@render highlightValueListItem('Planned spending', highlightPlanned)}
    </ul>
  </div>
  <Legend
    items={[
      { label: 'Funded project', color: 'var(--middle-green)' },
      { label: 'Cancelled project', color: 'var(--orange)' },
    ]}
  />
  <div class="chart">
    {#each charts as { data, series, title, totalPositiveValue, totalNegativeValue } (title)}
      <div class="chart__inner" data-title={title}>
        <span class="mb-4 text-center text-lg leading-none uppercase">{title}</span>

        <BarChart
          {data}
          x="id"
          {series}
          seriesLayout="stackDiverging"
          yDomain={[-12_000_000_000, 4_000_000_000]}
          padding={{ left: 45, top: 20, right: 8, bottom: 20 }}
          tooltip={false}
          props={{
            bars: { rounded: 'none' },
            xAxis: { ticks: [] },
            yAxis: {
              format: formatMoney,
              classes: { tickLabel: 'font-bold text-muted-foreground' },
            },
          }}
          renderContext="svg"
        >
          {#snippet aboveMarks({ context })}
            {#if totalPositiveValue > 0}
              <text
                x={context.width / 2}
                y={context.yScale(totalPositiveValue) - 4}
                text-anchor="middle"
                font-weight="bold"
                font-size="12">{formatMoney(totalPositiveValue)}</text
              >
            {/if}
            {#if totalNegativeValue < 0}
              <text
                x={context.width / 2}
                y={context.yScale(totalNegativeValue) + 14}
                text-anchor="middle"
                font-weight="bold"
                font-size="12">{formatMoney(totalNegativeValue)}</text
              >
            {/if}
          {/snippet}
        </BarChart>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .chart-container {
    display: flex;
    flex-flow: column nowrap;
    gap: calc(4 * var(--spacing));
  }
  .controls {
    padding: calc(4 * var(--spacing));
    background: var(--color-amber-50);
    display: flex;
    align-items: center;
    gap: calc(4 * var(--spacing));

    ul {
      display: grid;
      align-items: center;
      gap: 0 calc(4 * var(--spacing));
      grid-template-columns: repeat(3, max-content);
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
  .chart {
    aspect-ratio: 16 / 9;
    display: flex;
    gap: calc(4 * var(--spacing));
  }

  .chart__inner {
    flex: 1 1;

    display: flex;
    gap: calc(0 * var(--spacing));
    flex-flow: column nowrap;
  }
</style>
