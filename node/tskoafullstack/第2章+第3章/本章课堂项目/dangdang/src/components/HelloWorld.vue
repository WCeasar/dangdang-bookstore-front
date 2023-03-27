<script setup lang="ts">
import { ref } from 'vue'
import getImg from '../utils/imgUtil'
import { test } from '../utils/test.js'
import pkjson from './mypackage.json'
defineProps<{ msg: string }>()
const count = ref(0)
</script>

<template>
  <h1 class="one">{{ msg }}asdf</h1>
  <img :src="getImg('白夜行.png')" />
  <p class="test">
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    See
    <code>README.md</code> for more information.
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code>
    to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

.one {
  color: blue;
}

.test {
  color: red;
  font-size: 0.3rem;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
