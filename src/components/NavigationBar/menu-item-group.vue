<template>
  <div>
    <v-list-group no-action class="sidbar-group-item">
      <template v-slot:activator>
        <v-list-item link :to="menuItem.path">
          <v-list-item-icon>
            <icon small color="#1D3557" :icon="menuItem.icon"></icon>
            <!-- <icon :icon="menuItem.icon"></icon> -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <div v-for="(subItem, index) in menuItem.children" :key="index">
        <sub-menu-item
          v-if="subItem.onNavBar"
          :subMenuItem="subItem"
        ></sub-menu-item>
      </div>
    </v-list-group>
  </div>
</template>

<script>
import SubMenuItem from "./sub-menu-item";
export default {
  props: {
    menuItem: Object
  },
  components: {
    subMenuItem: SubMenuItem
  }
};
</script>
