<script lang="ts">
  import Callout from './Callout.svelte';
  import SegmentButtons from './SegmentButtons.svelte';
  import { grants, loans, planned } from './cancelledVsFunded';
  import Legend from '../Legend.svelte';
  import { formatMoney } from '@/utils/format-money';
  import { BarChart } from 'layerchart';
  // (Mostly) shared chart props
  const padding = { left: 45, top: 20, right: 0, bottom: 8 };
  const yDomain = [-12_000_000_000, 4_000_000_000];

  const yTicks = [-12e9, -10e9, -8e9, -6e9, -4e9, -2e9, 0, 2e9, 4e9]; // Explicit ticks so axis labels and grid lines stay in sync across charts
  const seriesLayout = 'stackDiverging';
  const renderContext = 'svg';

  // highlight: name of the selected segment, or undefined for no highlight
  let selectedSegment = $state<string | undefined>();

  // Re-derives whenever selectedSegment changes to update highlight colors
  const charts = $derived([
    {
      data: [{ id: 'grants' }],
      series: makeSeries(grants, selectedSegment),
      title: 'GRANTS',
      totalPositiveValue: grants.reduce((s, d) => (d.value > 0 ? s + d.value : s), 0),
      totalNegativeValue: grants.reduce((s, d) => (d.value < 0 ? s + d.value : s), 0),
    },
    {
      data: [{ id: 'loans' }],
      series: makeSeries(loans, selectedSegment),
      title: 'LOANS',
      totalPositiveValue: loans.reduce((s, d) => (d.value > 0 ? s + d.value : s), 0),
      totalNegativeValue: loans.reduce((s, d) => (d.value < 0 ? s + d.value : s), 0),
    },
    {
      data: [{ id: 'planned' }],
      series: makeSeries(planned, selectedSegment),
      title: 'PLANNED SPENDING',
      subtitle: '(FOAs and NOIs)',
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
        props: {
          stroke: 'white',
          'stroke-width': '1',
          // Dim non-selected bars when a segment is highlighted
          opacity: highlight && name !== highlight ? 0.3 : 1,
        },
      }));
  }
</script>

<div class="charts-container">
  <Callout bind:selectedSegment {segments}></Callout>
  <div class="charts">
    <SegmentButtons label="Click to highlight technology on chart" {segments} bind:selectedSegment
    ></SegmentButtons>
    <div class="charts__inner flex-1">
      <Legend
        class="justify-center"
        items={[
          { label: 'Funded project', color: 'var(--middle-green)' },
          { label: 'Cancelled project', color: 'var(--orange)' },
        ]}
      />
      <div class="chart">
        <!-- Shared y-axis: same domain/padding as the charts but no bars -->
        <div class="chart__axis">
          <span class="invisible mb-4 text-center text-lg leading-none uppercase">X</span>
          <BarChart
            data={[{ id: 'axis' }]}
            x="id"
            series={[]}
            {seriesLayout}
            {yDomain}
            {padding}
            tooltip={false}
            grid={{ yTicks }}
            props={{
              xAxis: { ticks: [] },
              yAxis: {
                ticks: yTicks,
                format: formatMoney,
                classes: { tickLabel: 'font-bold text-muted-foreground' },
              },
            }}
            {renderContext}
          />
        </div>
        {#each charts as { data, series, title, subtitle = "", totalPositiveValue, totalNegativeValue } (title)}
          <div class="chart__inner" data-title={title}>
            <span class="chart-label block text-center text-lg">
              {title}
              {#if subtitle}
                <span class="block italic">{subtitle}</span>
              {/if}
            </span>

            <BarChart
              {data}
              x="id"
              {series}
              {seriesLayout}
              {yDomain}
              padding={{ ...padding, left: 0 }}
              tooltip={false}
              grid={{ yTicks }}
              props={{
                bars: { rounded: 'none' },
                xAxis: { ticks: [] },
                yAxis: { ticks: [], classes: { root: 'hidden' } },
              }}
              {renderContext}
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
    min-height: 600px;
    height: 100%;
    max-height: 95vh;
  }

  .charts {
    /* Layout device with he charts and buttons */
    flex: 1 1;
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
    --axis-width: 5rem;
    /* The whole chart composition */
    flex: 1 1;
    height: 100%;
    display: grid;
    gap: calc(var(--spacing) * 2) 0;
    grid-template-columns: var(--axis-width) repeat(3, minmax(1px, 1fr));
    grid-template-rows: max-content minmax(1px, 1fr);

    & > * {
      height: 100%;
      grid-row: 1/-1;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: subgrid;
    }

    .chart__axis {
      /* Fixed-width column just for the shared y-axis */
      width: var(--axis-width);
    }
  }

  .chart-label {
    grid-row: 1;
    line-height: 1.15;
  }
</style>
