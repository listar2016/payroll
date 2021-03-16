<template>
  <div>
    <v-navigation-drawer v-model="showDrawer" app clipped width="260" temporary>
      <div class="padTop">
        <menu-list :navigation="navigationItems"></menu-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import MenuList from "./menu-list";
import { routes } from "../../router/routes";
export default {
  data() {
    return {
      routes
    };
  },
  computed: {
    navigationItems: function() {
      let list = [];
      var i;
      for (i = 0; i < this.routes.length; i++) {
        if (this.routes[i].onNavBar) {
          list.push(this.routes[i]);
        }
      }
      return list;
    },
    showDrawer: {
      get: function() {
        return this.$store.state.uxModule.showNavDrawer;
      },
      set: function(event) {
        this.$store.commit("uxModule/setShowNavDrawer", { value: event });
      }
    }
  },
  components: {
    menuList: MenuList
  }
};
</script>
<style>
.padTop {
  padding-top: 125px;
}
</style>
