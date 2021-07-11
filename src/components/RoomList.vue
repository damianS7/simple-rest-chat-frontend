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
  name: "RoomItemList",
  data: function () {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapActions(["selectRoom"]),
    openRoom(room) {
      this.selectRoom(room);
    },
  },
  computed: {
    ...mapGetters({
      rooms: "getRooms",
    }),
    filterRooms: function () {
      return this.rooms.filter((room) => {
        return room;
      });
    },
  },
  components: { "room-list-item": RoomListItem },
};
</script>
<style>
</style>
