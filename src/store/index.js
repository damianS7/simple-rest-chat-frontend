import Vuex from "vuex"
import Vue from "vue"

// Modules
import appuser from "./modules/user"
import room from "./modules/room"
import conversation from "./modules/conversation"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appuser, room, conversation
    },
    state: {
        // Al inicio de la aplicacion (mientras se carga al abrir la url)
        // la app no puede ser usada porque los datos no se han cargado
        // por lo que usaremos el flag para determinar si la app termino de cargar
        ready: false,
        selectedUser: {},
        selectedChat: { room: null, conversation: null }
    },
    getters: {
        appReady: (state) => {
            return state.ready;
        },
        lastChatSelected: (state) => {
            if (state.selectedChat.room != null) {
                return { room: state.selectedChat.room }
            }

            if (state.selectedChat.conversation != null) {
                return { conversation: state.selectedChat.conversation }
            }

            return null;
        }
    },
    mutations: {
        SET_READY(state) {
            state.ready = true;
        },
        // Selecciona una conversacion
        SET_ROOM_CHAT(state, room) {
            state.selectedChat.room = room;
        },
        SET_CONVERSATION_CHAT(state, conversation) {
            state.selectedChat.conversation = conversation;
        },
    },
    actions: {
        selectConversationById(context, conversationId) {
            //var conversation = context.getters.getConversationById(conversationId);
            //context.commit('SET_SELECTED_CONVERSATION', conversation);
        },
        selectConversation(context, conversation) {
            context.commit('SET_ROOM_CHAT', null);
            context.commit('SET_CONVERSATION_CHAT', conversation);
        },
        selectRoom(context, room) {
            context.commit('SET_ROOM_CHAT', room);
            context.commit('SET_CONVERSATION_CHAT', null);
            context.room.state.selectedRoom = room;
        },
    }
})
