<template>
  <div>
    <v-list-item link :to="subMenuItem.path">
      <v-list-item-icon style="padding-left:64px;">
        <icon :icon="subMenuItem.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{subMenuItem.title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    subMenuItem: Object
  }
};
</script>