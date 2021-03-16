<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-select
        :label="field.label"
        :value="value"
        :items="field.options"
        :disabled="readonly"
        multiple
        chips
        deletable-chips
        v-on:change="onChange"
        color="#005c7b"
      ></v-select>
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
