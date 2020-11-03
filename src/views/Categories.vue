<template>
  <div class="home_container">
    <Category />
    <List v-bind:list="this.GET_CATEGORY_LIST" v-bind:option="true" />
    <Message />
    <Loading />
  </div>
</template>

<script>
import Category from "../components/Caterogy";
import List from "../components/List";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { mapGetters } from "vuex";

export default {
  name: "Categories",
  components: {
    Category,
    Message,
    List,
    Loading,
  },
  computed: {
    ...mapGetters("category", ["GET_CATEGORY_LIST"]),
  },
};
</script>
