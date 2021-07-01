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
        ready: false,
        rooms: [],
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
        appReady: (state) => {
            return state.ready;
        },
    },
    mutations: {
        SET_READY(state) {
            state.ready = true;
        },
        // Selecciona una conversacion
        SET_SELECTED_CONVERSATION(state, conversation) {
            state.selectedConversation = conversation;
        },
    },
    actions: {
        selectConversation(context, conversation) {
            context.commit('SET_SELECTED_CONVERSATION', conversation);
        },
    }
})
