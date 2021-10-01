import { io } from "./http";

interface salaUsuario {
  socket_id: string,
  nome: string,
  sala: string
}

interface Message {
  id: number,
  sala: string,
  texto: string,
  dataCriacao: Date,
  nome: string
}

const usuarios: salaUsuario[] = []

const mensagens: Message[] = []

io.on("connection", socket => {

  socket.on("seleciona_sala", data => {

    socket.join(data.sala)

    const usuarioNaSala = usuarios.find(usuario => usuario.nome === data.nome && usuario.sala === data.sala)

    if(usuarioNaSala) {
      usuarioNaSala.socket_id = socket.id
    } else {
      usuarios.push({
        sala: data.sala,
        nome: data.nome,
        socket_id: socket.id
      })
    }

    console.log(usuarios)
    io.to(data.sala).emit("usuarios_online", usuarios)
  })

  socket.on("message", data => {
    // Salvar as mensagens
    const mensagem: Message = {
      id: mensagens.length + 1,
      sala: data.sala,
      nome: data.nome,
      texto: data.mensagem,
      dataCriacao: new Date()
    }

    mensagens.push(mensagem)

    console.log(mensagens)

    // Enviar para os usuários da sala
    io.to(data.sala).emit("message", mensagem)
  })
})