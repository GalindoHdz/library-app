<template>
  <div class="book_container">
    <img v-bind:src="cover" alt="cover" />
    <div>
      <p>
        {{ title }}
      </p>
      <p>
        {{ author ? author : "Sin autor" }}
      </p>
      <p>
        {{ year_publication }}
      </p>
      <Description
        v-bind:title="title"
        v-bind:description="description ? description : 'No description'"
        @close_description="show_description"
        v-if="show"
      />
      <div>
        <button class="book_descripcion" @click="show_description">
          <i class="fa fa-file-text" />
        </button>
        <button class="book_descripcion" @click="save">
          <i class="fa fa-heart" />
        </button>
        <button class="book_descripcion" @click="show_comment">
          <i class="fa fa-comment"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./Description";
import { mapActions } from "vuex";

export default {
  name: "Book",
  components: {
    Description,
  },
  props: {
    _id: String,
    title: String,
    author: String,
    description: String,
    year_publication: String,
    cover: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions("likes", ["ACTION_SAVE_LIKE"]),

    show_description() {
      this.show = !this.show;
    },

    show_comment() {
      console.log(this._id);
    },

    async save() {
      await this.ACTION_SAVE_LIKE({
        apollo: this.$apollo,
        key: this._id,
        title: this.title,
        author: this.author,
        description: this.description,
        year_publication: this.year_publication,
        cover: this.cover,
      });
    },
  },
};
</script>
