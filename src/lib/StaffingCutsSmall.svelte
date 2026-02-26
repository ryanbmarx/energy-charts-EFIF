<script lang="ts">
  import { PieChart, Arc } from 'layerchart';
  import Swatch from './components/Swatch.svelte';

  type StaffingRow = { office: string; fte2024: number; cuts2026: number };

  const offices: StaffingRow[] = $derived.by(() => {
    return [
      { office: 'Loan Programs Office', fte2024: 220, cuts2026: 112, change: -51 },
      {
        office: 'Office of Fossil Energy and Carbon Management',
        fte2024: 573,
        cuts2026: 108,
        change: -19,
      },
      {
        office: 'Grid Deployment Office and Office of Electricity',
        fte2024: 251,
        cuts2026: 171,
        change: -68,
      },
      { office: 'Office of Nuclear Energy', fte2024: 295, cuts2026: 43, change: -15 },
    ];
  });

  const maxValue = $derived.by(() => {
    return Math.max(...offices.map(({ cuts2026, fte2024 }) => cuts2026 + fte2024));
  });
</script>

<div class="chart">
  {#each offices as { office, fte2024, cuts2026, change } (office)}
    {@const outerRadius = (fte2024 + cuts2026) / maxValue}
    {@const data = [
      { key: 'cuts2026', value: cuts2026, color: 'white' },
      { key: 'fte2024', value: fte2024, color: 'var(--blue)' },
    ]}
    {@const cRange = data.map((d) => d.color)}

    <div class="office" data-office={office} data-fte2024={fte2024} data-outerRadius={outerRadius}>
      <p class="text-center text-sm font-bold text-balance">{office}</p>
      <div class="pie">
        <PieChart
          {outerRadius}
          props={{
            pie: {
              sort: null,
            },
          }}
          innerRadius={0}
          tooltip={false}
          {data}
          renderContext="svg"
          {cRange}
        >
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
      <dl>
        <dt class="">Proposed staff reductions:</dt>
        <dd>{cuts2026}</dd>
        <dt class="">Change from 2024:</dt>
        <dd>{change}%</dd>
      </dl>
    </div>
  {/each}
</div>

<style lang="postcss">
  .chart {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: calc(var(--spacing) * 4);
  }

  .office {
    padding: calc(var(--spacing) * 4);
    display: grid;
    grid-row: span 3;
    grid-template-rows: subgrid;
    background-color: #eee;
  }

  .pie {
    width: 100%;
    aspect-ratio: 1/1;
  }

  dl {
    display: flex;
    gap: var(--spacing);
    flex-flow: column nowrap;
    align-items: center;

    max-width: 8rem;
    text-align: center;
    margin: auto;
  }

  dd {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--blue);
    line-height: 1;
  }
</style>
