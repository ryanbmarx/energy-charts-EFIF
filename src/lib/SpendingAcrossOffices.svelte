<script lang="ts">
  import { BarChart } from 'layerchart';
  import Legend from './Legend.svelte';
  import { formatMoney } from '@/utils/format-money';

  type DataKey = 'announced' | 'awarded' | 'obligated';

  const data = [
    { quarter: '2025 Q1', announced: 0, awarded: 0, obligated: 169_607_269 },
    { quarter: '2025 Q2', announced: 0, awarded: 19_847_566, obligated: 344_271_875 },
    { quarter: '2025 Q3', announced: 1_110_000_000, awarded: 0, obligated: 1_000_857_411 },
    { quarter: '2025 Q4', announced: 1_182_200_000, awarded: 819_600_000, obligated: 500_852_244 },
    { quarter: '2026 Q1', announced: 2_964_760_000, awarded: 3_337_500_000, obligated: 20_611_196 },
  ];

  const series = [
    { key: 'announced', label: 'Announced', color: 'var(--middle-green)' },
    { key: 'awarded', label: 'Awarded', color: 'var(--blue)' },
    { key: 'obligated', label: 'Obligated', color: 'var(--orange)' },
  ];
</script>

<div class="chart-container">
  <Legend
    class="absolute top-0 right-0 z-2 border bg-white p-4 shadow"
    items={series.map(({ label, color }) => ({ label, color }))}
    stacked
  />
  <div class="chart">
    <BarChart
      {data}
      {series}
      y="quarter"
      orientation="horizontal"
      seriesLayout="group"
      tooltip={false}
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        yAxis: { format: 'none', classes: { tickLabel: 'font-bold' } },
        xAxis: {
          format: (v: number) => (v === 0 ? '' : formatMoney(v, 1)),
          classes: { tickLabel: 'font-bold text-muted-foreground' },
        },
        grid: { x: { style: '--stroke-color: var(--color-border)' } },
      }}
      renderContext="svg"
      padding={{ left: 60, bottom: 30, top: 30, right: 60 }}
    >
      {#snippet aboveMarks({ context })}
        {@const barHeight = (context.yScale.bandwidth?.() ?? 0) / series.length}
        {#each data as entry (entry.quarter)}
          {#each series as s, i (s.key)}
            {@const value = entry[s.key as DataKey]}
            {@const y = (context.yScale(entry.quarter) ?? 0) + i * barHeight + barHeight / 2}
            {@const x = context.xScale(value) + 4}
            <text
              {x}
              {y}
              text-anchor="start"
              dominant-baseline="middle"
              font-size="10"
              font-weight="bold"
              pointer-events="none">{formatMoney(value, 1)}</text
            >
          {/each}
        {/each}
      {/snippet}
    </BarChart>
  </div>
</div>

<style lang="postcss">
  .chart-container {
    max-width: 60rem;
  }

  .chart {
    width: 100%;
    aspect-ratio: 3 / 2;
  }
</style>
