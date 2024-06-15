<script lang="ts">
  import { decrementPerkLevel, incrementPerkLevel, perkLevels } from "../stores/perks";
  import type { Perk } from "../types/perks";

  export let perk: Perk;
  export let perkLvl: number;

  $: currentRank = $perkLevels[perk.name]
  let currentLevel = 1;

  $: unavailable = currentLevel < perk.ranked[currentRank].level;
</script>

<div class="perk-container">
  <img src="../../fo4/img/{perk.img}" alt="{perk.name}" class="{ unavailable || currentRank === 0 ? 'unavailable' : '' }">
  <div class="overlay">
    <button class="btn btn-xs btn-danger"  on:click={ () => decrementPerkLevel(perk.name) }>
      <i class="glyphicon glyphicon-minus"></i>
    </button>
    <button class="btn btn-xs btn-success" disabled={unavailable} on:click={ () => incrementPerkLevel(perk.name) }>
      <i class="glyphicon glyphicon-plus"></i>
    </button>
  </div>
</div>

<style>
.perk-container {
  position: relative;
  width: 100%;
}

.unavailable {
  opacity: 0.5;
  pointer-events: none;
}

.overlay {
  position: absolute;
  top: 60%;
  bottom: 80%;
  left: 0;
  right: 0;
}
</style>
