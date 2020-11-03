<template>
  <form action="login">
    <p>LOGIN</p>
    <input type="text" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="login">Login</button>
    <div>
      <router-link to="/Sigin">Sigin</router-link>
      <router-link to="/Recover">Forgot Password?</router-link>
    </div>
  </form>
</template>

<script>
import { validDataLogin } from "../controllers/Login";
import { mapActions } from "vuex";

export default {
  name: "Log",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions("message", ["SHOW_MESSAGE"]),
    ...mapActions("user", ["ACTION_USER_LOGIN"]),

    async login(event) {
      if (event.type === "click" || event.key === "Enter") {
        event.preventDefault();

        const valid = validDataLogin({
          email: this.email,
          password: this.password,
        });

        if (!valid.status) {
          return this.SHOW_MESSAGE({ ...valid, show: true });
        }

        const response = await this.ACTION_USER_LOGIN({
          email: this.email,
          password: this.password,
          apollo: this.$apollo,
        });

        if (response) {
          return this.$router.push({ name: "Home" });
        }
      }
    },
  },
};
</script>
