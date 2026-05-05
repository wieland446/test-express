<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div v-if="backendData">
    <h3>Backend Status:</h3>
    <pre>{{ backendData }}</pre>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      backendData: null
    }
  },
  mounted() {
    axios.get('http://localhost:3000/elements')
      .then(response => {
        this.backendData = response.data;
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
        this.backendData = "Error: Could not connect to the server.";
      });
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
}
</style>
