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
        conversations: [],

        // Puede ser una sala o conversacion con otro usuario
        selectedConversation: null,

        // Socket ...
        socket: null,
        stompClient: null
    },
    getters: {
        isAppReady: (state) => {
            return state.appReady;
        },
        getSelectedConversation: (state) => {
            return state.selectedConversation;
        },
        getConversations: (state) => {
            return state.conversations;
        },
        isLogged: (state) => {
            if (state.appUser.id === null) {
                return false;
            }
            return true;
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
        SET_SELECTED_CONVERSATION(state, conversation) {
            state.selectedConversation = conversation;
        },
        ADD_CONVERSATION(state, conversation) {
            state.conversations.push(conversation);
        },
        SET_CONVERSATIONS(state, conversations) {
            state.conversations = conversations;
        },
        ADD_MESSAGE(state, { conversationId, message }) {
            let fconversation = state.conversations.find(
                conversation => conversation.id === conversationId
            );
            fconversation.messages.push(message);
        }
    },
    actions: {
        selectConversation(context, conversation) {
            context.commit('SET_SELECTED_CONVERSATION', conversation);
        },
        addConversation(context, conversation) {
            let newConversation = {
                id: conversation.id,
                name: conversation.name,
                isRoom: false,
                messages: conversation.messages
            }
            // Uusado para el mensaje inicial
            newConversation.messages.unshift(
                {
                    senderId: null,
                    sender: null,
                    message: 'Welcome to the chat.'
                }
            );
            context.commit('ADD_CONVERSATION', newConversation);
        },
        addConversations(context, conversations) {
            //rooms.array.forEach(room => {
            //context.addRoom(room);
            //});
            context.commit('SET_CONVERSATIONS', conversations);
        },
        // Agrega cada mensaje a la conversacion correspondiente
        addMessage(context, messageResponse) {
            // Se busca la conversacion a la que va dirigida el mensaje

            // Comprobar si es una room o conversacion entre usuarios
            context.commit('ADD_MESSAGE', {
                conversationId: messageResponse.roomId,
                message: {
                    senderId: messageResponse.senderId,
                    sender: messageResponse.sender,
                    message: messageResponse.message
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
                            email: response['data'].username, // corregir
                            token: response['data'].token
                        };
                        context.commit("SET_USER", user);
                        context.commit("SET_READY", true);
                        context.dispatch("fetchRooms");
                        context.dispatch("connectSocket");
                    }
                });
        },
        connectSocket(context) {
            this.socket = new SockJS('http://localhost:8888/ws/connect');
            this.stompClient = Stomp.over(this.socket);
            let dis = this;

            this.stompClient.connect({}, function (frame) {
                console.log("Connected to the socket!");
                // Subscribirse a /room/message hara que todo lo que 
                // se envie a ese path sea reenviado a todos los 
                // subscriptores
                dis.stompClient.subscribe('/room/message',
                    function (response) {
                        context.dispatch("addMessage", JSON.parse(response.body));
                    });
            });
        },
        disconnectSocket(context) {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
            }
            console.log("Disconnected");
        },
        sendMessage(context, messageRequest) {
            console.log("Enviando: " + messageRequest);
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send(
                    "/ws/app/chat",
                    JSON.stringify(messageRequest), //body
                    {}); // header
            }
        },
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
                        context.commit("SET_CONVERSATIONS", rooms);
                    }
                });
        }
    }
})