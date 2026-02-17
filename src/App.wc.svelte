<svelte:options customElement="svelte-app-web-component" />

<script lang="ts">
  import ChartStaffing from './lib/staffing/ChartStaffing.svelte';
  import TBR from './lib/tbr/ChartTBR.svelte';

  import styles from '@/app.css?inline';
</script>

<svelte:element this={'style'}>{styles}</svelte:element>

<main>
  <TBR {chartHeader} />
  <ChartStaffing {chartHeader} />
</main>

{#snippet chartHeader({ header = '', description = '', label = '' })}
  {#if header}
    <p class="chart-header text-sm font-bold">{header}</p>
  {/if}
  {#if description}
    <p class="chart-description text-sm">{description}</p>
  {/if}
  {#if label}
    <p class="chart-label mb-2 text-sm font-bold italic">{label}</p>
  {/if}
{/snippet}

<style lang="postcss">
  :is(.chart-header, .chart-description) + .chart-label {
    margin-top: calc(4 * var(--spacing));
  }
</style>
