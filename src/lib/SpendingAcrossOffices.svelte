<script lang="ts">
  //     	Announced	Awarded	Obligated
  // 2025 Q1	$0	$0	$169,607,269
  // 2025 Q2	$0	$19,847,566	$344,271,875
  // 2025 Q3	$1,110,000,000	$0	$1,000,857,411
  // 2025 Q4	$1,182,200,000	$819,600,000	$500,852,244
  // 2026 Q1	$2,964,760,000	$3,337,500,000	$20,611,196

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
  <Legend items={series.map(({ label, color }) => ({ label, color }))} />
  <div class="chart">
    <BarChart
      {data}
      {series}
      x="quarter"
      yDomain={[0, 4_000_000_000]}
      seriesLayout="group"
      tooltip={false}
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        xAxis: { format: 'none', classes: { tickLabel: 'font-bold' } },
        yAxis: {
          format: (v: number) => (v === 0 ? '' : formatMoney(v, 1)),
          classes: { tickLabel: 'font-bold text-muted-foreground' },
        },
        grid: { y: { style: '--stroke-color: var(--color-border)' } },
      }}
      renderContext="svg"
      padding={{ left: 42, bottom: 30, top: 30 }}
    >
      {#snippet aboveMarks({ context })}
        {@const barWidth = (context.xScale.bandwidth?.() ?? 0) / series.length}
        {#each data as entry (entry.quarter)}
          {#each series as s, i (s.key)}
            {@const value = entry[s.key as DataKey]}
            {#if value > 0}
              {@const x = (context.xScale(entry.quarter) ?? 0) + i * barWidth + barWidth / 2}
              {@const y = context.yScale(value) - 4}
              <text
                {x}
                {y}
                text-anchor="middle"
                dominant-baseline="auto"
                font-size="10"
                font-weight="bold"
                pointer-events="none">{formatMoney(value, 1)}</text
              >
            {/if}
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
    aspect-ratio: 16 / 9;
  }
</style>
