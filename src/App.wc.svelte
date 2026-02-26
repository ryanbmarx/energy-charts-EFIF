<svelte:options customElement="svelte-app-web-component" />

<script lang="ts">
  import StaffingCuts from '$lib/StaffingCuts.svelte';
  import HistoricalStaffingChanges from '$lib//HistoricalStaffingChanges.svelte';
  import ResourcesRatio from '$lib//ResourcesRatio.svelte';
  import FedEmployeeSpending from './lib/fedEmployeeSpending/FedEmployeeSpending.svelte';
  import AwardsVsLoans from './lib/awardsVsLoans/AwardsVsLoans.svelte';
  import SPCancelledFunds from './lib/cancelledFunds/SPCancelledFunds.svelte';
  import BudgetProposalComparisons from './lib/budgetProposalComparisons/BudgetProposalComparisons.svelte';
  import ChartStaffing from './lib/staffing/ChartStaffing.svelte';
  import TBR from './lib/tbr/ChartTBR.svelte';
  import CancelledVsFunded from './lib/cancelledVsFunded/CancelledVsFunded.svelte';
  import styles from '@/app.css?inline';
  import type { Component } from 'svelte';

  type Chart = {
    page: 'Home' | 'Spending' | 'PR';
    Component: Component;
    title: string;
  };

  const slugs: Record<string, Chart> = {
    'HP-Staffing-Cuts': {
      page: 'Home',
      Component: StaffingCuts,
      title: 'Proposed staff reductions from last full fiscal year (2024–2026)',
    },
    'PEO-Cuts-Over-Time': {
      page: 'PR',
      Component: HistoricalStaffingChanges,
      title: 'Historical changes in DOE staffing levels',
    },
    'PEO-Cost-Of-Cuts': {
      page: 'PR',
      Component: ResourcesRatio,
      title: 'And leave remaining staff with historically large workloads',
    },
    FedEmployeeSpending: {
      Component: FedEmployeeSpending,
      page: 'Spending',
      title: 'Spending on federal employees only a small part of DOE budget',
    },
    'PR-Awards-Vs-Loans': { page: 'PR', Component: AwardsVsLoans, title: 'PR awards vs loans' },
    'PR-Cancelled-Vs-funded': {
      page: 'PR',
      Component: CancelledVsFunded,
      title: 'Little consistency in cancelled vs. funded technologies',
    },
    'SP-Budget-Proposal-Comparisons': {
      page: 'Spending',
      Component: BudgetProposalComparisons,
      title: 'Congress passed DOE spending that supports nuclear and grid efforts',
    },
    'SP-Funding': {
      Component: ChartStaffing,
      title: 'Staffing stacked bar chart',
      page: 'Spending',
    },
    'HP-DOE-Spending': {
      page: 'Home',
      Component: TBR,
      title: 'In 2025 DOE Spent a Small Fraction of Its Available Funding',
    },
    'SP-Cancelled-funds': {
      page: 'Spending',
      Component: SPCancelledFunds,
      title: 'Over 70% of the cancelled award funding does not expire',
    },
  };

  let { slug, picker = false }: { slug?: string; picker?: boolean } = $props();

  const displayPicker = $derived(Boolean(picker));
</script>

<svelte:element this={'style'}>{styles}</svelte:element>

{#if displayPicker}
  <div class="select-container">
    <select bind:value={slug} class="border">
      <option disabled>Select a chart</option>
      <optgroup label="Home page">
        {#each Object.entries(slugs).filter(([_, { page }]) => page === 'Home') as [slug, { title }] (slug)}
          {@render optionItem(slug, title)}
        {/each}
      </optgroup>
      <optgroup label="Spending page">
        {#each Object.entries(slugs).filter(([_, { page }]) => page === 'Spending') as [slug, { title }] (slug)}
          {@render optionItem(slug, title)}
        {/each}
      </optgroup>
      <optgroup label="Other page">
        {#each Object.entries(slugs).filter(([_, { page }]) => page === 'PR') as [slug, { title }] (slug)}
          {@render optionItem(slug, title)}
        {/each}
      </optgroup>
    </select>
  </div>
{/if}

<main class="flex flex-col gap-3">
  {#if slug && slugs[slug]}
    {@const { Component, title } = slugs[slug]}
    <h2>{title}</h2>
    <div class="flex items-center gap-2 bg-amber-100 p-2">
      <span>Usage:</span>
      <pre><code>&lt;svelte-app-web-component slug="{slug}">&lt;/svelte-app-web-component></code
        ></pre>
    </div>
    <Component {chartHeader} />
  {/if}
  <!-- <h2>Staffing</h2>
  <ChartStaffing {chartHeader} />
  
  
  <h2>Congress passed DOE spending that supports nuclear and grid efforts</h2>
  <BudgetProposalComparisons></BudgetProposalComparisons>


  -->
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
{#snippet optionItem(slug = '', title = '')}
  <option value={slug}>{title}</option>
{/snippet}

<style lang="postcss">
  :is(.chart-header, .chart-description) + .chart-label {
    margin-top: calc(4 * var(--spacing));
  }

  h2 {
    text-align: center;
    text-decoration: underline;
    font-size: 2rem;
  }

  .select-container {
    padding: 1rem;
    width: 100%;
    background-color: #eee;
    border: 1px solid #aaa;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }
</style>
