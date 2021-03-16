<template>
      <v-list-item v-if="itm.onNavBar" :to="{name: itm.name}">
        <v-list-item-title>{{ itm.title }}</v-list-item-title>
      </v-list-item>
</template>

<script>
import { routes } from "../../router/routes";
export default {
  props: {
    itm: {
      type: Object
    }
  },
  data() {
    return {
      routes,
    };
  },
};
</script>