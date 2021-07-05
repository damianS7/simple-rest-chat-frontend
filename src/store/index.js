import axios from 'axios'
import Vue from "vue"
import Vuex from "vuex"
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
        selectedConversation: null
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
        ADD_MESSAGE(state, data) {
            let fconversation = state.conversations.find(
                conversation => conversation.id === data.conversation.id
            );
            fconversation.messages.push(data.message);
        }
    },
    actions: {
        sendMessage(context, data) {
            context.commit('ADD_MESSAGE', data);
        },
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
        addMessage(context, conversation) {
            // Comprobar si es una room o conversacion entre usuarios
        },
        login(context, { username, password }) {
            let data = { username: username, password: password };
            axios.post("http://localhost:8888/login", data)
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
                    }
                });
        },
        logout(context) {
            axios.post("api/users/logout").catch(error => {
                //window.location.href = "/login";
                context.isLogged;
                console.log(error);
            });
        },
    }
})