<svelte:options customElement="svelte-app-web-component" />

<script lang="ts">
  import FedEmployeeSpending from './lib/fedEmployeeSpending/FedEmployeeSpending.svelte';

  import AwardsVsLoans from './lib/awardsVsLoans/AwardsVsLoans.svelte';

  import SPCancelledFunds from './lib/cancelledFunds/SPCancelledFunds.svelte';

  import BudgetProposalComparisons from './lib/budgetProposalComparisons/BudgetProposalComparisons.svelte';

  import ChartStaffing from './lib/staffing/ChartStaffing.svelte';
  import TBR from './lib/tbr/ChartTBR.svelte';

  import styles from '@/app.css?inline';
  import CancelledVsFunded from './lib/cancelledVsFunded/CancelledVsFunded.svelte';
</script>

<svelte:element this={'style'}>{styles}</svelte:element>

<main>
  <h2>TBR</h2>
  <TBR {chartHeader} />
  <h2>Proposed DOE job cuts</h2>
  <p>TKTK</p>
  <h2>Staffing</h2>
  <ChartStaffing {chartHeader} />

  <h2>Congress passed DOE spending that supports nuclear and grid efforts</h2>
  <BudgetProposalComparisons></BudgetProposalComparisons>
  <h2>Over 70% of the cancelled award funding does not expire</h2>
  <SPCancelledFunds></SPCancelledFunds>
  <h2>PR awards vs loans</h2>
  <AwardsVsLoans></AwardsVsLoans>
  <h2>Little consistency in cancelled vs. funded technologies</h2>
  <CancelledVsFunded></CancelledVsFunded>
  <h2>Spending on federal employees only a small part of DOE budget</h2>
  <FedEmployeeSpending></FedEmployeeSpending>
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

  h2 {
    margin: 3rem 0;
    border-top: 1px solid #aaa;
    padding-top: 3rem;
    text-align: center;
    text-decoration: underline;
    font-size: 2rem;
  }
</style>
