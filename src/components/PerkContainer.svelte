<script lang="ts">
  import type { Perk } from "../types/perks";

  export let perk: Perk;
</script>

<div class="perk-container">
  <img src="../../fo4/img/{perk.img}" alt="{perk.name}">
</div>

<style>
.perk-container {
  width: 100%;
}
</style>
