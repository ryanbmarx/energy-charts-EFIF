<script lang="ts">
  import { PieChart, Arc } from 'layerchart';
  import Swatch from './lib/components/Swatch.svelte';

  type StaffingRow = { office: string; fte2024: number; cuts2026: number };

  const offices: StaffingRow[] = $derived.by(() => {
    return [
      { office: 'Office of Science', fte2024: 817, cuts2026: 217 },
      { office: 'Office of Energy Efficiency and Renewable Energy', fte2024: 761, cuts2026: 375 },
      { office: 'Office of Fossil Energy and Carbon Management', fte2024: 573, cuts2026: 108 },
      { office: 'Office of Nuclear Energy', fte2024: 295, cuts2026: 43 },
      { office: 'Grid Deployment Office and Office of Electricity', fte2024: 251, cuts2026: 171 },
      { office: 'Office of Clean Energy Demonstrations', fte2024: 234, cuts2026: 224 },
      { office: 'Loan Programs Office', fte2024: 220, cuts2026: 112 },
      { office: 'Other Innovation', fte2024: 109, cuts2026: 30 },
    ].sort((a, b) => {
      const aSum = a.cuts2026 + a.fte2024;
      const bSum = b.cuts2026 + b.fte2024;
      return bSum - aSum;
    });
  });

  const maxValue = $derived.by(() => {
    return Math.max(...offices.map(({ cuts2026, fte2024 }) => cuts2026 + fte2024));
  });
</script>

<div class="chart">
  {#each offices as { office, fte2024, cuts2026 } (office)}
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
        <dt class="flex items-center gap-2">
          <Swatch background="var(--blue)"></Swatch>
          2024 FTEs
        </dt>
        <dd>{fte2024}</dd>
        <dt class="flex items-center gap-2">
          <Swatch background="white"></Swatch>
          Proposed 2026 reductions
        </dt>
        <dd>{cuts2026}</dd>
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
    display: grid;
    grid-template: auto auto / max-content minmax(1px, 1fr);
    gap: 0 calc(4 * var(--spacing));
  }
</style>
