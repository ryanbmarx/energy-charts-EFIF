<script lang="ts">
  import { BarChart, Tooltip } from 'layerchart';

  const data = [
    { year: 2015, value: 93 },
    { year: 2016, value: 48 },
    { year: 2017, value: -360 },
    { year: 2018, value: -367 },
    { year: 2019, value: -66 },
    { year: 2020, value: 229 },
    { year: 2021, value: 129 },
    { year: 2022, value: 381 },
    { year: 2023, value: 1179 },
    { year: 2024, value: 994 },
    { year: 2025, value: -3050 },
  ];

  const props = {
    bars: {
      class: 'stroke-none',
      rounded: 'none' as const,
    },
    highlight: { bar: { class: 'fill-bar-highlight' } },
    xAxis: { classes: { tickLabel: 'font-bold text-muted-foreground' } },
    yAxis: {
      format: (v: number) => (v === 0 ? '' : `${(v / 1000).toFixed(1)}k`),
      classes: { tickLabel: 'font-bold text-muted-foreground' },
    },
  };

  // Map sign to a named category so the ordinal color scale can resolve it
  function barColor(d: { value: number }) {
    return d.value >= 0 ? 'positive' : 'negative';
  }
</script>

<div class="chart">
  <BarChart
    {data}
    {props}
    x="year"
    y="value"
    c={barColor}
    cDomain={['positive', 'negative']}
    cRange={['var(--middle-green)', 'var(--red)']}
    renderContext="svg"
  >
    {#snippet tooltip({ context })}
      <Tooltip.Root {context} class="max-w-33">
        {#snippet children({ data })}
          {data.year}: <b>{data.value}</b>
        {/snippet}
      </Tooltip.Root>
    {/snippet}
  </BarChart>
</div>

<style lang="postcss">
  .chart {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
