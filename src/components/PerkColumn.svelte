<script lang="ts">
  import type { Special } from "../stores/special";
  import type { Perk } from "../types/perks";
  import PerkContainer from "./PerkContainer.svelte";

  
  export let special: Special;
  export let perks: Perk[];

</script>

<div class="perk-column">
<h3>{ special }</h3>
  <div>
    {#each perks as perk}
      <PerkContainer perk={perk} />
    {/each }
  </div>
</div>

<style>
  .perk-column {
    flex: 1;
  }
  h3 {
    margin-block: 0 0;
  }
</style>
