<script lang="ts">
  import VerticalSwitch from './VerticalSwitch.svelte';
  import { segments } from './budgetProposalData';

  type Segment = (typeof segments)[number];
  type HoveredDot = { segment: Segment; budget: 'wh' | 'cong' };

  // d3-format uses G for 10^9, not B — simpler to roll our own
  function formatMoney(v: number): string {
    function withSuffix(n: number, suffix: string): string {
      const two = n.toFixed(2);
      // drop one trailing zero (.00 → .0, .10 → .1) but keep at least one decimal
      return `$${two.endsWith('0') ? n.toFixed(1) : two}${suffix}`;
    }
    if (Math.abs(v) >= 1e9) return withSuffix(v / 1e9, 'B');
    if (Math.abs(v) >= 1e6) return withSuffix(v / 1e6, 'M');
    return withSuffix(v / 1e3, 'K');
  }

  let highlightCongress = $state(false);
  let tooltipVisible = $state(false);
  let tooltipX = $state(0);
  let tooltipY = $state(0);
  let hoveredDot = $state<HoveredDot | null>(null);

  // plain let — only read in event handlers, not reactive expressions
  let containerEl: HTMLElement;
  let tooltipEl: HTMLElement;

  // domain is [-100, +20], x maps to [0, 100%] — same scale as the _x fields
  const gridLines = Array.from({ length: 7 }, (_, i) => {
    const labelPos = -100 + i * 20;
    //         label: labelPos === 0 ? 'Change from enacted 2025 DOE budget' : labelPos,

    return {
      label: labelPos === 0 ? 'Change from enacted 2025 DOE budget' : `${labelPos}%`,
      x: ((labelPos + 100) / 120) * 100,
      highlight: labelPos === 0,
    };
  });

  function showTooltip(dot: HoveredDot) {
    hoveredDot = dot;
    tooltipVisible = true;
  }

  function hideTooltip() {
    tooltipVisible = false;
  }

  // clamp so tooltip never escapes the container bounds
  function trackMouse(event: MouseEvent) {
    if (!tooltipEl) return;
    const { left, top, width } = containerEl.getBoundingClientRect();
    const { width: tw, height: th } = tooltipEl.getBoundingClientRect();
    const pad = 8;
    tooltipX = Math.max(pad, Math.min(event.clientX - left + pad, width - tw - pad));
    tooltipY = Math.max(pad, event.clientY - top - th - pad);
  }
</script>

<svelte:window onmousemove={trackMouse} />
<div class="segments-container" bind:this={containerEl}>
  <VerticalSwitch bind:checked={highlightCongress}></VerticalSwitch>
  <ul class="segments">
    <li class="segment">
      <div class="segment__dots">
        {#each gridLines as { x, label, highlight } (x)}
          <span class="gridline" class:highlight style:left="{x}%">
            <span>{label}</span>
          </span>
        {/each}
      </div>
    </li>
    {#each segments as segment (segment.name)}
      {@const { name, slug, diff_percentage_white_house_x, diff_percentage_final_bill_x } = segment}
      {@const bridgeWidth = Math.abs(diff_percentage_white_house_x - diff_percentage_final_bill_x)}
      <li class="segment">
        <span class="segment__name">{name}</span>
        <div class="segment__dots">
          <span
            class="bridge"
            style:--x="{diff_percentage_white_house_x}%"
            style:width="{bridgeWidth}%"
          ></span>
          <button
            data-segment={slug}
            data-budget="wh"
            class="dot dot--wh"
            class:highlight={!highlightCongress}
            style:--x="{diff_percentage_white_house_x}%"
            aria-label="TKTKTK"
            onmouseenter={() =>
              showTooltip({
                segment,
                budget: 'wh',
              })}
            onmouseleave={hideTooltip}
          ></button>
          <button
            class="dot dot--cong"
            data-segment={slug}
            data-budget="cong"
            class:highlight={highlightCongress}
            style:--x="{diff_percentage_final_bill_x}%"
            aria-label="TKTKTK"
            onmouseenter={() =>
              showTooltip({
                segment,
                budget: 'cong',
              })}
            onmouseleave={hideTooltip}
          ></button>
        </div>
      </li>
    {/each}
  </ul>

  <!-- visibility:hidden keeps it in DOM so dimensions are measurable for clamping -->
  <div
    class="tooltip"
    bind:this={tooltipEl}
    style:left="{tooltipX}px"
    style:top="{tooltipY}px"
    style:visibility={tooltipVisible ? 'visible' : 'hidden'}
    aria-hidden={!tooltipVisible}
  >
    {#if hoveredDot}
      <span class="tooltip__name">{hoveredDot.segment.name}</span>
      <dl>
        <dt>2025 enacted</dt>
        <dd class="tooltip__enacted">{formatMoney(hoveredDot.segment.enacted)}</dd>
        <dt>White House proposal</dt>
        <dd>
          <span class="tooltip__pct tooltip__pct--wh"
            >{hoveredDot.segment.diff_percentage_white_house.toFixed(1)}%</span
          >
          ({formatMoney(hoveredDot.segment.diff_absolute_white_house)})
        </dd>
        <dt>Congress approved</dt>

        <dd>
          <span class="tooltip__pct tooltip__pct--cong"
            >{hoveredDot.segment.diff_percentage_final_bill.toFixed(1)}%</span
          >
          ({formatMoney(hoveredDot.segment.diff_absolute_final_bill)})
        </dd>
      </dl>
    {/if}
  </div>
</div>

<style lang="postcss">
  .gridline {
    position: absolute;
    bottom: 0;
    transform: translate(-50%, 0);
    text-align: center;
    text-wrap: balance;
    max-width: 9rem;
    font-size: 0.75rem;
    font-weight: bold;

    &:last-child {
      transform: translate(-100%, 0);
    }
    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 100vh;
      background-color: var(--color-border);
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &.highlight::after {
      width: 2px;
      background-color: black;
    }
  }

  .segments-container {
    --color-wh: #f1572e;
    --color-cong: #15678e;
    position: relative;
    overflow: hidden;
  }

  .segments {
    display: grid;
    gap: calc(var(--spacing) * 4);
    grid-template-columns: 15rem minmax(1px, 1fr);
  }
  .segment {
    grid-column: 1/-1;
    display: grid;
    gap: inherit;
    grid-template-columns: subgrid;
    position: relative;
    min-height: calc(var(--spacing) * 8);

    &:not(:first-child)::after {
      content: '';
      display: block;
      height: 1px;
      background-color: var(--color-border);
      width: 100%;

      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
    }

    .segment__name {
      grid-column: 1;
      padding-right: calc(var(--spacing) * 2);
      background: white;
      text-wrap-style: balance;
      position: relative;
      z-index: 2;
      text-align: right;
    }

    .segment__dots {
      position: relative;
      grid-column: 2/-1;
    }
  }

  .dot {
    display: block;
    height: calc(var(--spacing) * 8);
    width: calc(var(--spacing) * 8);
    border-radius: 50%;
    background: var(--color-zinc-400);
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: var(--x);
    transform: translate(-50%, -50%);

    z-index: 3;
  }

  .dot--wh.highlight {
    background-color: var(--color-wh);
  }
  .dot--cong.highlight {
    background-color: var(--color-cong);
  }

  .bridge {
    display: block;
    height: calc(var(--spacing) * 8);
    position: absolute;
    top: 50%;
    left: var(--x);
    width: var(--width);
    transform: translate(0, -50%);
    z-index: 2;
    background-color: #aaa2;
  }

  .tooltip {
    line-height: 1.3em;
    position: absolute;
    pointer-events: none;
    background: white;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 0.875rem;
    text-wrap: balance;
    width: 20rem;
    z-index: 10;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);

    .tooltip__name {
      font-weight: bold;
    }

    .tooltip__enacted {
      font-weight: bold;
    }

    .tooltip__pct {
      font-weight: bold;
    }

    .tooltip__pct--wh {
      color: var(--color-wh);
    }

    .tooltip__pct--cong {
      color: var(--color-cong);
    }

    dl {
      display: grid;
      gap: 0 calc(var(--spacing) * 2);
      grid-template-columns: max-content minmax(1px, 1fr);

      dt::after {
        content: ':';
      }
    }
  }
</style>
