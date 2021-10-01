<template>
  <div id="chat">
    <div class="content">
      <div class="sidebar">
        <div class="search-form-container">
          <form class="search-form" action="" method="">
            <span class="magnifier">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M228 68.7c-68.5 0-124 55.5-124 124 0 68.5 55.5 124 124 124 68.5 0 124-55.5 124-124C352 124.2 296.5 68.7 228 68.7zM228 283.3c-50 0-90.6-40.6-90.6-90.6 0-50 40.6-90.6 90.6-90.6s90.6 40.6 90.6 90.6C318.6 242.7 278 283.3 228 283.3z"
                  class="a"
                />
                <path
                  d="M392.8 414.3c6.1 9.2 4.1 21.3-4.4 26.9 -8.5 5.7-20.5 2.8-26.6-6.4l-88.6-133.2c-6.1-9.2-4.1-21.3 4.4-26.9 8.5-5.7 20.5-2.8 26.6 6.4L392.8 414.3z"
                  class="a"
                />
              </svg>
            </span>

            <label for="search">Search</label>
            <input id="search" name="search" type="text" placeholder="Search" />
          </form>
        </div>

        <div class="contacts">
          <nav class="contacts-nav">
            <ul>
              <li><a href="">Contatos</a></li>
              <li>
                <router-link to="/">Sair</router-link>
              </li>
            </ul>
          </nav>

          <ul class="contact-list" v-if="persons.length !== 0">
            <li
              class="person"
              v-for="(prsn, idx) in persons"
              :key="idx"
            >

              <span class="avatar" @click="abreConversa(person.socket_id)">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" :alt="prsn.nome" />
                <span class="status online"></span>
              </span>

              <span class="info" @click="abreConversa(person.socket_id)">
                <span class="name">{{ prsn.nome }}</span>
                <span class="status-msg">{{ prsn.ultimaMensagem }}</span>
              </span>

            </li>
          </ul>
          <ul class="contact-list" v-else>
            <li class="person" style="text-align: center;">Nenhum usuário online</li>
          </ul>
        </div>
      </div>

      <div class="chatbox">
        <div class="person" style="text-align: center;">
          <h2>{{ this.info.sala }}</h2>
        </div>

        <div class="chatbox-messages">
          <div v-for="(msgs, index) in filterMensagens" :key="index">
            <div v-if="msgs.type === 'send'" v-html="msgs.texto"></div>

            <div v-else v-html="msgs.texto"></div>
          </div>
        </div>

        <div class="message-form-container">
          <div class="message-form">
            <textarea
              id="message"
              name="message"
              placeholder="Escreva sua mensagem aqui..."
              v-model="mensagem"
              @keyup.enter="enviaMensagem"
              autofocus
            ></textarea>
          </div>
          <!-- /.search-form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      conversa: false,
      mensagem: ''
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    message (data) {
      if (data.nome === this.info.nome) {
        const texto = `<div class="messages clear">
              <div class="user">
                <div class="message-container">
                  <div class="message">
                    <p>${data.texto}</p>
                  </div>
                  <span class="delivered">${dayjs(data.dataCriacao).format('HH:mm')}</span>
                </div>
              </div>
            </div>`

        this.mensagens.push({
          type: 'send',
          texto
        })
      } else {
        const texto = `<div class="messages clear">
              <span class="avatar">
                <img
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                />
              </span>
              <div class="sender">
                <div class="message-container">
                  <div class="message">
                    <p>${data.texto}</p>
                    <strong style="margin-left: 100px;">${data.nome}</strong>
                  </div>
                  <span class="delivered">${dayjs(data.dataCriacao).format('HH:mm')}</span>
                </div>
              </div>
            </div>`

        this.mensagens.push({
          type: 'received',
          texto
        })
      }
    },
    usuarios_online (data) {
      this.setPerson(data)
    }
  },
  mounted () {
    this.urlSearch()
  },
  computed: {
    ...mapGetters({
      info: 'getInfo',
      persons: 'getPersons',
      mensagens: 'getMensagens'
    }),
    filterMensagens () {
      return this.mensagens.filter(o1 =>
        this.mensagens.some(o2 => o1.id === o2.id)
      )
    }
  },
  methods: {
    ...mapActions({
      setInfo: 'setInfo',
      setPerson: 'setPerson'
    }),
    abreConversa (id) {
      this.conversa = true
    },
    enviaMensagem () {
      if (this.mensagem !== '') {
        this.setInfo({
          mensagem: this.mensagem,
          nome: this.info.nome,
          sala: this.info.sala
        })

        this.$socket.client.emit('message', this.info)

        this.mensagem = ''
      }
    },
    urlSearch () {
      const urlSearch = new URLSearchParams(window.location.search)

      this.setInfo({
        nome: urlSearch.get('nome'),
        sala: urlSearch.get('sala')
      })

      this.$socket.client.emit('seleciona_sala', {
        nome: this.info.nome,
        sala: this.info.sala
      })
    }
  }
}
</script>
