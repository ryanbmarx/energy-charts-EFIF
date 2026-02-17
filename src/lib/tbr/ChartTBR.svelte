<script lang="ts">
  import { BarChart, LineChart, Tooltip, type ChartContextValue } from 'layerchart';
  import { totalBudgetaryResources, percentageObligated } from './tbrData';
  import type { Snippet } from 'svelte';

  type YearValue = { year: number; value: number };

  const {
    chartHeader,
  }: { chartHeader: Snippet<[{ header?: string; description?: string; label?: string }]> } =
    $props();

  let barContext = $state<ChartContextValue<YearValue>>();
  let lineContext = $state<ChartContextValue<YearValue>>();

  // Which chart the user is physically hovering — prevents feedback loops
  let hoverSource = $state<'bar' | 'line' | null>(null);

  /**
   * Programmatically trigger a chart's tooltip by synthesizing a PointerEvent
   * at the data point's pixel coordinates. This sets tooltip.data on the target
   * chart, which activates both the Tooltip.Root AND the Highlight system.
   */
  function showCrossTooltip(ctx: ChartContextValue<YearValue>, d: YearValue) {
    const container = ctx.containerRef;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const xPixel = ctx.xScale(d.year) ?? 0;
    const yPixel = ctx.yScale(d.value) ?? 0;
    // Add bandwidth offset for bar charts so the event lands mid-bar
    const bandOffset = 'bandwidth' in ctx.xScale ? (ctx.xScale.bandwidth as () => number)() / 2 : 0;

    const event = new PointerEvent('pointermove', {
      clientX: rect.left + ctx.padding.left + xPixel + bandOffset,
      clientY: rect.top + ctx.padding.top + yPixel,
      bubbles: true,
    });
    // showTooltip reads e.target.closest('.lc-root-container')
    Object.defineProperty(event, 'target', { value: container });

    ctx.tooltip.show(event, d);
  }

  function hideCrossTooltip(ctx: ChartContextValue<YearValue>) {
    ctx.tooltip.hide();
  }

  // Bar hover → sync to line chart
  $effect(() => {
    if (hoverSource !== 'bar' || !lineContext) return;
    const d = barContext?.tooltip?.data;
    if (d) {
      const match = percentageObligated.find((p) => p.year === d.year);
      if (match) showCrossTooltip(lineContext, match);
    } else {
      hideCrossTooltip(lineContext);
    }
  });

  // Line hover → sync to bar chart
  $effect(() => {
    if (hoverSource !== 'line' || !barContext) return;
    const d = lineContext?.tooltip?.data;
    if (d) {
      const match = totalBudgetaryResources.find((t) => t.year === d.year);
      if (match) showCrossTooltip(barContext, match);
    } else {
      hideCrossTooltip(barContext);
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="charts">
  <div
    class="chart-wrapper"
    onpointerenter={() => (hoverSource = 'bar')}
    onpointerleave={() => {
      if (hoverSource === 'bar' && lineContext) hideCrossTooltip(lineContext);
      hoverSource = null;
    }}
  >
    {@render chartHeader({
      header: "DOE's budget for energy innovation is historically high ...",
      label: 'Total budgetary resources (TBR)',
      description: 'Lorem ipsum dolor sit amet consectetur',
    })}
    <BarChart
      bind:context={barContext}
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
  <div
    class="chart-wrapper"
    onpointerenter={() => (hoverSource = 'line')}
    onpointerleave={() => {
      if (hoverSource === 'line' && barContext) hideCrossTooltip(barContext);
      hoverSource = null;
    }}
  >
    {@render chartHeader({
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident fugit quis commodi',
      label: 'Percentage of TBR obligated',
      header: "... yet the pace of DOE's implementation has not kept up.",
    })}
    <LineChart
      bind:context={lineContext}
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
  .charts {
    display: grid;
    gap: calc(var(--spacing) * 4);
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
  .chart-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
