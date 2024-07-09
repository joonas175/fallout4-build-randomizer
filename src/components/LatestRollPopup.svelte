<script lang="ts">
  import { lastRoll } from "../stores/randomizer";

  $: name = typeof $lastRoll === 'string' ? $lastRoll : $lastRoll?.name;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-overlay" style={$lastRoll ? '' : 'display: none;'} on:click|self={() => lastRoll.set(null)}>
  <div class="last-roll">
    <h1> {name} </h1>
    {#if typeof $lastRoll === 'string'}
      <p> S.P.E.C.I.A.L. Attribute </p>
    {:else if $lastRoll}
      <img src={new URL(`../../fo4/img/${$lastRoll.img}`, import.meta.url).href} alt={$lastRoll.name}/>
    {/if}
    <button class="btn btn-success" on:click={() => lastRoll.set(null)}>Close</button>
  </div>
</div>


<style>
.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
}

.last-roll {
  width: min(90%, 400px);
  height: min(90%, 300px);
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
