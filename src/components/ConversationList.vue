<template>
  <div class="">
    <conversation-list-item
      v-for="conversation of filterConversations"
      v-bind:key="conversation.id"
      :id="conversation.id"
      :conversation="conversation"
      @click.native="openConversation(conversation)"
    ></conversation-list-item>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ConversationListItem from "./ConversationListItem";

export default {
  name: "ConversationItemList",
  data: function () {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapActions(["selectConversation"]),
    openConversation(conversation) {
      this.selectConversation(conversation);

      // Seleccionamos la conversacion para que se carguen los mensajes.
      //this.selectConversationById(conversation.id);
      // Obtnemos el usuario que esta al otro lado de la conversacion
      //var conversationUser =
      //        this.$store.getters.getUserFromSelectedConversation;
      // Seleccionamos el usuario
      //this.selectUserById(conversationUser.id);
    },
  },
  computed: {
    ...mapState({
      conversations: (state) => state.conversations,
    }),
    filterConversations: function () {
      return this.conversations.filter((conversation) => {
        //return conversation.messages.length > 0;
        return conversation;
      });
    },
  },
  components: { "conversation-list-item": ConversationListItem },
};
</script>
<style>
</style>
