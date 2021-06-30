<template>
  <b-row class="app-one">
    <b-col cols="5" sm="5" md="5" lg="3" class="side">
      <div class="side-left">
        <b-row class="heading">
          <b-col cols="5" sm="3" class="heading-avatar">
            <div class="heading-avatar-icon">
              <img @click="showProfile" src="a.jpg" />
            </div>
          </b-col>

          <b-col cols="7" sm="5" class="heading-name">
            <a class="heading-name-meta">{{ appUser.name }}</a>
          </b-col>
        </b-row>

        <b-row class="m-0">
          <b-col class="side">
            <conversation-list></conversation-list>
            <room-list></room-list>
          </b-col>
        </b-row>
      </div>
      <div class="side-profile">
        <profile></profile>
      </div>
    </b-col>

    <b-col cols="7" sm="7" md="7" lg="9" class="conversation">
      <b-row class="heading">
        <b-col cols="12" class="heading-name">
          <a v-if="selectedChatTitle" class="heading-name-meta">{{
            selectedChatTitle
          }}</a>
        </b-col>
      </b-row>

      <b-row id="conversation-box" class="m-0">
        <conversation></conversation>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";
import Profile from "./Profile.vue";
import ConversationList from "./ConversationList.vue";
import Conversation from "./Conversation.vue";
import RoomList from "./RoomList.vue";
export default {
  name: "Chat",
  props: {},
  components: {
    Profile,
    ConversationList,
    RoomList,
    Conversation,
  },
  computed: {
    ...mapState({
      appUser: (state) => state.appuser.appUser,
      selectedChat: (state) => state.selectedChat,
    }),
    selectedChatTitle: function () {
      if (this.selectedChat.room != null) {
        return this.selectedChat.room.name;
      }

      if (this.selectedChat.conversation != null) {
        return this.selectedChat.conversation.with;
      }
      return "";
    },
  },
  methods: {
    showProfile() {
      var div = document.getElementsByClassName("side-profile")[0];
      div.style.left = "0%";
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/chat.css";
.app-one {
  width: 100%;
}
#conversation-box {
  height: calc(100% - 60px);
}
</style>
