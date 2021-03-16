<template>
  <v-card>
    <v-card-title class="headline">
      Confirm Revert
    </v-card-title>
    <v-card-text>
      Are you sure you want to revert this charge?
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$emit('close')"
      >
        No
      </v-btn>
      <v-btn
        color="primary"
        @click="$emit('confirm')"
      >
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  
}
</script>
