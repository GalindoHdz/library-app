<template>
  <div class="dashboard_container">
    <Sidenav />
    <div class="dash_container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidenav from "../components/Sidenav";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Sidenav,
  },
  computed: {
    ...mapGetters("login", ["GET_LOGIN_DATA"]),
  },
  methods: {
    ...mapActions("user", ["ACTION_USER_VERIFY"]),
  },
  async mounted() {
    if (!this.GET_LOGIN_DATA) {
      const response = await this.ACTION_USER_VERIFY(this.$apollo);

      if (!response) {
        return this.$router.push({ name: "Login" });
      }
    }
  },
};
</script>
