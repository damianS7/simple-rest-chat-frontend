<template>
  <b-row class="side">
    <b-row id="history" class="message">
      <b-row v-if="!userSelected" class="message-previous">
        <b-col cols="12" class="previous"
          >Select a conversation to load some messages</b-col
        >
      </b-row>

      <div v-if="emptyChat" class="row message-previous">
        <b-col sm="12" class="previous">
          Don't be shy! Say something to
          <strong>{{ selectedConversation.name }}</strong>
        </b-col>
      </div>

      <conversation-message
        v-for="(message, index) of messagesFromSelectedChat"
        v-bind:key="index"
        :author_id="message.senderId"
        :message="message.message"
        :name="message.sender"
        :sent_at="message.senderId"
        :isSender="isSender(message.senderId)"
      ></conversation-message>
    </b-row>

    <b-row class="reply">
      <b-col cols="9" sm="10" lg="10" class="reply-main">
        <textarea
          v-on:keyup.enter="sendMessage"
          v-model="input"
          class="form-control"
          rows="1"
          id="comment"
        ></textarea>
      </b-col>

      <b-col cols="3" sm="2" lg="2" class="reply-send">
        <font-awesome-icon @click="sendMessage" icon="paper-plane" />
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import ConversationMessage from "./ConversationMessage";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Conversation",
  data: function () {
    return {
      input: "",
    };
  },
  methods: {
    // Devuelve true o false si el usuario que envia el mensaje es la persona
    // logeada en la app (true) o no (false)
    isSender(author_id) {
      if (author_id == this.appUser.id) {
        return true;
      }
      return false;
    },
    // Envia el mensaje al servidor
    sendMessage() {
      // Si existe texto que enviar ...
      if (this.input.trim().length > 0) {
        // Y hay una conversacion seleccionada ...
        if (typeof this.selectedConversation.id !== "undefined") {
          let data = {
            conversation: { id: this.selectedConversation.id },
            message: {
              senderId: this.appUser.id,
              sender: this.appUser.name,
              message: this.input,
            },
          };

          // Enviamos el mensaje
          //this.$store.dispatch("sendMessage", this.input);
          this.$store.dispatch("sendMessage", data);
        }
      }

      // Reiniciamos el texto del input
      this.input = "";
    },
  },
  // Mantiene permanentemente el scroll de la conversacion abajo
  updated() {
    var div = document.getElementById("history");
    div.scrollTop = div.scrollHeight;
  },
  computed: {
    ...mapState(["selectedConversation", "appUser"]),
    ...mapGetters(["getUserById", "lastChatSelected"]),
    // True si se ha seleccionado un usuario
    userSelected: function () {
      if (this.selectedConversation == null) {
        return false;
      }
      return true;
    },
    // True si la conversacion esta vacia
    emptyChat: function () {
      if (this.selectedConversation == null) {
        return false;
      }

      if (this.selectedConversation.messages.length > 0) {
        return false;
      }

      return true;
    },
    messagesFromSelectedChat: function () {
      if (this.selectedConversation == null) {
        return [];
      }
      return this.selectedConversation.messages;
    },
  },
  components: {
    "conversation-message": ConversationMessage,
  },
};
</script>
<style scoped>
.icon-menu {
  position: absolute;
  bottom: -100%;
  left: 35px;
  width: 300px;
  z-index: 10001;
  background-color: antiquewhite;
  border-radius: 4px;
  padding: 5px;
  border: 2px solid black;
  -webkit-transition: bottom 1s ease;
  transition: bottom 1s ease;
}
.message {
  width: 100%;
  height: calc(100% - 60px);
}
.message-body {
  width: 100%;
}
.side {
  width: 100%;
}
</style>