<template>
  <form action="sigin">
    <p>SIGIN</p>
    <input type="text" placeholder="name" v-model="name" />
    <input type="text" placeholder="last name" v-model="last_name" />
    <input type="text" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="sigin">Sigin</button>
    <div>
      <router-link to="/">Login</router-link>
      <router-link to="/Recover">Forgot Password?</router-link>
    </div>
  </form>
</template>

<script>
import { validDataSigin } from "../controllers/Sigin";
import { mapActions } from "vuex";

export default {
  name: "Sig",
  data() {
    return {
      name: null,
      last_name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions("message", ["SHOW_MESSAGE"]),
    ...mapActions("user", ["ACTION_USER_SIGIN"]),

    async sigin(event) {
      if (event.type === "click" || event.key === "Enter") {
        event.preventDefault();

        const valid = validDataSigin({
          name: this.name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });

        if (!valid.status) {
          return this.SHOW_MESSAGE({ ...valid, show: true });
        }

        const response = await this.ACTION_USER_SIGIN({
          name: this.name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          apollo: this.$apollo,
        });

        if (response) {
          return this.$router.push({ name: "Login" });
        }
      }
    },
  },
};
</script>
