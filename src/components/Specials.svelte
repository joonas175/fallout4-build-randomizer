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
