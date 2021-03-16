<template>
  <div>
    <div v-if="menuItem.children">
      <menu-item-group :menuItem="menuItem"></menu-item-group>
    </div>
    <div v-else>
      <menu-item-single :menuItem="menuItem"></menu-item-single>
    </div>
  </div>
</template>

<script>
import MenuItemGroup from "./menu-item-group";
import MenuItemSingle from "./menu-item-single";
export default {
  props: {
    menuItem: Object
  },
  components: {
    menuItemGroup: MenuItemGroup,
    menuItemSingle: MenuItemSingle
  }
};
</script>
