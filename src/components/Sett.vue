<template>
  <form action="setting-data">
    <input type="text" placeholder="name" v-model="name" />
    <input type="text" placeholder="last name" v-model="last_name" />
    <input type="password" placeholder="new password" v-model="new_password" />
    <input type="password" placeholder="current password" v-model="password" />
    <button @click="update">Update</button>
  </form>
</template>

<script>
import { validDataSettings } from "../controllers/Settings";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sett",
  data() {
    return {
      name: null,
      last_name: null,
      new_password: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters("user", ["GET_USER_DATA"]),
  },
  methods: {
    ...mapActions("message", ["SHOW_MESSAGE"]),
    ...mapActions("user", ["ACTION_USER_UPDATE_DATA"]),

    async update(event) {
      if (event.type === "click") {
        event.preventDefault();

        let data = {
          name: this.name,
          last_name: this.last_name,
          new_password: this.new_password,
          password: this.password,
          apollo: this.$apollo,
        };

        const valid = validDataSettings(data);

        if (!valid.status) {
          return this.SHOW_MESSAGE({ ...valid, show: true });
        }

        await this.ACTION_USER_UPDATE_DATA(data);
      }
    },
  },
};
</script>