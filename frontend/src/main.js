import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { io } from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

/* export const SocketInstance = socketio('http://localhost:3000',
  {
    transports: ['websocket'],
    query: {
      token: window.localStorage.getItem('auth')
    }
  }
)

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
})) */

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  query: {
    token: window.localStorage.getItem('auth')
  }
})

Vue.use(VueSocketIOExt, socket)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
