<script lang="ts">
  import BigNumber from '../components/BigNumber.svelte';

  import { PieChart } from 'layerchart';
  import { data } from './cancelledFundsData';

  const totals = $derived.by(() => {
    const expires = data.reduce((acc, { expires, amount }) => {
      if (expires) acc += amount;
      return acc;
    }, 0);
    const doesNot = data.reduce((acc, { expires, amount }) => {
      if (!expires) acc += amount;
      return acc;
    }, 0);

    return [
      { name: 'doesNot', amount: doesNot, color: '--dark-blue' },
      { name: 'expires', amount: expires, color: '--transparent' },
    ];
  });

  const totalCancelled = $derived(data.reduce((acc, { amount }) => (acc += amount), 0));
</script>

<div class="container">
  <div class="charts">
    <div class="chart chart--inner">
      <PieChart
        {data}
        props={{
          pie: {
            sort: null,
          },
        }}
        key="name"
        value="amount"
        innerRadius={-80}
        outerRadius={-30}
        cornerRadius={0}
        padAngle={0.02}
        renderContext="svg"
        debug={false}
        tooltip={false}
        cRange={data.map((d) => `var(${d.color})`)}
      ></PieChart>
    </div>
    <div class="chart chart--outer">
      <PieChart
        props={{
          pie: {
            sort: null,
          },
        }}
        data={totals}
        key="name"
        value="amount"
        innerRadius={-20}
        outerRadius={0}
        cornerRadius={0}
        padAngle={0.02}
        renderContext="svg"
        debug={false}
        tooltip={false}
        cRange={totals.map((d) => `var(${d.color})`)}
      ></PieChart>
      <BigNumber leadin="Total cancelled award funding:" stat="${totalCancelled}B"></BigNumber>
    </div>
  </div>

  <dl class="legend">
    {#each data as { name, amount, color } (name)}
      <div>
        <dt>
          {@render swatch(`var(${color})`)}
          {name}
        </dt>
        <dd>${amount}</dd>
      </div>
    {/each}
    <div class="border-t pt-4">
      <dt>
        {@render swatch(`var(--dark-blue)`)}
        <span class="sr-only">Does not expire</span>
      </dt>
      <dd>More than 70% of the cancelled award funding does not expire.</dd>
    </div>
  </dl>
</div>

{#snippet swatch(background: string)}
  <span role="presentation" class="swatch" style:background> </span>
{/snippet}

<style lang="postcss">
  .swatch {
    flex: 0 0 1rem;
    height: 1em;
    width: 1em;
    display: inline-block;
  }

  .container {
    --dark-blue: #0e4c82;
    --transparent: #fff0;
    --middle-green: #60a4a1;
    --light-green-1: #abcbca;
    --light-green-2: #dbe8e8;
    display: flex;
    gap: calc(var(--spacing) * 6);
    flex-wrap: wrap;
  }
  .legend {
    flex: 1 1 fit-content;
    min-width: 20rem;
    max-width: 20rem;

    display: flex;
    flex-flow: column nowrap;
    gap: calc(var(--spacing) * 4);

    dt {
      display: inline;
    }

    dt::after {
      content: ':';
    }

    dd {
      display: inline;
      font-weight: bold;
    }
  }

  .charts {
    flex: 1 1 20rem;
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
  }
  .chart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
</style>
