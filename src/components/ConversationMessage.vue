<template>
  <b-row class="message-body">
    <div
      :class="[isSender ? ' message-main-sender' : ' message-main-receiver']"
      class="col-sm-12"
    >
      <div :class="[isSender ? 'sender' : 'receiver']">
        <div class="message-text">{{ message }}</div>
        <span class="message-time float-right">{{ sender }}</span>
        <span class="message-time float-right">{{ sent_at }}</span>
      </div>
    </div>
  </b-row>
</template>

<script>
export default {
  name: "ConversationMessage",
  props: ["sender", "message", "isSender", "sent_at"],
};
</script>
<style>
</style>