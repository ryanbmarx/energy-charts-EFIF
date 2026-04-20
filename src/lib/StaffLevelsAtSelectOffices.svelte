<script lang="ts">
  import { BarChart } from 'layerchart';
  import Legend from './Legend.svelte';

  /*
	FY25	FY26 (est)	FY27 (req)
NE	334	264	328
EDF	208	105	140
SC	774	600	575
HGEO	573	573	588
*/

  const data = [
    { office: 'NE', fy25: 334, fy26est: 264, fy27req: 328 },
    { office: 'EDF', fy25: 208, fy26est: 105, fy27req: 140 },
    { office: 'SC', fy25: 774, fy26est: 600, fy27req: 575 },
    { office: 'HGEO', fy25: 573, fy26est: 573, fy27req: 588 },
  ];

  const series = [
    { key: 'fy25', label: 'FY25', color: 'var(--middle-green)' },
    { key: 'fy26est', label: 'FY26 (est.)', color: 'var(--light-green-1)' },
    { key: 'fy27req', label: 'FY27 (req.)', color: 'var(--gray)' },
  ];

  type DataKey = 'fy25' | 'fy26est' | 'fy27req';
</script>

<div class="chart-container">
  <Legend items={series.map(({ label, color }) => ({ label, color }))} />
  <div class="chart">
    <BarChart
      {data}
      {series}
      x="office"
      seriesLayout="group"
      tooltip={false}
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        xAxis: { format: 'none', classes: { tickLabel: 'font-bold' } },
        yAxis: {
          format: (v: number) => (v === 0 ? '' : String(v)),
          classes: { tickLabel: 'font-bold text-muted-foreground' },
        },
      }}
      renderContext="svg"
      padding={{ left: 30, bottom: 30, top: 30 }}
    >
      {#snippet aboveMarks({ context })}
        {@const barWidth = (context.xScale.bandwidth?.() ?? 0) / series.length}
        {#each data as entry (entry.office)}
          {#each series as s, i (s.key)}
            {@const value = entry[s.key as DataKey]}
            {@const x = (context.xScale(entry.office) ?? 0) + i * barWidth + barWidth / 2}
            {@const y = context.yScale(value) - 4}
            <text
              {x}
              {y}
              text-anchor="middle"
              dominant-baseline="auto"
              font-size="11"
              font-weight="bold"
              pointer-events="none"
            >{value}</text>
          {/each}
        {/each}
      {/snippet}
    </BarChart>
  </div>
</div>

<style lang="postcss">
  /* chart palette — edit here to retheme */
  .chart-container {
    max-width: 60rem;
  }

  .chart {
    width: 100%;
    aspect-ratio: 16/9;
  }
</style>
