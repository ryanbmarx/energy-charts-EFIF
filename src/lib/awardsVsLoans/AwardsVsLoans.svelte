<script lang="ts">
  import { PieChart, Tooltip } from 'layerchart';
  import { awards, loans } from './awardsVsLoansData';
  import BigNumber from '../components/BigNumber.svelte';
  import Swatch from '../components/Swatch.svelte';

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

<div class="chart-container">
  <figure class="chart">
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
    <figcaption>
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Awards</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each awards as row (row.name)}
            <tr>
              <th scope="row">
                <Swatch background={row.color} />
                {row.name}
              </th>
              <td>{row.count}</td>
              <td>{formatAmount(row.amount)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </figcaption>
  </figure>
  <figure class="chart">
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
    <figcaption>
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Loans</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each loans as row (row.name)}
            <tr>
              <th scope="row">
                <Swatch background={row.color} />
                {row.name}</th
              >
              <td>{row.count}</td>
              <td>{formatAmount(row.amount)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </figcaption>
  </figure>
</div>

{#snippet title(text = '')}
  <p class="title text-center text-sm font-bold">{text}</p>
{/snippet}

{#snippet subtitle(text = '')}
  <p class="subtitle text-center text-sm">{text}</p>
{/snippet}

<style lang="postcss">
  .chart-container {
    display: grid;
    gap: calc(var(--spacing) * 8);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-width: 60rem;
  }

  .chart {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    margin-top: calc(var(--spacing) * 2);
  }

  .data-table {
    margin: calc(4 * var(--spacing)) auto 0 auto;
    width: 100%;

    th,
    td {
      text-align: right;
      border-bottom: 1px solid #888;
      padding: var(--spacing) 0;
    }

    th[scope='row'],
    th:first-child {
      text-align: left;
    }

    tbody {
      th,
      td {
        border-color: #ccc;
      }

      tr:last-child :is(th, td) {
        border-bottom: none;
      }
    }
  }
</style>
