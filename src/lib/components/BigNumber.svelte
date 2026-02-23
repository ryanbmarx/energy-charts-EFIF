<script lang="ts">
  import { cn } from '../utils';

  const {
    leadin,
    stat,
    class: addClass = '',
    static: staticPos = false,
    textAlign = 'center',
  }: {
    textAlign?: 'center' | 'left';
    leadin?: string;
    stat?: string;
    class?: string;
    static?: boolean;
  } = $props();
</script>

<p
  class:text-center={textAlign === 'center'}
  class:text-left={textAlign === 'left'}
  class={cn('big-number text-sm', staticPos ? 'static' : 'absolute', addClass)}
>
  {#if leadin}
    {leadin}
  {/if}
  {#if stat}
    <span class="block text-2xl font-bold">{@html stat}</span>
  {/if}
</p>

<style lang="postcss">
  .big-number {
    max-width: 10rem;
    text-wrap-style: balance;
  }

  .absolute {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
