<script lang="ts">
  let {
    selectedSegment = $bindable(),
    segments,
    label,
  }: {
    segments: Set<string>;
    selectedSegment: string | undefined;
    label: string;
  } = $props();
</script>

<div class="segments">
  {#if label}
    <p class="text-muted-foreground mb-2 text-center text-sm text-balance italic">{label}</p>
  {/if}
  <ul class="segments__btns hidden md:block">
    {#each segments as segment (segment)}
      {@const highlight = segment === selectedSegment}
      <li>
        <button class="segment" class:highlight onclick={() => (selectedSegment = segment)}
          >{segment}</button
        >
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .segments {
    --btn-color: #6d6e71;
    flex: none;
    min-width: 10rem;
  }
  .segments__btns {
    display: flex;
    flex-flow: column nowrap;
    gap: calc(var(--spacing) * 2);
  }

  .segment {
    border-radius: 50vw;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
    border: 1px solid var(--btn-color);
    cursor: pointer;
    width: 100%;

    &:hover {
      background-color: #eee;
    }
    &.highlight {
      background: var(--btn-color);
      color: white;
    }
  }
</style>
