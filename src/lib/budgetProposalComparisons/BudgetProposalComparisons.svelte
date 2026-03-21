<script lang="ts">
  import { BarChart, Tooltip } from 'layerchart';
  import { segments } from './budgetProposalData';
  import { formatMoney } from '@/utils/format-money';

  // Flatten segment data for layerchart; tooltip needs the extra fields
  const chartData = segments.map((s) => ({
    name: s.name,
    enacted: s.enacted,
    wh: s.diff_percentage_white_house,
    cong: s.diff_percentage_final_bill,
    whAbs: s.diff_absolute_white_house,
    congAbs: s.diff_absolute_final_bill,
  }));

  // WH (green) is the tall bar behind; Congress (blue) is shorter and sits centered on top
  const series = [
    { key: 'wh', label: 'White House proposal', color: 'var(--light-green-1)' },
    {
      key: 'cong',
      label: 'Congress approved',
      color: 'var(--blue)',
      props: { insets: { top: 12, bottom: 12 } },
    },
  ];
</script>

<div class="chart-container">
  <div class="chart">
    <BarChart
      data={chartData}
      y="name"
      orientation="horizontal"
      {series}
      renderContext="svg"
      padding={{ left: 240, bottom: 30, top: 10, right: 20 }}
      props={{
        bars: { class: 'stroke-none', rounded: 'none' },
        grid: { x: true, y: true },
        xAxis: {
          format: (v: number) => `${v}%`,
          tickMarks: false,
          tickLabelProps: { style: 'font-weight: bold' },
        },
        yAxis: {
          tickMarks: false,
          tickMultiline: true,
          tickLabelProps: { width: 220, style: 'font-size: 14px', lineHeight: '1.15em', dx: -8 },
        },
      }}
    >
      {#snippet tooltip({ context })}
        <Tooltip.Root {context} class="max-w-72 text-sm">
          {#snippet children({ data })}
            <p class="mb-1 font-bold">{data.name}</p>
            <dl class="tooltip-dl">
              <dt>2025 enacted</dt>
              <dd>{formatMoney(data.enacted)}</dd>
              <dt style:color="var(--middle-green)">WH proposal</dt>
              <dd>{data.wh.toFixed(1)}% ({formatMoney(data.whAbs)})</dd>
              <dt style:color="var(--blue)">Congress approved</dt>
              <dd>{data.cong.toFixed(1)}% ({formatMoney(data.congAbs)})</dd>
            </dl>
          {/snippet}
        </Tooltip.Root>
      {/snippet}
    </BarChart>
  </div>
</div>

<style lang="postcss">
  .chart-container {
    max-width: 60rem;
  }

  .chart {
    width: 100%;
    aspect-ratio: 4 / 3;
  }

  .tooltip-dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0 0.5rem;

    dt::after {
      content: ':';
    }
  }
</style>
