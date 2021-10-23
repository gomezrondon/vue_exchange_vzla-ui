<template>
  <algo/>
</template>

<script>
import form_exchange from './components/from-ex.vue'
import algo from './components/UploadFiles.vue'

export default {
  name: 'App',
  components: {
    algo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 100px;
}
</style>
