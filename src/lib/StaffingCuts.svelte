<script lang="ts">
  import StaffingCutsPie from './StaffingCutsPie.svelte';

  import { PieChart, Arc, Tooltip } from 'layerchart';
  import Swatch from './components/Swatch.svelte';
  import Legend from './Legend.svelte';

  type StaffingRow = { office: string; fte2024: number; cuts2026: number };

  const dataSeriesForHumans: Record<string, string> = {
    fte2024: '2024 FTEs',
    cuts2026: 'Proposed 2026 reductions',
  };

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

<div class="chart-wrapper">
  <Legend
    class="mb-2"
    items={[
      { color: 'white', label: 'Proposed 2026 reductions', borderColor: '#aaa' },
      { color: 'var(--blue)', label: '2024 FTEs' },
    ]}
  />
  <div class="chart">
    {#each offices as { office, fte2024, cuts2026 } (office)}
      <StaffingCutsPie {office} {fte2024} {cuts2026} {maxValue} labelPie>
        <dl>
          <dt class="flex items-center gap-2">
            <Swatch background="var(--blue)"></Swatch>
            {dataSeriesForHumans.fte2024}
          </dt>
          <dd>{fte2024}</dd>
          <dt class="flex items-center gap-2">
            <Swatch background="white"></Swatch>
            {dataSeriesForHumans.cuts2026}
          </dt>
          <dd>{cuts2026}</dd>
        </dl>
      </StaffingCutsPie>
    {/each}
  </div>
</div>

<style lang="postcss">
  .chart {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: calc(var(--spacing) * 4);
  }
  dl {
    display: grid;
    grid-template: auto auto / max-content minmax(1px, 1fr);
    gap: 0 calc(4 * var(--spacing));
  }
</style>
