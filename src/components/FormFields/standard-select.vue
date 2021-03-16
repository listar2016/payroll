<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-select
        :label="field.label"
        :value="value"
        :disabled="readonly"
        :items="field.options"
        :item-text="field.itemText"
        :item-value="field.itemValue"
        v-on:change="onChange"
        slot-scope="{ attrs }"
        v-bind="attrs"
        color="#005c7b"
      ></v-select>
    </error-group>
  </div>
</template>

<script>  
export default {
  props: ["field", "value", "readonly", "validations"],
   
  methods: {
    onChange(event) {
      this.$emit("fieldChange", event);
    }
  }
};
</script>
