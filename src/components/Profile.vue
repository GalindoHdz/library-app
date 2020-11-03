<template>
  <div class="profile_container">
    <img v-bind:src="`${api}/${this.GET_USER_DATA.photo}`" alt="photo" />
    <input type="file" id="file" @change="getImage" accept="image/*" />
    <button @click="update">Update</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters("user", ["GET_USER_DATA"]),
  },
  data() {
    return {
      api: process.env.VUE_APP_API_PHOTOS,
      image: null,
    };
  },
  methods: {
    ...mapActions("message", ["SHOW_MESSAGE"]),
    ...mapActions("user", ["ACTION_USER_UPDATE_IMAGE"]),

    getImage(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },

    async update(event) {
      if (event.type === "click") {
        event.preventDefault();

        if (!this.image) {
          return this.SHOW_MESSAGE({
            status: false,
            message: "Ingrese una imagen",
            typeMessage: "warning",
            show: true,
          });
        }

        const response = await this.ACTION_USER_UPDATE_IMAGE(this.image);

        if (response) {
          location.reload();
        }
      }
    },
  },
};
</script>
