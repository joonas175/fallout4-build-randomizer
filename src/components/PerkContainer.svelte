<script lang="ts">
  import { decrementPerkLevel, incrementPerkLevel, perkLevels } from "../stores/perks";
  import { currentLvl } from "../stores/level";
  import type { Perk } from "../types/perks";
    import { editing } from "../stores/editorState";

  export let perk: Perk;
  export let specialLvl: number;

  $: currentRank = $perkLevels[perk.name]

  $: unavailableRank = !perk.ranked[currentRank] || $currentLvl < perk.ranked[currentRank].level;
  $: unavailable = specialLvl < perk.rank;
</script>

<div class="perk-container">
  <img src="../../fo4/img/{perk.img}" alt="{perk.name}" class="{ unavailable || currentRank === 0 ? 'unavailable' : '' }">
  {#if !unavailable}
    <div class="overlay">
      {#if $editing}
        <button class="btn btn-xs btn-danger" disabled={currentRank === 0}  on:click={ () => decrementPerkLevel(perk.name) }>
          <i class="glyphicon glyphicon-minus"></i>
        </button>
      {/if}
      <b>{currentRank} / {perk.ranked.length}</b>
      {#if $editing}
      <button class="btn btn-xs btn-success" disabled={unavailableRank} on:click={ () => incrementPerkLevel(perk.name) }>
        <i class="glyphicon glyphicon-plus"></i>
      </button>
      {/if}
    </div>
  {/if}
  <div class=info>
    <h4>{perk.name}</h4>
    {#each perk.ranked as rank}
    <div class="{ currentRank >= rank.rank ? '' : 'unavailable' }">
      <b>Rank {rank.rank}</b>
      {rank.description}
      (Required level: {rank.level})
    </div>
    {/each}
  </div>
</div>

<style scoped>
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
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000066;
  align-items: center;
  justify-content: space-around;
}

.info {
  display: none;
}

.info h4 {
  border-bottom: 1px solid black;
  width: 100%;
}

.perk-container:hover .info {
  position: absolute;
  top: 0;

  width: 25vw;
  right: 110%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: black 1px solid;
  z-index: 100;
}
</style>
