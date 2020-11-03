<template>
  <div class="home_search">
    <i class="fa fa-search" />
    <input
      type="text"
      placeholder="Search a book"
      @keypress="find"
      v-model="search"
    />
  </div>
</template>

<script>
import { validWordsSearch } from "../controllers/Search";
import { mapActions } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      search: null,
    };
  },
  methods: {
    ...mapActions("message", ["SHOW_MESSAGE"]),
    ...mapActions("book", ["ACTION_BOOK_SEARCH"]),

    async find(event) {
      if (event.key === "Enter") {
        const valid = validWordsSearch(this.search);

        if (!valid.status) {
          return this.SHOW_MESSAGE({ ...valid, show: true });
        }

        await this.ACTION_BOOK_SEARCH({
          apollo: this.$apollo,
          word: this.search,
        });
      }
    },
  },
};
</script>