<script lang="ts">
  import { PieChart, Arc, Tooltip } from 'layerchart';
  import type { Snippet } from 'svelte';
  import type { StaffingRow } from './types';

  const dataSeriesForHumans: Record<string, string> = {
    fte2024: '2024 FTEs',
    cuts2026: 'Proposed 2026 reductions',
  };

  const {
    office,
    fte2024,
    cuts2026,
    maxValue,
    children,
    labelPie = false,
  }: StaffingRow & {
    labelPie?: boolean;
    maxValue: number;
    children?: Snippet;
  } = $props();
  const outerRadius = $derived(fte2024 / maxValue);
  const pctCut = $derived(Math.round((cuts2026 / fte2024) * 100));
  const data = $derived([
    { key: 'cuts2026', value: cuts2026, color: 'white', label: 'Proposed 2026 reductions' },
    { key: 'fte2024', value: fte2024 - cuts2026, color: 'var(--blue)', label: '2024 FTEs' },
  ]);
  const cRange = $derived(data.map((d) => d.color));
</script>

<div class="office" data-office={office} data-fte2024={fte2024} data-outerRadius={outerRadius}>
  <p class="text-center text-sm font-bold text-balance">{office}</p>
  <div class="pie" style:--outer-radius="{outerRadius * 50}%">
    {#if labelPie}
      <span class="pie-label shadow"><strong>-{pctCut}%</strong> from 2024</span>
    {/if}
    <PieChart
      {outerRadius}
      props={{
        pie: {
          sort: null,
        },
      }}
      innerRadius={0}
      {data}
      renderContext="svg"
      {cRange}
    >
      {#snippet tooltip({ context })}
        <Tooltip.Root {context}>
          {#snippet children({ data })}
            {dataSeriesForHumans[data.key]}: <b>{data.value}</b>
          {/snippet}
        </Tooltip.Root>
      {/snippet}
      {#snippet arc({ props, index })}
        <Arc
          {...props}
          stroke={index === 0 ? 'var(--blue)' : 'none'}
          stroke-dasharray={index === 0 ? '4 3' : undefined}
          stroke-width={index === 0 ? 2 : undefined}
        />
      {/snippet}
    </PieChart>
  </div>
  {@render children?.()}
</div>

<style lang="postcss">
  .office {
    position: relative;
    padding: calc(var(--spacing) * 4);
    display: grid;
    grid-row: span 3;
    grid-template-rows: subgrid;
    background-color: #eee;
  }

  .pie {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .pie-label {
    position: absolute;
    /* align label's left edge with the pie's right edge */
    left: 50%;
    /* align label vertically near the top of the pie */
    top: calc(50% - var(--outer-radius));

    transform: translate(calc(4 * var(--spacing)), calc(-100% + (4 * var(--spacing))));

    font-size: var(--text-sm);
    line-height: 1.15;

    padding: calc(var(--spacing) * 2);
    background: white;
    font-size: 0.75rem;
    font-weight: bold;
    width: 5rem;
    z-index: 10;
    text-align: center;

    strong {
      font-size: var(--text-2xl);
      font-weight: 700;
    }
  }
</style>
