<script lang="ts">
  import { BarChart, Tooltip } from 'layerchart';

  // Ratio of total budgetary resources to federal staff, by year
  type YearRatio = { year: number; value: number };

  const data: YearRatio[] = [
    { year: 2017, value: 4.7 },
    { year: 2018, value: 5.8 },
    { year: 2019, value: 6.4 },
    { year: 2020, value: 7.1 },
    { year: 2021, value: 7.1 },
    { year: 2022, value: 24.5 },
    { year: 2023, value: 26.0 },
    { year: 2024, value: 26.8 },
    { year: 2025, value: 27.7 },
    { year: 2026, value: 35.7 },
  ];
</script>

<div class="chart-container">
  <BarChart
    {data}
    props={{
      bars: {
        class: 'stroke-none [fill:var(--middle-green)]',
        rounded: 'none',
      },
      highlight: { bar: { class: 'fill-bar-highlight' } },
      xAxis: { classes: { tickLabel: 'font-bold text-muted-foreground' } },
      yAxis: {
        ticks: [0, 10, 20, 30, 40],
        format: (v: number) => (v === 0 ? '' : `${v}x`),
        classes: { tickLabel: 'font-bold text-muted-foreground' },
      },
    }}
    padding={{ left: 25, top: 30, right: 0, bottom: 20 }}
    x="year"
    y="value"
    renderContext="svg"
  >
    {#snippet aboveMarks({ context })}
      {#if context.containerWidth >= 500}
        {@const narrow = context.containerWidth < 800}
        {#each data as entry (entry.year)}
          {@const y = narrow ? context.yScale(entry.value) - 4 : context.yScale(entry.value) + 12}
          <!-- Label above each bar; pointer-events off to preserve tooltip hover -->
          <text
            {y}
            x={(context.xScale(entry.year) ?? 0) + (context.xScale.bandwidth?.() ?? 0) / 2}
            text-anchor="middle"
            dominant-baseline="auto"
            font-size="11"
            font-weight="bold"
            fill={narrow ? 'black' : 'white'}
            pointer-events="none">{entry.value}x</text
          >
        {/each}
      {/if}
    {/snippet}
    {#snippet tooltip({ context })}
      <Tooltip.Root {context} class="max-w-33">
        {#snippet children({ data })}
          {data.year}: <b>{data.value}x</b>
        {/snippet}
      </Tooltip.Root>
    {/snippet}
  </BarChart>
</div>

<style lang="postcss">
  .chart-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 60rem;
  }
</style>
