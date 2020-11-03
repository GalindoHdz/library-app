<template>
  <div class="description_container">
    <p>{{ title }}</p>
    <div>{{ description }}</div>
    <button @click="close">cerrar</button>
  </div>
</template>

<script>
export default {
  name: "description",
  props: {
    title: String,
    description: String,
  },
  methods: {
    close() {
      this.$emit("close_description");
    },
  },
};
</script>