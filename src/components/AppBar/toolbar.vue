<template>
  <div>
    <v-app-bar dark app clipped-left color="primary">
      <app-bar-nav-icon show="true" />

      <v-toolbar-title class="omni-title mt-1"
        >OMNI USER PORTAL</v-toolbar-title
      >

      <v-spacer></v-spacer>    
      <p v-show="isAuthenticated" class="mr-10 mt-4">Hello, {{username}}</p>
      <speeddial class="mt-8"></speeddial>
    </v-app-bar>    
  </div>
</template>

<script>
import Speeddial from "./speeddial"
import AppBarNavIcon from "./app-bar-nav-icon.vue";
export default {
  components: {
    "speeddial": Speeddial,
    "app-bar-nav-icon": AppBarNavIcon,
  },
  computed: {
    isAuthenticated: function ()
    {
      return this.$store.state.securityModule.isAuthenticated;
    },
    username: function ()
    {
      if (this.isAuthenticated)
      {
        return this.$store.state.securityModule.user.profile.name;

      } else
      {
        return '';
      }
    },
  }
};
</script>
