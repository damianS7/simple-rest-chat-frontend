<template>
  <b-row
    class="p-1 m-1 msg-block"
    :class="[isSender ? 'text-right' : 'text-left']"
  >
    <b-col :class="[isSender ? 'own-messages' : 'other-messages']">
      <b-row class="m-0">{{ message }}</b-row>
      <b-row>
        <b-col cols="12" class="msg-date">2020-06-21</b-col>
        <b-col cols="12" class="msg-sender">{{ sender }}</b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ConversationMessage",
  props: ["sender", "message", "isSender", "sent_at"],
};
</script>
<style scoped>
.own-messages {
  box-shadow: 0px 0px 10px 1px #eee;
  border-radius: 10px 10px 0 10px;
  background: #dcf8c6;
  text-align: right;
}

.other-messages {
  box-shadow: 0px 0px 10px 1px #ffffff;
  border-radius: 10px 10px 10px 0;
  background: #ffffff;
  text-align: left;
}

.msg-sender,
.msg-date {
  font-style: oblique;
  font-size: 0.6rem;
  text-align: right;
}

.msg-block {
  display: block;
}

.msg-block-left {
  text-align: left;
}

.msg-block-right {
  text-align: right;
}

.own-messages,
.other-messages {
  width: auto;

  min-width: 35%;
  max-width: 50%;
  padding: 4px 10px 7px;
  font-size: 12px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  display: inline-block;
  word-break: break-word;
}
</style>