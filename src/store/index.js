import axios from 'axios'
import Vue from "vue"
import Vuex from "vuex"
import SockJS from "sockjs-client"
import Stomp from "webstomp-client"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Datos del usuario que utiliza la app
        appUser: { id: null, username: null, email: null, token: null },

        // Al inicio de la aplicacion (mientras se carga al abrir la url)
        // la app no puede ser usada porque los datos no se han cargado
        // por lo que usaremos el flag para determinar si la app termino de cargar
        appReady: false,

        // Lista con todas las salas
        rooms: {},

        // Puede ser una sala o conversacion con otro usuario
        selectedRoom: null,

        // Socket para mantener intercambiar datos con el servidor
        socket: null,
        stompClient: null
    },
    getters: {
        isAppReady: (state) => {
            return state.appReady;
        },
        isLogged: (state) => {
            if (state.appUser.token === null) {
                return false;
            }
            return true;
        },
        getSelectedRoom: (state) => {
            return state.selectedRoom;
        },
        getRooms: (state) => {
            return Object.keys(state.rooms).map(
                id => state.rooms[id]
            );
        },
        getRoom: (state) => (roomId) => {
            return state.rooms[roomId];
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.appUser = user;
        },
        SET_READY(state) {
            state.appReady = true;
        },
        // Selecciona una conversacion
        SET_SELECTED_ROOM(state, room) {
            state.selectedRoom = room;
        },
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        ADD_ROOM(state, room) {
            Vue.set(state.rooms, room.id, room);
        },
        // Se agrega el mensaje a la sala a la que va dirigida el mensaje
        ADD_MESSAGE(state, { roomId, message }) {
            state.rooms[roomId].messages.push(message);
        }
    },
    actions: {
        fetchRooms(context) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + context.state.appUser.token;
            axios.get("http://localhost:8888/api/rooms/list")
                .then(function (response) {
                    // Si el request tuvo exito (codigo 200)
                    if (response.status == 200) {
                        let rooms = response['data']
                        rooms.forEach(room => {
                            room.isRoom = true;
                            room.messages = [
                                {
                                    senderId: null,
                                    sender: null,
                                    message: 'Welcome to the chat.'
                                }
                            ];
                            // Agregar sala
                            context.commit("ADD_ROOM", room);
                        });
                    }
                });
        },
        selectRoom(context, room) {
            context.commit('SET_SELECTED_ROOM', room);
        },
        addRoom(context, room) {
            //room.isRoom = true;
            // Usado para el mensaje inicial
            room.messages.unshift(
                {
                    senderId: null,
                    sender: null,
                    message: 'Welcome to the room.'
                }
            );
            context.commit('ADD_ROOM', room);
        },
        // Agrega cada mensaje a la conversacion correspondiente
        addMessage(context, messageResponse) {
            context.commit('ADD_MESSAGE', {
                roomId: messageResponse.roomId,
                message: {
                    senderId: messageResponse.senderId,
                    sender: messageResponse.sender,
                    message: messageResponse.message,
                    sent_at: messageResponse.sent_at
                }
            });
        },
        // Despues de un login con exito, se inicializa la app
        initApp(context, data) {
            // data es un user en JSON
            let user = {
                id: data.id,
                username: data.username,
                email: data.email, // corregir
                token: data.token
            };
            context.commit("SET_USER", user);
            context.dispatch("fetchRooms");
            context.dispatch("openSocket");
            context.commit("SET_READY", true);
        },
        async login(context, { username, password }) {
            let data = { username: username, password: password };
            return await axios.post("http://localhost:8888/api/users/login", data)
                .then(function (response) {
                    // Si el request tuvo exito (codigo 200)
                    if (response.status == 200) {
                        // Cargar los datos de usuario
                        return {
                            status: response.status,
                            data: response.data
                        };
                    }
                }).catch(function (error) {
                    return {
                        status: error.response.status,
                        message: error.response.data.message
                    };
                });
        },
        async register(context, { username, password, email }) {
            let data = { username: username, password: password, email: email };
            return await axios.post("http://localhost:8888/api/users/registration", data)
                .then(function (response) {
                    return {
                        status: response.status,
                        data: response.data
                    };
                })
                .catch(function (error) {
                    return {
                        status: error.response.status,
                        message: error.response.data.message
                    };
                });
        },
        openSocket(context) {
            this.socket = new SockJS('http://localhost:8888/ws/connect?token=' + context.state.appUser.token);

            this.stompClient = Stomp.over(this.socket);
            let dis = this;

            this.stompClient.connect({}, function (frame) {
                // Subscribirse al endpoint /room/message 
                // hara que todo lo que se envie a ese 
                // path sea reenviado a todos los subscriptores
                dis.stompClient.subscribe('/room/message',
                    function (response) {
                        context.dispatch("addMessage", JSON.parse(response.body));
                    });
            });
        },
        closeSocket() {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
            }
        },
        sendMessage(context, messageRequest) {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send(
                    "/ws/app/chat",
                    JSON.stringify(messageRequest), //body
                    {}); // header
            }
        },

    }
})