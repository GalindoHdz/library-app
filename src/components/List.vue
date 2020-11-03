<template>
  <div>
    <div class="books_container" v-if="list !== null && option === true">
      <Book
        v-for="book in list"
        v-bind:key="book._id"
        v-bind:_id="book._id"
        v-bind:title="book.title"
        v-bind:author="book.author"
        v-bind:description="book.description"
        v-bind:year_publication="book.year_publication"
        v-bind:cover="book.cover"
      />
    </div>
    <div class="books_container" v-if="list !== null && option === false">
      <Like
        v-for="book in list"
        v-bind:key="book._id"
        v-bind:_id="book._id"
        v-bind:title="book.title"
        v-bind:author="book.author"
        v-bind:description="book.description"
        v-bind:year_publication="book.year_publication"
        v-bind:cover="book.cover"
      />
    </div>
  </div>
</template>

<script>
import Book from "./Book";
import Like from "./Like";

export default {
  name: "List",
  components: {
    Book,
    Like,
  },
  props: {
    list: Array,
    option: Boolean,
  },
};
</script>