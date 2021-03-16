<template>
  <v-autocomplete
    :items="field.options"
    :value="value"
    color="blue-grey lighten-2"
    :label="field.label"
    :item-text="field.itemText"
    :item-value="field.itemValue"
    multiple
    dense
    chips
    deletable-chips
    return-object
    hide-selected
    solo
    v-on:change="onChange"
    :search-input.sync="searchInput"
  >
  </v-autocomplete>
</template>

<script>
export default {
  props: ["field", "value"],
  data() {
    return { searchInput: "" };
  },
  methods: {
    onChange(event) {
      this.searchInput = "";
      this.$emit("fieldChange", event);
    }
  }
};
</script>
