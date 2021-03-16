<template>
  <v-overlay :value="show">
    <v-container>
      <v-row align="center" justify="center">
        <v-col  cols="3">
        <v-progress-circular  indeterminate size="45"></v-progress-circular>
          </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="12">
          <div style="text-align:center;">
            <span>
              {{message}}
            </span>
          </div>
          </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
  export default {
    computed: {
      show: function () {
        return this.$store.state.uxModule.showLoader;
      },
      message: function () {
         return this.$store.state.uxModule.loaderMsg;

      }
    }
  }
</script>
