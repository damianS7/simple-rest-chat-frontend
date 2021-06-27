<template>
  <b-container id="app" class="app">
  <p> dsfsfdsdf </p>
    <b-row class="app-one">
      <b-col cols="5" sm="5" md="5" lg="3" class="side">
        <div class="side-left">
          <b-row class="heading">
            <b-col cols="5" sm="3" class="heading-avatar">
              <div class="heading-avatar-icon">
                <!--<img @click="showProfile" :src="appUserAvatarPath" />-->
              </div>
            </b-col>

            <b-col cols="7" sm="5" class="heading-name">
              <!--<a class="heading-name-meta">{{ appUser.profile.alias }}</a>-->
            </b-col>

            <b-col cols="3" sm="2" class="heading-compose">
              <!--<i @click="showContacts" class="fa fa-comments fa-2x float-right"></i>-->
            </b-col>

            <b-col cols="3" sm="2" class="heading-compose">
              <!--<i @click="showPeople" class="fa fa-user-plus fa-2x float-right"></i>-->
            </b-col>
          </b-row>
          <!--<conversation-list></conversation-list>-->
        </div>

        <div class="side-contacts">
          <!--<contacts></contacts>-->
        </div>

        <div class="side-people">
          <!--<people-finder></people-finder>-->
        </div>

        <div class="side-profile">
          <!--<profile></profile>-->
        </div>
      </b-col>

      <b-col cols="7" sm="7" md="7" lg="9" class="conversation">
        <div class="side-contact-profile">
          <!--<contact-profile></contact-profile>-->
        </div>
        <b-row class="heading">
          <b-col cols="5" sm="3" md="3" lg="1" class="heading-avatar">
            <!--<div v-if="selectedUserAvatarPath" class="heading-avatar-icon">-->
              <!--<img @click="showContactProfile" :src="selectedUserAvatarPath" />-->
            <!--</div>-->
          </b-col>
          <b-col cols="5" sm="8" md="8" lg="10" class="heading-name">
            <!--<a
              v-if="selectedUserName"
              @click="showContactProfile"
              class="heading-name-meta"
            >{{ selectedUser.name }}</a>-->
          </b-col>
          <b-col cols="2" sm="1" md="1" lg="1" class="heading-dot float-right">
            <i class="fa fa-ellipsis-v fa-2x float-right" aria-hidden="true"></i>
          </b-col>
        </b-row>
        <conversation></conversation>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
