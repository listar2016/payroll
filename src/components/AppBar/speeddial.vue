<template>
  <div>
        <v-speed-dial v-model="fab"
                      :top="top"
                      :bottom="bottom"
                      :right="right"
                      :left="left"
                      :direction="direction"
                      :open-on-hover="hover"
                      :transition="transition">

          <template v-slot:activator>
            <v-btn v-model="fab"
                   small
                   color="blue darken-2"
                   dark
                   fab>
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-account-circle
              </v-icon>
            </v-btn>
          </template>

          <!--return to home screen / dashboard-->
          <v-btn fab
                 title="Dashboard"
                 dark
                 small
                 color="green"
                 v-on:click="dashboard">
            <v-icon>mdi-home</v-icon>
          </v-btn>

          <!--feedback-->
          <v-btn fab
                 title="Submit feedback"
                 dark
                 small
                 color="indigo"
                 v-on:click="feedback">
            <v-icon>mdi-comment-quote-outline</v-icon>
          </v-btn>


          <v-btn fab
                 title="Login / logout"
                 dark
                 small
                 v-on:click="changeLoginStatus"
                 color="red">
            <v-icon>{{authenticateIcon}}</v-icon>
          </v-btn>
        </v-speed-dial>

    <feedback-form></feedback-form>
  </div>
  </template>

<script>
  import FeedbackForm from './feedback-form';
   import { EventBus } from '../Shared/event-bus.js';


  export default {

    components: {
      'feedback-form': FeedbackForm
    },
    data: () => ({
      direction: 'bottom',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      showFeedbackForm: false
    }),

    computed: {
     isAuthenticated: function ()
      {
        return this.$store.state.securityModule.isAuthenticated;
      },
      authenticateIcon: function ()
      {
        if (this.isAuthenticated)
        {
          return "mdi-logout";
        } else
        {
           return "mdi-login";
        }
      }
    },
    methods: {
      dashboard: function ()
      {
       window.open("https://dashboard.omniuserportal.com/");
      },
      feedback: function ()
      {
          EventBus.$emit('trigger-feedback-form');
      },
      changeLoginStatus: function ()
      {
        if (this.$store.state.securityModule.isAuthenticated)
        {
          return this.logout();
        } else {
                return this.login();

        }
      },
      login: async function ()
      {
        var currentPath = this.$router.currentRoute.path;
        this.$store.dispatch('securityModule/authenticate', currentPath);
      },
      logout: function ()
      {
        this.$store.dispatch('securityModule/logout');
      },
    }
  }
</script>

