<template>
  <div>
    <v-list>
      <div v-for="(item,index) in navigation" :key="index">
        <menu-item class="nav-item" :menuItem="item"></menu-item>
      </div>
    </v-list>
  </div>
</template>

<script>
import MenuItem from "./menu-item";

export default {
  props: {
    navigation: Array
  },
  components: {
    menuItem: MenuItem
  }
};
</script>