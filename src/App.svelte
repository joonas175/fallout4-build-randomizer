<script lang="ts">
  import Perks from './components/Perks.svelte';
  import Specials from './components/Specials.svelte';
  import { currentLvl } from './stores/level';
  import { copyBuildURL, init, resetAll, saveAutomatically, toggleEditing, toggleSaveAutomatically } from './stores/editorState';
  import { randomize } from './stores/randomizer';
    import { onMount } from 'svelte';

  onMount(() => {
    init();
  });
</script>

<main>
  <a href="https://github.com/mmartinx/mmartinx.github.io/">
    Forked from mmartinx
  </a>
  <nav class="navbar navbar-default">
      <div class="container-fluid">
          <div class="navbar-header">
              <a class="navbar-brand" href="#">
                  <img alt="Brand" src="img/brand.jpg" style="height:20px;width:20px;">
              </a>
              <a class="navbar-brand" href="#">
                  Fallout 4 Character Randomizer
              </a>
              <button class="btn btn-danger" on:click={ () => resetAll() }>
                Reset
              </button>
              <button class="btn btn-warning" on:click={toggleEditing}>
                Toggle edit mode
              </button>
              <button class="btn btn-success" on:click={() => copyBuildURL()}>
                Copy build URL
              </button>
              <h2>
                Level {$currentLvl}

                <button class="btn btn-primary" on:click={randomize}>
                  Randomize {$currentLvl === 0 ? " SPECIALs" : ''}
                </button>

                <div class="save-container">
                  Save automatically
                  <input type="checkbox" checked={ $saveAutomatically } on:change={ toggleSaveAutomatically }/>
                </div>
              </h2>
          </div>
      </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <Specials></Specials>
      <Perks></Perks>
    </div>
  </div>
</main>

<style scoped>
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.save-container {
  font-size: 0.5em;
}
</style>
