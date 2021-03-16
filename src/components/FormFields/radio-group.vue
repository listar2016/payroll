<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-radio-group
        :value="value"
        :disabled="readonly"
        :label="field.label"
        v-on:change="onChange"
        color="#005c7b"
      >
        <v-radio
          v-for="(item, index) in field.options"
          :key="index"
          :label="item"
          :value="item"
        ></v-radio>
      </v-radio-group>
    </error-group>
  </div>
</template>

<script> 
import ErrorGroup from "../validations/field-error-group";

export default {
  props: ["field", "value", "readonly", "validations"],
  components: {
    "error-group": ErrorGroup,
  },
  methods: {
    onChange(event) {
      this.$emit("fieldChange", event);
    },
  },
};
</script>
