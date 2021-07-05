<template>
  <b-col class="h-100 p-0">
    <b-row class="profile-header">
      <b-row class="newMessage-main">
        <b-col cols="2" sm="2" class="newMessage-back">
          <font-awesome-icon
            @click="hideProfile"
            icon="arrow-alt-circle-left"
          />
        </b-col>
        <b-col cols="10" sm="10" class="newMessage-title">Profile</b-col>
      </b-row>
    </b-row>

    <div class="compose-sideBar">
      <div class="compose-sideBar myhc">
        <b-row class="sideBar-profile">
          <b-col cols="12">Name</b-col>
          <b-col cols="12">
            <input
              type="text"
              class="form-control"
              v-model="appUser.username"
              @change="updateProfile"
            />
          </b-col>
          <b-col cols="12">Mail</b-col>
          <b-col cols="12">
            <input
              class="form-control"
              rows="4"
              type="text"
              v-model="appUser.email"
              @change="updateProfile"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </b-col>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "UserProfile",
  data: function () {
    return {};
  },
  computed: {
    ...mapState({
      appUser: (state) => state.appUser,
    }),
  },
  methods: {
    //...mapActions(["saveProfile"]),
    hideProfile() {
      var div = document.getElementsByClassName("side-profile")[0];
      div.style.left = "-100%";
    },
    updateProfile(event) {
      //this.saveProfile();
    },
  },
};
</script>
<style scoped>
.profile-header {
  background-color: #00bfa5;
  margin: 0;
}

.avatar-menu {
  position: absolute;
  bottom: -100%;
  left: -100%;
  width: 100%;
  z-index: 3;
  background-color: antiquewhite;
  border-radius: 4px;
  border: 2px solid black;
  height: auto;
  -webkit-transition: bottom 1s ease;
  transition: bottom 1s ease;
}

.avatar-menu-inner {
  padding: 5px;
  text-align: center;
}

.avatar-menu-inner img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.compose-sideBar {
  height: 100%;
}
</style>
