<template>
  <div class="home_container">
    <Loading />
    <Message />
    <List v-bind:list="this.GET_LIKES_DATA" v-bind:option="false" />
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Message from "../components/Message";
import List from "../components/List";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Likes",
  components: {
    Loading,
    Message,
    List,
  },
  computed: {
    ...mapGetters("likes", ["GET_LIKES_DATA"]),
  },
  methods: {
    ...mapActions("likes", ["ACTION_LIKES_DATA"]),
  },
  async mounted() {
    if (this.GET_LIKES_DATA.length === 0) {
      await this.ACTION_LIKES_DATA({
        apollo: this.$apollo,
      });
    }
  },
};
</script>
