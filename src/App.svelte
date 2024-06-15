<script lang="ts">
  import Perks from './components/Perks.svelte';
  import Specials from './components/Specials.svelte';
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
                  Fallout 4 Character Planner
              </a>
              <form class="navbar-form navbar-left">
                  <a href="/fo4" class="btn btn-danger">Reset</a>
              </form>
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

<style>

</style>
