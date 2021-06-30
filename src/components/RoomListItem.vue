<template>
  <b-row class="sideBar-body">
    <b-col cols="5" sm="4" class="sideBar-avatar">
      <div class="avatar-icon">
        <font-awesome-icon icon="users" />
      </div>
    </b-col>
    <b-col cols="7" sm="8" class="sideBar-main">
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
  methods: {},
  computed: {
    ...mapState(["rooms", "appUser"]),
    ...mapGetters(["getUserById", "isContact"]),
    // Path del avatar que aparece en el item de la conversacion
    avatarPath: function () {
      //var userConversation = this.getUserFromConversation();
      //var user = this.getUserById(userConversation.id);
      //return "/images/" + user.profile.avatar;
      return "";
    },
    // Fecha del ultimo mensaje de la conversacion
    lastMessage: function () {
      // Si la conversacion tiene mensajes ...
      if (this.room.messages.length > 0) {
        return this.room.messages[this.room.messages.length - 1].message;
      }
      return "...";
    },
  },
};
</script>
<style>
</style>
