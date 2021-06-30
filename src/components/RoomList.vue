<template>
  <div class="">
    <room-list-item
      v-for="room of filterRooms"
      v-bind:key="room.id"
      :id="room.id"
      :room="room"
      @click.native="openRoom(room)"
    ></room-list-item>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import RoomListItem from "./RoomListItem";

export default {
  name: "RoomList",
  data: function () {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapActions(["selectRoom"]),
    openRoom(room) {
      this.selectRoom(room);
      // Seleccionamos la conversacion para que se carguen los mensajes.
      //this.openRoomById(conversation.id);
      // Obtnemos el usuario que esta al otro lado de la conversacion
      //var conversationUser =
      //this.$store.getters.getUserFromSelectedConversation;
      // Seleccionamos el usuario
      //this.selectUserById(conversationUser.id);
    },
  },
  computed: {
    ...mapState({
      rooms: (state) => state.room.rooms,
    }),
    filterRooms: function () {
      return this.rooms.filter((room) => {
        //return room.messages.length > 0;
        return room;
      });
    },
  },
  components: { "room-list-item": RoomListItem },
};
</script>
<style>
</style>
