import type { Component } from 'svelte';
import SpendingLeftForInnovation from './SpendingLeftForInnovation.svelte';
import StaffingCuts from './staffing-cuts/StaffingCuts.svelte';
import StaffingCutsSmall from './staffing-cuts/StaffingCutsSmall.svelte';
import HistoricalStaffingChanges from './HistoricalStaffingChanges.svelte';
import ResourcesRatio from './ResourcesRatio.svelte';
import FedEmployeeSpending from './fedEmployeeSpending/FedEmployeeSpending.svelte';
import AwardsVsLoans from './awardsVsLoans/AwardsVsLoans.svelte';
import SPCancelledFunds from './cancelledFunds/SPCancelledFunds.svelte';
import BudgetProposalComparisons from './budgetProposalComparisons/BudgetProposalComparisons.svelte';
// import ChartStaffing from './staffing/ChartStaffing.svelte';
import TBR from './tbr/ChartTBR.svelte';
import CancelledVsFunded from './cancelledVsFunded/CancelledVsFunded.svelte';

export type Page = 'Home' | 'Spending' | 'Projects' | 'People';

export type Chart = {
  page: Page;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: Component<any>; // components have varied prop shapes; typed at the call site
};

export const slugs: Record<string, Chart> = {
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
  'HP-DOE-Spending': {
    page: 'Home',
    Component: TBR,
    title: 'In 2025 DOE Spent a Small Fraction of Its Available Funding',
  },
  FedEmployeeSpending: {
    page: 'Spending',
    Component: FedEmployeeSpending,
    title: 'Spending on federal employees only a small part of DOE budget',
  },
  'SP-Budget-Proposal-Comparisons': {
    page: 'Spending',
    Component: BudgetProposalComparisons,
    title: 'Congress passed DOE spending that supports nuclear and grid efforts',
  },
  // 'SP-Funding': {
  //   page: 'Spending',
  //   Component: ChartStaffing,
  //   title: 'Staffing stacked bar chart',
  // },
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
};

export const pages: Page[] = ['Home', 'Spending', 'Projects', 'People'];
