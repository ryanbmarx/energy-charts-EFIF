<svelte:options
  customElement={{
    tag: 'efif-charts',
    shadow: 'open',
    props: {
      data: { attribute: 'data', reflect: true },
      slug: { attribute: 'slug', reflect: true },
      picker: { attribute: 'picker', reflect: true, type: 'Boolean' },
    },
  }}
/>

<script lang="ts">
  import * as Select from '@/lib/components/ui/select';
  import SpendingLeftForInnovation from './lib/SpendingLeftForInnovation.svelte';
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
  import { onMount } from 'svelte';
  import StaffingCutsSmall from './lib/StaffingCutsSmall.svelte';

  type Chart = {
    page: 'Home' | 'Spending' | 'Projects' | 'People';
    Component: Component;
    title: string;
  };

  const slugs: Record<string, Chart> = {
    'HP-Staffing-Cuts': {
      page: 'Home',
      Component: StaffingCuts,
      title: 'Proposed staff reductions from last full fiscal year (2024–2026)',
    },
    'HP-Staffing-Cuts-Small': {
      page: 'Home',
      Component: StaffingCutsSmall,
      title:
        'The White House Proposed Steep Staffing Cuts Even for Offices Supporting Its Technology Priorities',
    },
    'PEO-Cuts-Over-Time': {
      page: 'People',
      Component: HistoricalStaffingChanges,
      title: 'Historical changes in DOE staffing levels',
    },
    'PEO-Cost-Of-Cuts': {
      page: 'People',
      Component: ResourcesRatio,
      title: 'And leave remaining staff with historically large workloads',
    },
    FedEmployeeSpending: {
      page: 'Spending',
      Component: FedEmployeeSpending,
      title: 'Spending on federal employees only a small part of DOE budget',
    },
    'PR-Awards-Vs-Loans': {
      page: 'Projects',
      Component: AwardsVsLoans,
      title: 'Projects awards vs loans',
    },
    'PR-Cancelled-Vs-funded': {
      page: 'Projects',
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
    'SP-Left-For-Innovation': {
      page: 'Spending',
      Component: SpendingLeftForInnovation,
      title:
        'Total budgetary resources, science and energy innovation programs (excluding Loan Programs Office), 2017-2026',
    },
  };

  let { slug = 'SpendingLeftForInnovation', picker = false }: { slug?: string; picker?: boolean } =
    $props();

  const displayPicker = $derived(Boolean(picker));
  const activeComponent = $derived(slugs[slug]);
  const dropdownLabel = $derived(slug || 'Select a chart');

  const slugKeys = Object.keys(slugs);

  onMount(() => {
    if (!picker) return;
    // Restore slug from previous session in picker/preview mode
    const saved = sessionStorage.getItem('efif-charts-slug');
    if (saved && slugs[saved]) slug = saved;
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  $effect(() => {
    if (!picker) return;
    sessionStorage.setItem('efif-charts-slug', slug);
  });

  function handleKeydown(e: KeyboardEvent) {
    const current = slugKeys.indexOf(slug);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();

        slug = slugKeys[(current - 1 + slugKeys.length) % slugKeys.length];
        break;
      case 'ArrowRight':
        e.preventDefault();
        slug = slugKeys[(current + 1 + slugKeys.length) % slugKeys.length];
        break;
    }
  }
</script>

<svelte:element this={'style'}>{styles}</svelte:element>
<main class="flex flex-col justify-center gap-3">
  {#if displayPicker}
    <div class="select-container">
      <Select.Root bind:value={slug} type="single">
        <Select.Trigger>{dropdownLabel}</Select.Trigger>
        <Select.Content>
          <Select.Label>Home page</Select.Label>
          {#each Object.entries(slugs).filter(([, { page }]) => page === 'Home') as [slug, { title }] (slug)}
            {@render optionItem(slug, title)}
          {/each}
          <Select.Label>Spending page</Select.Label>
          {#each Object.entries(slugs).filter(([, { page }]) => page === 'Spending') as [slug, { title }] (slug)}
            {@render optionItem(slug, title)}
          {/each}
          <Select.Label>Projects page</Select.Label>
          {#each Object.entries(slugs).filter(([, { page }]) => page === 'Projects') as [slug, { title }] (slug)}
            {@render optionItem(slug, title)}
          {/each}
          <Select.Label>People page</Select.Label>
          {#each Object.entries(slugs).filter(([, { page }]) => page === 'People') as [slug, { title }] (slug)}
            {@render optionItem(slug, title)}
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
  {/if}

  {#if activeComponent}
    {@const { Component, title } = activeComponent}
    {#if displayPicker}
      <h2>{title}</h2>
      <div class="flex items-center gap-2 bg-amber-100 p-2">
        <span>Usage:</span>
        <pre><code>&lt;efif-charts slug="{slug}">&lt;/efif-charts></code></pre>
      </div>
    {/if}
    <Component {chartHeader} />
  {:else}
    <p>Select a chart from the dropdown</p>
  {/if}
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
  <Select.Item value={slug}>{title}</Select.Item>
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
