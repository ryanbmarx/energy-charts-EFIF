<script lang="ts">
  import {
    // accessor,
    // Axis,
    BarChart,
    // Bars,
    // Canvas,
    // Highlight,
    // Labels,
    // LinearGradient,
    LineChart,
    // Svg,
    Tooltip,
  } from 'layerchart';
  //    import { scaleBand, scaleLinear } from 'd3-scale';
  import { totalBudgetaryResources, percentageObligated } from './tbrData';
</script>

<div class="flex gap-4">
  <div class="container px-2">
    <BarChart
      props={{
        bars: {
          class: 'fill-bar-base stroke-none',
          rounded: 'none',
        },
        highlight: { bar: { class: 'fill-bar-highlight' } },
        xAxis: { classes: { tickLabel: 'font-bold' } },
        yAxis: {
          format: (v: number) => (v === 0 ? '' : `$${v}`),
          classes: { tickLabel: 'font-bold' },
        },
      }}
      yDomain={[0, 100]}
      data={totalBudgetaryResources}
      x="year"
      y="value"
      renderContext="svg"
    >
      {#snippet tooltip({ context })}
        <Tooltip.Root {context} class="max-w-33">
          {#snippet children({ data })}
            Total budgetary resources {data.year}: <b>${data.value}B</b>
          {/snippet}
        </Tooltip.Root>
      {/snippet}
    </BarChart>
  </div>
  <div class="container px-2">
    <LineChart
      props={{
        spline: { class: 'stroke-4 [stroke-linecap:round] [stroke-linejoin:round]' },
        xAxis: { format: (v: number) => String(v), classes: { tickLabel: 'font-bold' } },
        yAxis: {
          format: (v: number) => (v === 0 ? '' : `${v}%`),
          classes: { tickLabel: 'font-bold' },
        },
      }}
      series={[{ key: 'value', color: 'red' }]}
      data={percentageObligated}
      x="year"
      y="value"
      yDomain={[0, 100]}
      renderContext="svg"
    >
      {#snippet tooltip({ context })}
        <Tooltip.Root {context} class="max-w-33">
          {#snippet children({ data })}
            Percentage of TBR obligated {data.year}: <b>{data.value}%</b>
          {/snippet}
        </Tooltip.Root>
      {/snippet}
    </LineChart>
  </div>
</div>

<style lang="postcss">
  .container {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
