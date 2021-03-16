<template>
  <div>
    <v-list-item link :to="menuItem.path"  >
      <v-list-item-icon class="ml-2">
        <icon small color="#1D3557" :icon="menuItem.icon"></icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  props: {
    menuItem: Object
  }
};
</script>  
