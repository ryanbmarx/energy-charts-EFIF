<script lang="ts">
  import Callout from './Callout.svelte';
  import SegmentButtons from './SegmentButtons.svelte';
  import { grants, loans, planned } from './cancelledVsFunded';
  import Legend from '../Legend.svelte';
  import { formatMoney } from '@/utils/format-money';
  import { BarChart } from 'layerchart';

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
</script>

<div class="charts-container">
  <Callout bind:selectedSegment {segments}></Callout>
  <div class="charts">
    <SegmentButtons label="Click to highlight technology on chart" {segments} bind:selectedSegment
    ></SegmentButtons>
    <div class="charts__inner flex-1">
      <Legend
        items={[
          { label: 'Funded project', color: 'var(--middle-green)' },
          { label: 'Cancelled project', color: 'var(--orange)' },
        ]}
      />
      <div class="chart">
        <div class="chart__axis flex-0">axis axis axis axis axis axis</div>
        {#each charts as { data, series, title, totalPositiveValue, totalNegativeValue } (title)}
          <div class="chart__inner" data-title={title}>
            <span class="mb-4 text-center text-lg leading-none uppercase">{title}</span>

            <BarChart
              {data}
              x="id"
              {series}
              seriesLayout="stackDiverging"
              yDomain={[-12_000_000_000, 4_000_000_000]}
              padding={{ left: 45, top: 20, right: 8, bottom: 200 }}
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
  </div>
</div>

<style lang="postcss">
  .charts-container {
    /* Total parent container */
    display: flex;
    flex-flow: column nowrap;
    gap: calc(4 * var(--spacing));
    max-height: 90vh;
    outline: 1px solid red;
  }

  .charts {
    /* Layout device with he charts and buttons */
    display: flex;
    gap: inherit;
  }

  .charts__inner {
    /* Legend + chart elements container (.chart) */
    display: flex;
    flex-flow: column nowrap;
    gap: inherit;
  }

  .chart {
    /* The whole chart composition */
    flex: 1 1;
    height: 100%;
    display: flex;
    gap: 0;
    align-items: stretch;
  }

  .chart__inner {
    /* Each individual bar */
    flex: 1 1;
    outline: 1px solid blue;
    display: flex;
    gap: calc(0 * var(--spacing));
    flex-flow: column nowrap;
  }
</style>
