<template>
  <v-btn fab
         title="Help"
         dark
         large
         color="primary"
         v-on:click="help">
    <v-icon>mdi-help</v-icon>
  </v-btn>
</template>

<script>
  export default {
    methods: {
      help: function ()
      {
         window.open("https://helpdesk.omniuserportal.com/");
      }
    }
  }
</script>
