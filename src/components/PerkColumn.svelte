<script lang="ts">
  import { specialComputedValues, type Special } from "../stores/special";
  import type { Perk } from "../types/perks";
  import PerkContainer from "./PerkContainer.svelte";

  
  export let special: Special;
  export let perks: Perk[];

</script>

<div class="perk-column">
<h3>{ special }</h3>
  <div>
    {#each perks as perk}
      <PerkContainer perk={perk} specialLvl={$specialComputedValues[special]}/>
    {/each }
  </div>
</div>

<style>
  .perk-column {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 25vh;
  }
  h3 {
    margin-block: 0 0;
  }
</style>
