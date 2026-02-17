<script lang="ts">
  import { BarChart } from 'layerchart';
  import type { Snippet } from 'svelte';
  import { budgetByYear, orgs } from './staffingData';

  const {
    chartHeader,
  }: { chartHeader: Snippet<[{ header?: string; description?: string; label?: string }]> } =
    $props();
  const series = $derived.by(() => {
    return Object.entries(orgs).map(([key, { color }]) => {
      return { key, color };
    });
  });

  /*
  export const orgs = {
  OEERE: 'Office of Energy Efficiency and Renewable Energy, Etc.',
  OFECM: 'Office of Fossil Energy and Carbon Management',
  GDOOE: 'Grid Deployment Office and Office of Electricity',
  ONE: 'Office of Nuclear Energy',
  OCED: 'Office of Clean Energy Demonstrations',
  other: 'Other innovation',
  OOS: 'Office of science',
} as const;
  */
</script>

<div class="container">
  {@render chartHeader({ label: 'Spending money' })}
  <BarChart
    data={budgetByYear}
    props={{
      bars: {
        class: 'stroke-none',
        rounded: 'none',
      },
      xAxis: { format: 'none', classes: { tickLabel: 'font-bold' } },
      yAxis: {
        format: (v: number) => (v === 0 ? '' : `$${v}B`),
        classes: { tickLabel: 'font-bold' },
      },
    }}
    {series}
    x="year"
    seriesLayout="stack"
    renderContext="svg"
  ></BarChart>
</div>

<style lang="postcss">
  .container {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
