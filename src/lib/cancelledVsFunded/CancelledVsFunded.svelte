<script lang="ts">
  import { BarChart } from 'layerchart';
  import { positiveData, negativeData } from './cancelledVsFunded';

  function buildSeries<T extends { name: string; [k: string]: number | string }>(data: T[]) {
    const slugs = [...new Set(data.flatMap((row) => Object.keys(row).filter((k) => k !== 'name')))];
    return slugs.map((slug) => ({
      key: slug,
      value: (d: T) => {
        const val = d[slug];
        return typeof val === 'number' ? val : 0;
      },
    }));
  }

  const positiveSeries = $derived(buildSeries(positiveData));
  const negativeSeries = $derived(buildSeries(negativeData));
</script>

<!-- <div class="chart__controls" role="menubar">Highlight technology on the chart</div> -->
<div>XXXXX</div>
<div class="chart">
  <div class="chart__arrows">^</div>
  <div class="chart__top">
    <BarChart
      data={positiveData}
      x="name"
      series={positiveSeries}
      seriesLayout="stack"
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        xAxis: { placement: 'top' },
        yAxis: { format: (v: number) => `${v < 0 ? '-' : ''}$${Math.abs(v) / 1_000_000_000}B` },
      }}
      renderContext="svg"
    ></BarChart>
  </div>
  <div class="chart__bottom">
    <BarChart
      data={negativeData}
      x="name"
      series={negativeSeries}
      seriesLayout="stack"
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        yAxis: { format: (v: number) => `${v < 0 ? '-' : ''}$${Math.abs(v) / 1_000_000_000}B` },
      }}
      axis="y"
      renderContext="svg"
    ></BarChart>
  </div>
</div>

<style lang="postcss">
  .chart {
    --arrows-width: 2rem;
    --controls-width: 7rem;
    display: grid;
    grid-template-rows: minmax(1px, 1fr) minmax(3px, 3fr);
    grid-template-columns: var(--arrows-width) minmax(1px, 1fr);
    outline: 1px solid red;
    min-height: 20rem;
    gap: 0 calc(var(--spacing) * 2);
  }

  /* .chart__controls {
    grid-column: 1;
    grid-row: 1/-1;
    background: #eee;
  } */
  .chart__arrows {
    grid-column: 1;
    grid-row: 1/-1;
    background: #eee;
  }
  .chart__top {
    grid-row: 1;
  }
  .chart__bottom {
    grid-row: 2;
  }
  .chart__top,
  .chart__bottom {
    grid-column: 2;
    outline: 1px solid blue;
  }
</style>
