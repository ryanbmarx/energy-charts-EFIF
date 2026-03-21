<!-- Dev-only picker shell — not included in the shipped web component build -->
<script lang="ts">
  import * as Select from '@/lib/components/ui/select';
  import { onMount } from 'svelte';
  import { slugs, pages } from '$lib/charts';

  const slugKeys = $derived(Object.keys(slugs));
  let slug = $state('SP-Left-For-Innovation'); // Arbitrary starting point

  onMount(() => {
    // Restore last viewed chart across dev sessions
    const saved = sessionStorage.getItem('efif-charts-slug');
    if (saved && slugs[saved]) slug = saved;
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  $effect(() => {
    sessionStorage.setItem('efif-charts-slug', slug);
  });

  // Arrow keys cycle through charts for quick preview
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

<div class="container">
  <div class="select-container">
    <Select.Root bind:value={slug} type="single">
      <Select.Trigger class="h-full w-full bg-white">{slug}</Select.Trigger>
      <Select.Content>
        {#each pages as page (page)}
          <Select.Label>{page} page</Select.Label>
          {#each Object.entries(slugs).filter(([, meta]) => meta.page === page) as [s, { title }] (s)}
            <Select.Item value={s}>{title}</Select.Item>
          {/each}
        {/each}
      </Select.Content>
    </Select.Root>
  </div>

  <h2>{slugs[slug]?.title}</h2>
  <pre class="usage-hint"><code>&lt;efif-charts slug="{slug}"&gt;&lt;/efif-charts&gt;</code></pre>
</div>

<efif-charts {slug}></efif-charts>

<style>
  .container {
    display: grid;
    gap: 1rem;
    grid-template: auto auto / 20rem minmax(1px, 1fr);
    padding: 1rem;
    background-color: #eee;
    margin-bottom: 2rem;
  }

  .select-container {
    grid-column: 1;
    grid-row: 1/-1;
  }

  h2 {
    text-align: left;
    font-size: 1.5rem;
    grid-row: 1;
    grid-column: 2;
  }

  .usage-hint {
    grid-row: 2;
    grid-column: 2;
  }
</style>
