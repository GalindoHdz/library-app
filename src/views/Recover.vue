<template>
  <div class="login-container">
    <Recov />
    <Loading />
    <Message />
  </div>
</template>

<script>
import Recov from "../components/Recov";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { mapActions } from "vuex";

export default {
  name: "Recover",
  components: {
    Recov,
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
