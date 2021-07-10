<template>
  <b-row class="room-list-item sideBar-body">
    <b-col cols="2" sm="2" class="sideBar-avatar align-self-center">
      <div class="avatar-icon">
        <font-awesome-icon :icon="!room.isRoom ? 'user-friends' : 'users'" />
      </div>
    </b-col>
    <b-col cols="10" sm="10" class="sideBar-main">
      <b-row class="row h-auto">
        <b-col cols="12" class="sideBar-name">
          <span class="name-meta">{{ room.name }}</span>
        </b-col>
      </b-row>
      <b-row class="row">
        <b-col cols="12" class="sideBar-time">
          <span class="time-meta">
            <i>{{ lastMessage }}</i>
          </span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "RoomListItem",
  props: ["id", "room"],
  data: function () {
    return {};
  },
  methods: {
    // Devuelve el otro participante de la conversacion.
    getUserFromRoom() {
      // Si el participante [0] somos nosotros, devolvemos el participante [1]
      //if (this.room.participants[0].id == this.appUser.id) {
      //return this.room.participants[1];
      //}
      //return this.room.participants[0];
    },
  },
  computed: {
    ...mapState(["rooms", "appUser"]),
    ...mapGetters(["getUserById", "isContact"]),
    // Fecha del ultimo mensaje de la conversacion
    lastMessage: function () {
      let message = "...";
      // Si la conversacion tiene mensajes ...
      if (this.room.messages.length > 0) {
        message = this.room.messages[this.room.messages.length - 1].message;
      }
      return message.substr(0, 10) + "...";
    },
  },
};
</script>
<style scoped>
.room-list-item {
  text-align: left;
}
.avatar-icon > svg {
  height: 100%;
  width: 100%;
}
</style>
