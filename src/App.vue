<template>
  <b-container id="app" fluid>
    <b-row
      v-if="!isLogged"
      id="login-component"
      class="full-screen-component bg-secondary"
    >
      <login></login>
    </b-row>

    <b-row id="chat-component" class="full-screen-component bg-primary">
      <chat></chat>
    </b-row>
  </b-container>
</template>

<script>
import Chat from "./components/Chat.vue";
import Login from "./components/Login.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Login,
    Chat,
  },
  computed: {
    ...mapGetters({
      isLogged: "appuser/isLogged",
      appReady: "appReady",
    }),
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
  },
};
</script>

<style>
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
  z-index: 10;
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
</style>
