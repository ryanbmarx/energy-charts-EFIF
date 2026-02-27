<script lang="ts">
  import { BarChart } from 'layerchart';
  import { grants, loans, planned } from './cancelledVsFunded';
  import * as Select from '$lib/components/ui/select/index.js';
  import { formatMoney } from '@/utils/format-money';

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
    return highlightFigure ? formatMoney(highlightFigure) : '–';
  }
</script>

<div class="controls" role="menubar">
  <Select.Root type="single" bind:value={selectedSegment}>
    <Select.Trigger class="min-w-4 flex-1 bg-white">{selectedSegmentLabel}</Select.Trigger>
    <Select.Content>
      {#each segments as segment (segment)}
        <Select.Item value={segment}>{segment}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <ul class="flex-1">
    <li>Grants: <b>{highlightGrants}</b></li>
    <li>Loans: <b>{highlightLoans}</b></li>
    <li>Planned spending: <b>{highlightPlanned}</b></li>
  </ul>
</div>
<div class="chart-container">
  {#each charts as { data, series, title, totalPositiveValue, totalNegativeValue } (title)}
    <div class="chart" data-title={title}>
      <span class="mb-4 text-center text-lg leading-none uppercase">{title}</span>

      <BarChart
        {data}
        x="id"
        {series}
        seriesLayout="stackDiverging"
        yDomain={[-12_000_000_000, 4_000_000_000]}
        padding={{ left: 52, top: 20, right: 8, bottom: 20 }}
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

<style lang="postcss">
  .controls {
    padding: calc(4 * var(--spacing));
    background: var(--color-amber-50);
    display: flex;
    align-items: center;
    gap: calc(4 * var(--spacing));

    ul {
      display: flex;
      align-items: center;
      gap: calc(4 * var(--spacing));
    }
  }

  .chart-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    gap: calc(4 * var(--spacing));
  }

  .chart {
    flex: 1 1;

    display: flex;
    gap: calc(0 * var(--spacing));
    flex-flow: column nowrap;
  }
</style>
