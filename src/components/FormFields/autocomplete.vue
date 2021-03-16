<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-autocomplete
        :label="field.label"
        :value="value"
        :disabled="readonly"
        :items="field.options"
        v-on:change="onChange"
        slot-scope="{ attrs }"
        v-bind="attrs"
        color="#005c7b"
      ></v-autocomplete>
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
