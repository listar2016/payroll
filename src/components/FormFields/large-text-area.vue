<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-textarea
        @input="$emit('fieldChange', $event)"
        :value="value"
        :label="field.label"
        :disabled="readonly"
        auto-grow
        rows="15"
        outlined
        slot-scope="{ attrs }"
        v-bind="attrs"
        color="#005c7b"
      ></v-textarea>
    </error-group>
  </div>
</template>

<script>
export default {
  props: ["field", "value", "readonly", "validations"],
};
</script>
