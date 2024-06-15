<script lang="ts">
  import { bobbleheadsFoundStore, decrement, increment, specialComputedValues, toggleBobbleheadFound, type Special } from "../stores/special";


  export let special: Special;

</script>

<li data-special="st" class="list-group-item clearfix">
  { special }
  <div>
    <label for="bobblehead">Bobblehead</label>
    <input id="bobblehead" type="checkbox" checked={ $bobbleheadsFoundStore[special] } on:change={ toggleBobbleheadFound(special) }>
  </div>

  <span class="pull-right">
      <button class="btn btn-primary btn-xs btn-dec" on:click={ decrement(special) }>
        <i class="glyphicon glyphicon-minus"></i>
      </button>
      <input type="number" min="1" max="10" class="form-control" readonly bind:value="{ $specialComputedValues[special] }" />
      <button class="btn btn-primary btn-xs btn-inc" on:click={ increment(special) }>
        <i class="glyphicon glyphicon-plus"></i>
      </button>
  </span>
</li>