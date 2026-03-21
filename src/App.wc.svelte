<svelte:options
  customElement={{
    tag: 'efif-charts',
    shadow: 'open',
    props: {
      data: { attribute: 'data', reflect: true },
      slug: { attribute: 'slug', reflect: true },
    },
  }}
/>

<script lang="ts">
  import styles from '@/app.css?inline';
  import { slugs } from '$lib/charts';

  let { slug = 'SP-Left-For-Innovation' }: { slug?: string } = $props();

  const activeComponent = $derived(slugs[slug]);
</script>

<svelte:element this={'style'}>{styles}</svelte:element>
<main class="flex flex-col justify-center gap-3">
  {#if activeComponent}
    {@const { Component } = activeComponent}
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

<style lang="postcss">
  :is(.chart-header, .chart-description) + .chart-label {
    margin-top: calc(4 * var(--spacing));
  }
</style>
