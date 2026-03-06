<script lang="ts">
  import { BarChart, Tooltip } from 'layerchart';

  // Ratio of total budgetary resources to federal staff, by year
  type YearRatio = {
    year: number;
    value: number;
    annotation?: string;
    annotationIcon?: string;
    calloutW?: number; // override default CALLOUT_W
    calloutH?: number; // override default CALLOUT_H
    calloutDx?: number; // shift callout left/right from computed position
    calloutDy?: number; // shift callout up/down from computed position
  };

  const data: YearRatio[] = [
    {
      year: 2017,
      value: 4.7,
      annotationIcon: 'A',
      annotation:
        'In <b>FY17</b>, the average federal employee managed a portfolio with ~$5 million to disburse.',
      calloutW: 170,
      calloutH: 100,
      calloutDy: -20,
    },
    { year: 2018, value: 5.8 },
    { year: 2019, value: 6.4 },
    { year: 2020, value: 7.1 },
    { year: 2021, value: 7.1 },
    {
      year: 2022,
      value: 24.5,
      annotationIcon: 'B',
      annotation: 'By <b>2022</b>, that number was five times higher.',
    },
    { year: 2023, value: 26.0 },
    { year: 2024, value: 26.8 },
    { year: 2025, value: 27.7 },
    {
      year: 2026,
      value: 35.7,
      annotationIcon: 'C',
      annotation: 'Proposed staff cuts would raise that number by another 33%.',
      calloutDx: -40,
    },
  ];

  const CALLOUT_W = 200;
  const CALLOUT_H = 80;
  const LINE_LEN = 20;
</script>

<div class="chart-container">
  <BarChart
    {data}
    props={{
      bars: {
        class: 'stroke-none [fill:var(--middle-green)]',
        rounded: 'none',
      },
      highlight: { bar: { class: 'fill-bar-highlight' } },
      xAxis: { classes: { tickLabel: 'font-bold text-muted-foreground' } },
      yAxis: {
        ticks: [0, 10, 20, 30, 40],
        format: (v: number) => (v === 0 ? '' : `$${v}`),
        classes: { tickLabel: 'font-bold text-muted-foreground' },
      },
    }}
    padding={{ left: 35, top: 30, right: 0, bottom: 20 }}
    x="year"
    y="value"
    renderContext="svg"
  >
    {#snippet aboveMarks({ context })}
      {#if context.containerWidth >= 500}
        {@const narrow = context.containerWidth < 800}
        {#each data as entry (entry.year)}
          {@const y = narrow ? context.yScale(entry.value) - 4 : context.yScale(entry.value) + 12}
          <!-- Label above each bar; pointer-events off to preserve tooltip hover -->
          <text
            {y}
            x={(context.xScale(entry.year) ?? 0) + (context.xScale.bandwidth?.() ?? 0) / 2}
            text-anchor="middle"
            dominant-baseline="auto"
            font-size="11"
            font-weight="bold"
            fill={narrow ? 'black' : 'white'}
            pointer-events="none">${entry.value}</text
          >
        {/each}
        <!-- Icon badges (A/B/C) above annotated bars, matching the annotation list style -->
        {#each data as entry (entry.year)}
          {#if entry.annotationIcon}
            {@const cx =
              (context.xScale(entry.year) ?? 0) + (context.xScale.bandwidth?.() ?? 0) / 2}
            {@const barTopY = context.yScale(entry.value)}
            <!-- In narrow mode the value label sits above the bar, so push icon higher -->
            {@const iconCy = narrow ? barTopY - 28 : barTopY - 14}
            <circle {cx} cy={iconCy} r="10" fill="black" pointer-events="none" />
            <text
              x={cx}
              y={iconCy}
              text-anchor="middle"
              dominant-baseline="central"
              font-size="10"
              font-weight="bold"
              fill="white"
              pointer-events="none">{entry.annotationIcon}</text
            >
          {/if}
        {/each}
        <!-- Annotation callouts: short stub line + floating text box -->
        <!-- {#each data as entry (entry.year)}
          {#if entry.annotation}
            {@const cx =
              (context.xScale(entry.year) ?? 0) + (context.xScale.bandwidth?.() ?? 0) / 2}
            {@const barTopY = context.yScale(entry.value)}
            {@const w = entry.calloutW ?? CALLOUT_W}
            {@const h = entry.calloutH ?? CALLOUT_H}
            <!-- If too close to top, drop callout inside the bar instead - ->
            {@const calloutAbove = barTopY - LINE_LEN - h >= 2}
            {@const calloutY =
              (calloutAbove ? barTopY - LINE_LEN - h : barTopY + LINE_LEN) + (entry.calloutDy ?? 0)}
            {@const calloutX =
              Math.max(2, Math.min(cx - w / 2, context.containerWidth - w - 2)) +
              (entry.calloutDx ?? 0)}
            {#if calloutAbove}
              <!-- Short stub near bar top only; gap between stub and callout is intentional - ->
              <line
                x1={cx}
                y1={barTopY - 4}
                x2={cx}
                y2={barTopY - 14}
                stroke="currentColor"
                stroke-width="1"
                stroke-dasharray="3,2"
                pointer-events="none"
              />
            {/if}
            <foreignObject x={calloutX} y={calloutY} width={w} height={h}>
              <p class="callout">
                {@html entry.annotation}
              </p>
            </foreignObject>
          {/if}
        {/each} -->
      {/if}
    {/snippet}
    {#snippet tooltip({ context })}
      <Tooltip.Root {context} class="max-w-33">
        {#snippet children({ data })}
          {data.year}: <b>{data.value}x</b>
        {/snippet}
      </Tooltip.Root>
    {/snippet}
  </BarChart>
</div>

<div class="annotations-container">
  <ul class="annotations">
    {#each data.filter((d) => d.annotation) as { year, annotation, annotationIcon } (year)}
      <li data-icon={annotationIcon}><span>{@html annotation}</span></li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .chart-container,
  .annotations-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 60rem;
    margin: 0 auto;
  }

  .annotations-container {
    container-type: inline-size;
  }

  .annotations {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(2 * var(--spacing));

    /* icon+text grid always applies so stacked mobile view also gets the badge layout */
    li {
      --dimension: calc(6 * var(--spacing));
      text-wrap-style: balance;
      display: grid;
      gap: calc(2 * var(--spacing));
      grid-template-columns: var(--dimension) minmax(1px, 1fr);
    }

    li::before {
      content: attr(data-icon);
      width: var(--dimension);
      max-width: var(--dimension);
      height: var(--dimension);
      display: flex;
      justify-content: center;
      align-items: center;
      background: black;
      color: white;
      border-radius: 50%;
      flex: 0 0 var(--dimension);
      font-weight: bold;
      font-size: 0.75rem;
    }
  }

  /* side-by-side only when container is wide enough */
  @container (min-width: 500px) {
    .annotations {
      display: flex;
      gap: calc(var(--spacing) * 4);

      li {
        flex: 1 1;
      }
    }
  }
</style>
