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

  let mouseX = 0;
  let mouseY = 0;

  const setMousePosition = (ev: MouseEvent) => {
    mouseX = ev.pageX;
    mouseY = ev.pageY;
  }
</script>

<main>
  <a href="https://github.com/mmartinx/mmartinx.github.io/">
    Forked from mmartinx
  </a>
  <a style="float: right;" href="https://joonas.codes">
    Forked by joonas.codes
  </a>
  <nav class="navbar navbar-default">
      <div class="container-fluid">
          <div class="navbar-header">
              <a class="navbar-brand" href="#">
                  <img alt="Brand" src="../fo4/img/brand.jpg" style="height:20px;width:20px;">
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
                  <input id="save-toggle" type="checkbox" role="button" checked={ $saveAutomatically } 
                    on:change={ toggleSaveAutomatically } on:mousemove={setMousePosition}
                  />
                  {#if !$saveAutomatically}
                    <div class="warning-box" style={`left: ${mouseX + 15}px; top: ${mouseY + 15}px;`}>Toggling on will erase previous save!</div>
                  {/if}
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

.warning-box {
  display: none;
  position: fixed;
  background-color: #ff0000;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
}

#save-toggle:hover + .warning-box {
  display: block;
}
</style>
