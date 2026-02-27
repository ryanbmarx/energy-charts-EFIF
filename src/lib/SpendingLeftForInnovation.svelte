<script lang="ts">
  import { BarChart, Tooltip } from 'layerchart';
  import { formatMoney } from '@/utils/format-money';

  type Entry = {
    year: number;
    totalBudgetaryResources: number;
    obbbaRescissions?: number;
  };

  const data: Entry[] = [
    { year: 2017, totalBudgetaryResources: 12086717931 },
    { year: 2018, totalBudgetaryResources: 13623271547 },
    { year: 2019, totalBudgetaryResources: 14460163025 },
    { year: 2020, totalBudgetaryResources: 15816234666 },
    { year: 2021, totalBudgetaryResources: 16143089697 },
    { year: 2022, totalBudgetaryResources: 59078364205 },
    { year: 2023, totalBudgetaryResources: 76933018041 },
    { year: 2024, totalBudgetaryResources: 81438867259 },
    { year: 2025, totalBudgetaryResources: 79376394751, obbbaRescissions: 1795803085 },
    { year: 2026, totalBudgetaryResources: 66904000000 },
  ];

  const series = [
    {
      key: 'totalBudgetaryResources',
      color: 'var(--middle-green)',
    },
    { key: 'obbbaRescissions', color: 'var(--red)' },
  ];
</script>

<div class="chart-container">
  <BarChart
    {data}
    props={{
      bars: {
        class: 'stroke-none',
        rounded: 'none',
      },
      xAxis: { format: 'none', classes: { tickLabel: 'text-muted-foreground font-bold' } },
      yAxis: {
        format: formatMoney,
        classes: { tickLabel: 'font-bold text-muted-foreground ' },
      },
    }}
    {series}
    x="year"
    seriesLayout="stack"
    renderContext="svg"
  >
    {#snippet tooltip({ context })}
      <Tooltip.Root {context}>
        {#snippet children({ data })}
          <p>{data.year}: <b>{formatMoney(data.totalBudgetaryResources)}</b></p>
          {#if (data.obbbaRescissions ?? 0) > 0}
            <p>Rescissions: <b>{formatMoney(data.obbbaRescissions ?? 0)}</b></p>
          {/if}
        {/snippet}
      </Tooltip.Root>
    {/snippet}
  </BarChart>
</div>

<style lang="postcss">
  .chart-container {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
