<script lang="ts">
  import { PieChart, Tooltip } from 'layerchart';
  import { awards, loans } from './awardsVsLoansData';
  import BigNumber from '../components/BigNumber.svelte';

  function formatAmount(v: number) {
    return v >= 1e9 ? `$${(v / 1e9).toFixed(1)} billion` : `$${Math.round(v / 1e6)} million`;
  }

  const chartProps = {
    props: {
      pie: {
        sort: null,
      },
    },
    key: 'name',
    value: 'amount',
    innerRadius: -80,
    outerRadius: 0,
    cornerRadius: 0,
    padAngle: 0.0,
    renderContext: 'svg' as const,
    debug: false,
  };
</script>

<div class="charts">
  <div class="chart-container">
    {@render title('DOE award selections')}
    {@render subtitle('1/20/25-1/20/26')}
    <div class="chart">
      <PieChart data={awards} cRange={awards.map((d) => d.color)} {...chartProps}>
        {#snippet tooltip({ context })}
          <Tooltip.Root {context}>
            {#snippet children({ data })}
              <p class="max-w-20">
                {data.name}<br />({data.count} awards): <b>{formatAmount(data.amount)}</b>
              </p>
            {/snippet}
          </Tooltip.Root>
        {/snippet}
      </PieChart>
      <BigNumber stat="$3.58B"></BigNumber>
    </div>
  </div>
  <div class="chart-container">
    {@render title('DOE loans closed')}
    {@render subtitle('1/20/25-1/20/26')}
    <div class="chart">
      <PieChart data={loans} cRange={loans.map((d) => d.color)} {...chartProps}>
        {#snippet tooltip({ context })}
          <Tooltip.Root {context}>
            {#snippet children({ data })}
              <p class="max-w-20">
                {data.name}<br />({data.count} loans): <b>{formatAmount(data.amount)}</b>
              </p>
            {/snippet}
          </Tooltip.Root>
        {/snippet}
      </PieChart>
      <BigNumber stat="$4.10B"></BigNumber>
    </div>
  </div>
</div>

{#snippet title(text = '')}
  <p class="title text-center text-sm font-bold">{text}</p>
{/snippet}

{#snippet subtitle(text = '')}
  <p class="subtitle text-center text-sm">{text}</p>
{/snippet}

<style lang="postcss">
  .charts {
    display: grid;
    gap: calc(var(--spacing) * 4);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .chart {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    margin-top: calc(var(--spacing) * 2);
  }
</style>
