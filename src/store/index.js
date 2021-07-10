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
        /* Formato de un objeto room
        {
            id: 77,
            name: "Pepito",
            description: null,
            isRoom: true,
            messages: [
                { senderId: 66, sender: "Pepito", message: "Hola" },
                { senderId: 1, sender: "Damian", message: "Xdddddd" },
            ],
        }
        */
        rooms: [],

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
            return state.rooms;
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
            state.rooms.push(room);
        },
        ADD_MESSAGE(state, { roomId, message }) {
            let room = state.rooms.find(
                room => room.id === roomId
            );
            room.messages.push(message);
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
                        });
                        // Cargar rooms
                        context.commit("SET_ROOMS", rooms);
                    }
                });
        },
        selectRoom(context, room) {
            context.commit('SET_SELECTED_ROOM', room);
        },
        addRoom(context, room) {
            let newRoom = {
                id: room.id,
                isRoom: true,
                name: room.name,
                description: room.description,
                messages: room.messages
            }
            // Uusado para el mensaje inicial
            newRoom.messages.unshift(
                {
                    senderId: null,
                    sender: null,
                    message: 'Welcome to the room.'
                }
            );
            context.commit('ADD_ROOM', newRoom);
        },
        // Agrega cada mensaje a la conversacion correspondiente
        addMessage(context, messageResponse) {
            // Se busca la conversacion a la que va dirigida el mensaje

            // Comprobar si es una room o conversacion entre usuarios
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
        login(context, { username, password }) {
            let data = { username: username, password: password };
            axios.post("http://localhost:8888/api/users/login", data)
                .then(function (response) {
                    // Si el request tuvo exito (codigo 200)
                    if (response.status == 200) {
                        // Cargar los datos de usuario
                        let user = {
                            id: response['data'].id,
                            username: response['data'].username,
                            email: response['data'].email, // corregir
                            token: response['data'].token
                        };
                        context.commit("SET_USER", user);
                        context.commit("SET_READY", true);
                        context.dispatch("fetchRooms");
                        context.dispatch("openSocket");
                    }
                });
        },
        openSocket(context) {
            this.socket = new SockJS('http://localhost:8888/ws/connect');
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