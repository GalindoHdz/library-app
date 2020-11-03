<template>
  <div class="home_container">
    <Search />
    <List v-bind:list="this.GET_BOOK_LIST" v-bind:option="true" />
    <Loading />
    <Message />
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Message from "../components/Message";
import Search from "../components/Search";
import List from "../components/List";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Loading,
    Message,
    Search,
    List,
  },
  computed: {
    ...mapGetters("book", ["GET_BOOK_LIST"]),
  },
};
</script>
