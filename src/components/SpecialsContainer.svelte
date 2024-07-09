<script lang="ts">
  import { editing } from "../stores/editorState";
  import { bobbleheadsFoundStore, decrement, increment, specialComputedValues, toggleBobbleheadFound, type Special, specialsStore } from "../stores/special";

  export let special: Special;

  $: specialLevel = $specialsStore[special];
  $: specialValue = $specialComputedValues[special];

</script>

<li data-special="st" class="list-group-item clearfix">
  { special }
  <div>
    <label for="bobblehead">Bobblehead</label>
    <input id="bobblehead" type="checkbox" checked={ $bobbleheadsFoundStore[special] } on:change={ toggleBobbleheadFound(special) }>
  </div>

  <span class="pull-right">
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
  </span>
</li>