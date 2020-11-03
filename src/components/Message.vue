<template>
  <span
    v-bind:class="this.GET_MESSAGE_DATA.class"
    v-if="this.GET_MESSAGE_DATA.show"
  >
    <i
      class="fa fa-check-circle"
      v-if="this.GET_MESSAGE_DATA.typeMessage === 'success'"
    />
    <i
      class="fa fa-info-circle"
      v-if="this.GET_MESSAGE_DATA.typeMessage === 'info'"
    />
    <i
      class="fa fa-exclamation-circle"
      v-if="this.GET_MESSAGE_DATA.typeMessage === 'warning'"
    />
    <i
      class="fa fa-times-circle"
      v-if="this.GET_MESSAGE_DATA.typeMessage === 'danger'"
    />
    <p>{{ this.GET_MESSAGE_DATA.message }}</p>
  </span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Message",
  computed: {
    ...mapGetters("message", ["GET_MESSAGE_DATA"]),
  },
};
</script>
