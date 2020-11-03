<template>
  <div class="login-container">
    <Log />
    <Loading />
    <Message />
  </div>
</template>

<script>
import Log from "../components/Log";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    Log,
    Loading,
    Message,
  },
  methods: {
    ...mapActions("user", ["ACTION_USER_VERIFY"]),
  },
  async mounted() {
    const response = await this.ACTION_USER_VERIFY(this.$apollo);

    if (response) {
      return this.$router.push({ name: "Home" });
    }
  },
};
</script>
