<svelte:options customElement="svelte-app-web-component" />

<script lang="ts">
  import TBR from './lib/tbr/ChartTBR.svelte';

  import styles from '@/app.css?inline';
</script>

<svelte:element this={'style'}>{styles}</svelte:element>

<main>
<TBR />
</main>

<style lang="postcss">
</style>
