<template>
  <form_exchange/>
</template>

<script>
import form_exchange from './components/from-ex.vue'

export default {
  name: 'App',
  components: {
    form_exchange
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
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 100px;
}
</style>
