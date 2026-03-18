<script lang="ts">
  import Legend from '../Legend.svelte';
  import StaffingCutsPie from './StaffingCutsPie.svelte';
  import type { StaffingRow } from './types';

  const offices: StaffingRow[] = $derived.by(() => {
    return [
      { office: 'Loan Programs Office', fte2024: 220, cuts2026: 112, change: -51 },
      {
        office: 'Office of Fossil Energy and Carbon Management',
        fte2024: 573,
        cuts2026: 108,
      },
      {
        office: 'Grid Deployment Office and Office of Electricity',
        fte2024: 251,
        cuts2026: 171,
      },
      { office: 'Office of Nuclear Energy', fte2024: 295, cuts2026: 43 },
    ];
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
    {#each offices as { office, fte2024, cuts2026, change } (office)}
      <StaffingCutsPie {office} {fte2024} {cuts2026} {maxValue}>
        <dl>
          <dt class="">Proposed staff reductions:</dt>
          <dd>{cuts2026}</dd>
          <dt class="">Change from 2024:</dt>
          <dd>{Math.round((-cuts2026 / fte2024) * 100)}%</dd>
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
