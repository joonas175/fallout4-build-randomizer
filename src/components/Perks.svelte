<script lang="ts">
    import { perksMapped } from "../stores/perks";
    import PerkColumn from "./PerkColumn.svelte";

  
  
</script>

<div class="col-md-9">
  <h3>Perks</h3>
  <div class="perks-container">
    {#each perksMapped as specialPerkTree}
      <PerkColumn special={specialPerkTree.special} perks={ specialPerkTree.perks }/>
    {/each}
  </div>
</div>

<style>
  .perks-container {
    display: flex;
  }
</style>
