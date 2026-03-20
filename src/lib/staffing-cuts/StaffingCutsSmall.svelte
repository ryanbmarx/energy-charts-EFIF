<script lang="ts">
  import StaffingCuts from './StaffingCuts.svelte';

  const highlights = new Set([
    'Loan Programs Office',
    'Office of Fossil Energy and Carbon Management',
    'Grid Deployment Office and Office of Electricity',
    'Office of Nuclear Energy',
  ]);
</script>

<StaffingCuts {highlights} />
