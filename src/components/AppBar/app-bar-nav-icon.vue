<template>
  <v-btn v-if="show" icon @click="toggleShowNavDrawer">
    <icon icon="bars" />
  </v-btn>
</template>
<script>
export default {
  props: ["show"],
  methods: {
    toggleShowNavDrawer() {
      this.$store.commit("uxModule/toggleShowNavDrawer");
    }
  }
};
</script>
