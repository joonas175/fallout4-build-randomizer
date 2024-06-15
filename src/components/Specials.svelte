<script lang="ts">
  import { Special } from "../stores/special";
  import SpecialContainer from "./SpecialsContainer.svelte";

  const specials = Object.values(Special);
</script>

<div class="col-md-3">
  <h3>S.P.E.C.I.A.L.</h3>
  <ul class="list-group list-special">
    {#each specials as special}
      <SpecialContainer special={special} />
    {/each}
  </ul>
  <h4>Summary:</h4>
  Required level: <span class="required-level">1</span>
  <ul class="summary">

  </ul>
</div>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
