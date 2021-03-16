<template>
  <v-app id="app">
    <toolbar></toolbar>
    <top-bar class="top-bar"></top-bar>
    <nav-drawer></nav-drawer>

    <v-main>
      <v-container fluid>
        <v-layout align-center justify-left>
            <snackbar></snackbar>
            <loader></loader>
            <!-- <router-view v-show="showRouterView"></router-view> -->
            <router-view></router-view>
            <help style="position:fixed; bottom:40px; right: 25px;"></help>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Toolbar from "./components/AppBar/toolbar";
  import TopBar from "./components/NavigationBar/top-bar"
  import Snackbar from "./components/Shared/snackbar";
  import Help from "./components/Shared/help";
  import NavDrawer from "./components/NavigationBar/nav-drawer";
  import Loader from "./components/Shared/loader";
  export default {
    name: "app",
    components: {
      topBar: TopBar,
      toolbar: Toolbar,
      snackbar: Snackbar,
      loader: Loader,
      navDrawer: NavDrawer,
      help: Help
    },
    computed: {
      showRouterView: function ()
      {
        var requiresAuth = this.$router.currentRoute.meta.requiresAuth;
        return (!requiresAuth) || (this.$store.state.securityModule.requiresAuth && this.$store.state.securityModule.isAuthenticated);
      }
    },
    async created() {
      await this.$store.dispatch('optionModule/getAllOptions')
    }
  };
</script>
