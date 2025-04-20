<template>
  <div v-if="isLoading">Cargando devices...</div>
  <div v-else-if="error">{{ error }}</div>
  <ul v-else>
    <li v-for="d in dataTable" :key="d.SigfoxId">
      {{ d.aliasDeviceType }} - {{ d.SigfoxId }}
    </li>
  </ul>
</template>

<script setup>
  const clientId = '51742590-5703-4a34-a2ba-f8a7bc863981'
  const { dataTable, isLoading, error, refresh } = useDevices(clientId)
</script>

<style scoped>
  .login-container {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    text-align: left;
    margin-bottom: 5px;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Para que el padding no aumente el ancho total */
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #3e8e41;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>