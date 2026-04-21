<script lang="ts">
  import { BarChart } from 'layerchart';

  const data = [
    { year: 'FY25', staffingFTE: 4547 },
    { year: 'FY26 (est.)', staffingFTE: 3778 },
    { year: 'FY27 (req.)', staffingFTE: 3870 },
  ];

  const labelFormat = (v: number) => v.toLocaleString('en-US');
  const axisFormat = (v: number) => (v === 0 ? '' : `${(v / 1000).toFixed(1)}k`);
</script>

<div class="chart-container">
  <div class="chart">
    <BarChart
      {data}
      x="year"
      y="staffingFTE"
      cRange={['var(--middle-green)']}
      labels={{ format: labelFormat, style: 'font-weight: bold; font-size: .75rem;' }}
      tooltip={false}
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        xAxis: { format: 'none', classes: { tickLabel: 'font-bold' } },
        yAxis: {
          format: axisFormat,
          classes: { tickLabel: 'font-bold text-muted-foreground' },
        },
      }}
      renderContext="svg"
      padding={{ left: 28, bottom: 30, top: 30 }}
    />
  </div>
</div>

<style lang="postcss">
  .chart-container {
    max-width: 60rem;
  }
  .chart {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
</style>
