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

<div class="chart">
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
    x="year"
    y="value"
    renderContext="svg"
  >
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
  .chart {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 60rem;
  }
</style>
