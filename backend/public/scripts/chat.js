const socket = io()

const app = new Vue({
  el: '#app',
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    MessageChannel() {
      socket.on("message", data => {
        console.log(data)
        this.mensagens.push({
          sala: data.sala,
          nome: data.nome,
          texto: data.texto,
          data: dayjs(data.dataCriacao).format("HH:mm")
        })
      })
    }
  },
  data: {
    persons: [
      {
        imagem: 'http://vzkiss.com/demo/chatbox/images/avatar/avatar_1.jpg',
        nome: 'Sacha Griffin',
        ultimaMensagem: 'Super deep status message blah blah',
        numMensagens: 11
      },
      {
        imagem: 'http://vzkiss.com/demo/chatbox/images/avatar/avatar_2.jpeg',
        nome: 'Debby Jones',
        ultimaMensagem: 'New day, fresh start, fresh eadaf',
        numMensagens: 0
      },
      {
        imagem: 'http://vzkiss.com/demo/chatbox/images/avatar/avatar_3.jpg',
        nome: 'Sarah White',
        ultimaMensagem: 'Life becomes more peaceful when',
        numMensagens: 0
      },
      {
        imagem: 'http://vzkiss.com/demo/chatbox/images/avatar/avatar_4.jpeg',
        nome: 'Johhny McGrump',
        ultimaMensagem: 'Please do not disturb',
        numMensagens: 0
      },
      {
        imagem: 'http://vzkiss.com/demo/chatbox/images/avatar/avatar_5.jpg',
        nome: 'Tommy Tom',
        ultimaMensagem: 'On vacation for two weeks',
        numMensagens: 0
      }
    ],
    conversa: true,
    mensagens: [],
    info: {}
  },
  mounted () {
    this.urlSearch()
  },
  methods: {
    enviaMensagem () {     
      if(this.info.mensagem !== "") {
        socket.emit("message", this.info)

        this.info.mensagem = ''
      }
    },
    urlSearch () {
      const urlSearch = new URLSearchParams(window.location.search);
      this.info.nome = urlSearch.get("nome");
      this.info.sala = urlSearch.get("sala");

      socket.emit("seleciona_sala", {
        nome: this.info.nome,
        sala: this.info.sala
      })
    }
  }
})