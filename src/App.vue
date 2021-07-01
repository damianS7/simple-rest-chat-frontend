<template>
  <b-container id="app" fluid>
    <b-row v-if="!isLogged" id="login-component" class="full-screen-component">
      <login></login>
    </b-row>
    <b-row id="chat-component" class="full-screen-component">
      <b-row class="app-one">
        <b-col cols="5" sm="5" md="5" lg="4" class="side">
          <div class="side-left">
            <b-row class="heading">
              <b-col cols="5" sm="3" class="heading-avatar">
                <div class="heading-avatar-icon">
                  <font-awesome-icon @click="showProfile" icon="cog" />
                </div>
              </b-col>

              <b-col cols="7" sm="5" class="heading-name">
                <a class="heading-name-meta">{{ appUser.name }}</a>
              </b-col>
            </b-row>

            <b-row class="m-0 h-100">
              <b-col id="conver-list-wrapper" class="side">
                <conversation-list></conversation-list>
              </b-col>
            </b-row>
          </div>
          <div class="side-profile">
            <profile></profile>
          </div>
        </b-col>

        <b-col cols="7" sm="7" md="7" lg="8" class="conversation">
          <b-row class="heading">
            <b-col cols="12" class="heading-name">
              <a v-if="selectedConversationTitle" class="heading-name-meta">{{
                selectedConversationTitle
              }}</a>
            </b-col>
          </b-row>

          <b-row id="conversation-box" class="m-0">
            <conversation-history></conversation-history>
          </b-row>
        </b-col>
      </b-row>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import ConversationList from "./components/ConversationList.vue";
import ConversationHistory from "./components/ConversationHistory.vue";
export default {
  name: "App",
  components: {
    Login,
    Profile,
    ConversationList,
    ConversationHistory,
  },
  computed: {
    ...mapGetters({
      isLogged: "isLogged",
      appReady: "appReady",
    }),
    ...mapState({
      appUser: (state) => state.appUser,
      selectedConversation: (state) => state.selectedConversation,
    }),
    selectedConversationTitle: function () {
      if (this.selectedConversation != null) {
        return this.selectedConversation.name;
      }

      return "";
    },
  },
  methods: {
    showLogin() {
      var div = document.getElementById("login-component");
      div.style.left = "0%";
    },
    hideLogin() {
      var div = document.getElementById("login-component");
      div.style.left = "-100%";
    },
    showProfile() {
      var div = document.getElementsByClassName("side-profile")[0];
      div.style.left = "0%";
    },
  },
  mounted() {
    console.log("App mounted");
    // Cargar hardcoded data para testing

    let conversations = [
      {
        id: 1,
        name: "Room 1",
        description: "aasdsdasd",
        isRoom: true,
        messages: [
          {
            senderId: 5,
            sender: "Robert",
            message: "Hello everybody",
          },
          {
            senderId: 1,
            sender: "Damian",
            message: "Hi robert",
          },
          {
            senderId: 5,
            sender: "Robert",
            message: "How are u?",
          },
        ],
      },
      {
        id: 2,
        isRoom: true,
        name: "Room 2",
        description: "vvvv",
        messages: [],
      },
      {
        id: 3,
        isRoom: true,
        name: "Room 3",
        description: "vvvv",
        messages: [],
      },
      {
        id: 4,
        isRoom: true,
        name: "Room 4",
        description: "vvvv",
        messages: [],
      },
      {
        id: 5,
        isRoom: true,
        name: "Room 5",
        description: "vvvv",
        messages: [],
      },
      { id: 6, isRoom: true, name: "Room 6", description: "xdd", messages: [] },
      {
        id: 7,
        isRoom: true,
        name: "Room 7",
        description: "vvvv",
        messages: [],
      },
    ];

    this.$store.dispatch("addConversations", conversations);
    this.$store.dispatch("addConversation", {
      id: 77,
      name: "Pepito",
      isRoom: false,
      messages: [
        { senderId: 66, sender: "Pepito", message: "Hola" },
        { senderId: 1, sender: "Damian", message: "Xdddddd" },
        { senderId: 66, sender: "Pepito", message: "Estas?" },
        { senderId: 66, sender: "Pepito", message: "Hola" },
        { senderId: 66, sender: "Pepito", message: "Xdddddd" },
        { senderId: 1, sender: "Damian", message: "Estas?" },
        { senderId: 1, sender: "Damian", message: "Hola" },
        { senderId: 66, sender: "Pepito", message: "Xdddddd" },
        { senderId: 1, sender: "Damian", message: "Estas?" },
      ],
    });
  },
};
</script>
<style>
@import "./assets/css/chat.css";
.app-one {
  width: 100%;
}
#conversation-box {
  height: calc(100% - 60px);
}
#app {
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: fixed;
  /*position: relative;
  height: calc(100% - 52px);*/
}
#chat-component {
  z-index: 1;
}

#login-component {
  z-index: 99999;
  left: 0;
  position: absolute;
  -webkit-transition: left 2s ease;
  transition: left 2s ease;
}

.full-screen-component {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#history {
  display: inline-block;
}

#conver-list-wrapper {
  overflow-y: scroll;
  height: calc(100% - 60px);
}
</style>
