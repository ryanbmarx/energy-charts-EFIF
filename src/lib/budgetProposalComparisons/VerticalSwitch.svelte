<script lang="ts">
  let { checked = $bindable(false) }: { checked: boolean } = $props();
  const id = String(Math.random());
</script>

<div class="switcher">
  <input {id} class="sr-only" type="checkbox" bind:checked />
  <label
    for={id}
    class="switch"
    aria-label="Toggle emphasis of the budget decisions"
    style:--color-switch={checked ? 'var(--color-cong)' : 'var(--color-wh)'}
  ></label>
  <span class="switch-label" class:switch-label--wh={!checked}>White House 2026 budget request</span
  >
  <span class="switch-label" class:switch-label--cong={checked}>What Congress approved</span>
</div>

<style lang="postcss">
  .switcher {
    --switch-width: 2rem;
    display: grid;
    gap: 0 calc(var(--spacing) * 2);
    grid-template-rows: repeat(2, auto);
    grid-template-columns: var(--switch-width) minmax(1px, 1fr);
  }

  .switch {
    grid-column: 1;
    grid-row: 1/-1;
    color: var(--color-zinc-900);
    border: 1px solid currentColor;
    border-radius: 50vw;
    position: relative;
    cursor: pointer;
  }

  .switch::after {
    content: '';
    display: block;
    width: calc(var(--switch-width) - 6px);
    height: calc(var(--switch-width) - 6px);
    background-color: var(--color-switch);
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, 0);

    transition:
      top 75ms ease-in-out,
      transform 75ms ease-in-out;
      background-color 75ms ease-in-out;
  }

  input:checked + .switch::after {
    top: calc(100% - 3px);
    transform: translate(-50%, -100%);
  }

  .switch-label {
    color: var(--color-zinc-400);
    font-weight: bold;
    &.switch-label--wh {
      color: var(--color-wh);
    }
    &.switch-label--cong {
      color: var(--color-cong);
    }
  }
</style>
