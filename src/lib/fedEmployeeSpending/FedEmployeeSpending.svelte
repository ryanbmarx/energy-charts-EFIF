<script lang="ts">
  import BigNumber from '../components/BigNumber.svelte';
</script>

<div class="chart">
  <div class="overall">
    <div class="innovation"></div>
    <BigNumber stat="$30.5B" leadin="Overall DOE spending in science and innovation (2024)"
    ></BigNumber>
  </div>
  <BigNumber
    textAlign="left"
    stat="2% <small>($0.7B)</small>"
    leadin="Science and innovation staff costs (salaries and benefits)"
    static
  ></BigNumber>
</div>

<style lang="postcss">
  .chart {
    display: flex;
    gap: calc(4 * var(--spacing));
    align-items: flex-end;
  }

  .overall {
    flex: 1 1;
    background: #e7e8e9;
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
  }

  .innovation {
    aspect-ratio: 1/1;
    background-color: #60a5a2;
    /* area = 2% of parent square: side = √0.02 × parent_side */
    width: calc(sqrt(0.02) * 100%);
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
