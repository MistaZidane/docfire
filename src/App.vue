<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Editor from './components/Editor/Editor.vue'
import HomeView from './views/HomeView.vue';
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <editor/> -->
<!-- <home-view/> -->
<notifications />
<router-view/>
</template>

<style scoped>

</style>
