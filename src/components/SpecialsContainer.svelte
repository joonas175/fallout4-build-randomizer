<script lang="ts">
  import { editing } from "../stores/editorState";
  import { bobbleheadsFoundStore, decrement, increment, specialComputedValues, toggleBobbleheadFound, type Special, specialsStore, setImSpecialBook, imSpecialBook } from "../stores/special";

  export let special: Special;

  $: specialLevel = $specialsStore[special];
  $: specialValue = $specialComputedValues[special];

</script>

<div class="special-container">
  <div style="display: flex; flex-direction: row; justify-content: space-between;">
    <div class="special-name-label">
      { special }
    </div>
    <div style="display: flex; flex-direction: column;">
      <div class="special-extras-container">
        <label for="bobblehead">Bobblehead</label>
        <input id="bobblehead" type="checkbox" checked={ $bobbleheadsFoundStore[special] } on:change={ toggleBobbleheadFound(special) }>
      </div>
      <div class="special-extras-container">
        <label for="bobblehead">I'm S.P.E.C.I.A.L.</label>
        <input id="bobblehead" type="checkbox" checked={ $imSpecialBook === special } on:change={ setImSpecialBook(special) }>
      </div>
    </div>
  </div>
  <div class="level-container">
    {#if $editing}
      <button class="btn btn-primary btn-xs btn-dec" disabled={specialLevel <= 1} on:click={ () => decrement(special) }>
        <i class="glyphicon glyphicon-minus"></i>
      </button>
    {/if}
    <input type="number" min="1" max="10" class="form-control" readonly bind:value="{ specialValue }" />
    {#if $editing}
      <button class="btn btn-primary btn-xs btn-inc" disabled={specialLevel >= 10} on:click={ () => increment(special) }>
        <i class="glyphicon glyphicon-plus"></i>
      </button>
    {/if}
  </div>
</div>


<style scoped>
  .special-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 5px;
  }

  .level-container {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .special-name-label {
    font-weight: bold;
    font-size: 1.3em;
  }

  .special-extras-container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 5px;
  }
</style>