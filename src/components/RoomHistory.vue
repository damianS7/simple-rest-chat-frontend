<template>
  <b-row class="side">
    <b-row id="history" class="">
      <b-row v-if="!userSelected" class="message-previous">
        <b-col cols="12" class="previous"
          >Select a room to load some messages</b-col
        >
      </b-row>

      <div v-if="emptyChat" class="row message-previous">
        <b-col sm="12" class="previous">
          Don't be shy! Say something to
          <strong>{{ selectedRoom.name }}</strong>
        </b-col>
      </div>

      <room-message
        v-for="(message, index) of messagesFromSelectedChat"
        v-bind:key="index"
        :author_id="message.senderId"
        :message="message.message"
        :sender="message.sender"
        :sent_at="message.sent_at"
        :isSender="isSender(message.senderId)"
      ></room-message>
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
import RoomMessage from "./RoomMessage";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Room",
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
        if (typeof this.selectedRoom.id !== "undefined") {
          let roomMessageRequest = {
            roomId: this.selectedRoom.id,
            senderId: this.appUser.id,
            sender: this.appUser.username,
            message: this.input,
          };

          // Enviamos el mensaje
          this.$store.dispatch("sendMessage", roomMessageRequest);
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
    ...mapState(["selectedRoom", "appUser"]),
    ...mapGetters(["getUserById", "lastChatSelected"]),
    // True si se ha seleccionado un usuario
    userSelected: function () {
      if (this.selectedRoom == null) {
        return false;
      }
      return true;
    },
    // True si la conversacion esta vacia
    emptyChat: function () {
      if (this.selectedRoom == null) {
        return false;
      }

      if (this.selectedRoom.messages.length > 0) {
        return false;
      }

      return true;
    },
    messagesFromSelectedChat: function () {
      if (this.selectedRoom == null) {
        return [];
      }
      return this.selectedRoom.messages;
    },
  },
  components: {
    "room-message": RoomMessage,
  },
};
</script>
<style scoped>
#history {
  width: 100%;
  height: calc(100% - 60px);
  margin: 0;
  overflow-y: scroll;
}
.message-body {
  width: 100%;
}
.side {
  width: 100%;
}
</style>