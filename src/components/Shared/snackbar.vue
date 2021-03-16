<template>
  <v-snackbar
    :value="showSnackbar"
    color="#1c344b"
    dark
    timeout="0"
    bottom
    left
  >
    {{ text }}
    <v-btn dark class="text--white" text @click="closeSnackbar">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    text: function() {
      return this.$store.state.uxModule.snackbarMsg;
    },
    showSnackbar: function() {
      return this.$store.state.uxModule.showSnackbar;
    }
  },
  methods: {
    closeSnackbar: function() {
      this.$store.commit("uxModule/setShowSnackbar", false);
    }
  }
};
</script>
