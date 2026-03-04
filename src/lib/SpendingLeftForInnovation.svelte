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
    padding={{ left: 42, top: 20, bottom: 40 }}
  >
    {#snippet aboveMarks({ context })}
      {#if context.containerWidth >= 500}
        {@const narrow = context.containerWidth < 800}
        {#each data as entry (entry.year)}
          {@const y = narrow
            ? context.yScale(entry.totalBudgetaryResources + (entry.obbbaRescissions ?? 0)) - 4
            : context.yScale(entry.totalBudgetaryResources) + 4}

          <!-- Label atop each totalBudgetaryResources bar; pointer-events off to preserve tooltip hover -->
          <text
            {y}
            x={(context.xScale(entry.year) ?? 0) + (context.xScale.bandwidth?.() ?? 0) / 2}
            text-anchor="middle"
            dominant-baseline={narrow ? 'auto' : 'hanging'}
            font-size="11"
            font-weight="bold"
            fill={narrow ? 'black' : 'white'}
            pointer-events="none">{formatMoney(entry.totalBudgetaryResources, 1)}</text
          >
        {/each}
      {/if}
    {/snippet}
    {#snippet tooltip({ context })}
      <Tooltip.Root {context}>
        {#snippet children({ data })}
          <p>{data.year}: <b>{formatMoney(data.totalBudgetaryResources)}</b></p>
          {#if (data.obbbaRescissions ?? 0) > 0}
            <p style:color="var(--red)">
              Rescissions: <b>{formatMoney(data.obbbaRescissions ?? 0)}</b>
            </p>
          {/if}
        {/snippet}
      </Tooltip.Root>
    {/snippet}
  </BarChart>
</div>

<style lang="postcss">
  .chart-container {
    max-width: 60rem;
    aspect-ratio: 16 / 9;
  }
</style>
