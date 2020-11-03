<template>
  <div class="sidenav_container">
    <div class="profile_container">
      <img v-bind:src="`${api}/${this.GET_USER_DATA.photo}`" alt="photo" />
      <p>
        {{ `${this.GET_USER_DATA.name} ${this.GET_USER_DATA.last_name}` }}
      </p>
    </div>
    <div class="links_buttons">
      <router-link to="/Dashboard" exact>
        <i class="fa fa-home" />
        <p>Home</p>
      </router-link>
      <router-link to="/Dashboard/Categorias" exact>
        <i class="fa fa-sitemap" />
        <p>Categorias</p>
      </router-link>
      <router-link to="/Dashboard/Likes" exact>
        <i class="fa fa-heart" />
        <p>Likes</p>
      </router-link>
      <router-link to="/Dashboard/Settings" exact>
        <i class="fa fa-cogs" />
        <p>Settings</p>
      </router-link>
    </div>
    <div class="links_buttons">
      <button @click="darkmode">
        <i class="fa fa-moon-o" />
        <p>Darkmode</p>
      </button>
      <button @click="logout">
        <i class="fa fa-sign-out" />
        <p>Logout</p>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidenav",
  data() {
    return {
      api: process.env.VUE_APP_API_PHOTOS,
    };
  },
  computed: {
    ...mapGetters("user", ["GET_USER_DATA"]),
  },
  methods: {
    ...mapActions("user", ["ACTION_USER_THEME"]),
    ...mapActions("user", ["ACTION_USER_LOGOUT"]),

    darkmode() {
      this.ACTION_USER_THEME({
        apollo: this.$apollo,
      });
    },
    logout() {
      this.ACTION_USER_LOGOUT();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
