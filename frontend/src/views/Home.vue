<template>
  <div class="home">
    <div class="content">

      <div class="sidebar">
      </div>

      <div class="chatbox">
        <form action="/chat" class="formulario">
          <select name="sala" id="sala">
            <option value="react">React</option>
            <option value="vuejs">Vue.js</option>
            <option value="angular">Angular</option>
          </select>
          <input type="text" name="nome" id="nome" placeholder="Nome para o chat">
          <button type="submit">Entrar na sala</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
