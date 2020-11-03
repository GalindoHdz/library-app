<template>
  <div class="list_container">
    <button @click="option('Arts')">
      <i class="fa fa-paint-brush"></i>
    </button>
    <button @click="option('Fantasy')">
      <i class="fa fa-magic"></i>
    </button>
    <button @click="option('Biographies')">
      <i class="fa fa-address-book"></i>
    </button>
    <button @click="option('Science')">
      <i class="fa fa-flask"></i>
    </button>
    <button @click="option('Recipes')">
      <i class="fa fa-book"></i>
    </button>
    <button @click="option('Romance')">
      <i class="fa fa-heart"></i>
    </button>
    <button @click="option('Religion')">
      <i class="fa fa-university"></i>
    </button>
    <button @click="option('Mystery_and_Detective_Stories')">
      <i class="fa fa-user-secret"></i>
    </button>
    <button @click="option('Music')">
      <i class="fa fa-music"></i>
    </button>
    <button @click="option('Medicine')">
      <i class="fa fa-stethoscope"></i>
    </button>
    <button @click="option('Plays')">
      <i class="fa fa-gamepad"></i>
    </button>
    <button @click="option('History')">
      <i class="fa fa-h-square"></i>
    </button>
    <button @click="option('Children')">
      <i class="fa fa-child"></i>
    </button>
    <button @click="option('Science_Fiction')">
      <i class="fa fa-rocket"></i>
    </button>
    <button @click="option('Textbook')">
      <i class="fa fa-file-word-o"></i>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Category",
  methods: {
    ...mapMutations("loading", ["SET_LOADING_DATA"]),
    ...mapActions("category", ["ACTION_CATEGORY_SEARCH"]),
    async option(category) {
      this.SET_LOADING_DATA(true);

      await this.ACTION_CATEGORY_SEARCH({
        apollo: this.$apollo,
        category,
      });
    },
  },
};
</script>