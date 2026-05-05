<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div v-if="backendData && Array.isArray(backendData)" class="table-container">
    <h3>Chemical Elements</h3>
    <table class="elements-table">
      <thead>
        <tr>
          <th>Atomic #</th>
          <th>Symbol</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in backendData" :key="element.id">
          <td>{{ element.atomicNumber }}</td>
          <td class="symbol">{{ element.symbol }}</td>
          <td>{{ element.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else-if="typeof backendData === 'string'" class="error">
    {{ backendData }}
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
      backendData: []
    }
  },
  mounted() {
    axios.get('http://localhost:3000/elements')
      .then(response => {
        this.backendData = response.data;
      })
      .catch(error => {
        console.error('Backend Error:', error);
        if (error.response && error.response.status === 500) {
          this.backendData = "Error: Internal Server Error (Database connection failed).";
        } else {
          this.backendData = "Error: Could not connect to the server.";
        }
      });
  },
};
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

.table-container {
  margin: 20px auto;
  max-width: 600px;
}

.elements-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.elements-table th, .elements-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.elements-table th {
  background-color: #42b983;
  color: white;
}

.symbol {
  font-weight: bold;
  color: #2c3e50;
}
</style>
