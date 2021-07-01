import Vuex from "vuex"
import Vue from "vue"

// Modules
import appuser from "./modules/user"
import conversation from "./modules/conversation"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appuser, conversation
    },
    state: {
        // Al inicio de la aplicacion (mientras se carga al abrir la url)
        // la app no puede ser usada porque los datos no se han cargado
        // por lo que usaremos el flag para determinar si la app termino de cargar
        appReady: false,

        // Lista con todas las salas
        conversations: [],

        // Puede ser una sala o conversacion con otro usuario
        selectedConversation: {
            id: 1,
            name: 'Pepito',
            isRoom: false,
            messages: [
                { senderId: 1, sender: 'Pepito', text: 'Hola' },
                { senderId: 1, sender: 'Pepito', text: 'Xd' },
                { senderId: 1, sender: 'Pepito', text: 'Estas?' }

            ]
        }
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
        }
    },
    mutations: {
        SET_READY(state) {
            state.appReady = true;
        },
        // Selecciona una conversacion
        SET_SELECTED_CONVERSATION(state, conversation) {
            state.selectedConversation = conversation;
        },
        ADD_CONVERSATION(state, conversation) {
            state.rooms.push(conversation);
        },
        SET_CONVERSATIONS(state, conversations) {
            state.rooms = conversations;
        },
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
                messages: [
                    // Uusado para el mensaje inicial
                    {
                        senderId: null,
                        sender: null,
                        message: 'Welcome to the chat.'
                    }
                ]
            }
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
    }
})