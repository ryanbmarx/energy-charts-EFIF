<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';

  let {
    segments,
    selectedSegment = $bindable(),
  }: {
    segments: Set<string>;
    selectedSegment: string | undefined;
  } = $props();

  const selectedSegmentLabel = $derived(selectedSegment || 'Select a segment to highlight');
</script>

<div class="callout md:hidden" role="menubar">
  <Select.Root type="single" bind:value={selectedSegment}>
    <Select.Trigger class="w-full min-w-4 flex-1 bg-white md:hidden"
      >{selectedSegmentLabel}</Select.Trigger
    >
    <Select.Content
      portalProps={{
        disabled: true,
      }}
    >
      {#each segments as segment (segment)}
        <Select.Item value={segment}>{segment}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>

<style lang="postcss">
  .callout {
    /* padding: calc(4 * var(--spacing)); */
    /* background: var(--color-amber-50); */
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: calc(2 * var(--spacing));
  }
</style>
