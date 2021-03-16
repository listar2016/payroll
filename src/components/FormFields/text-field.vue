<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-text-field
        @input="$emit('fieldChange', $event)"
        :value="value"
        :label="field.label"
        :disabled="readonly"
        slot-scope="{ attrs }"
        v-bind="attrs"
        :outlined="outlined"
        color="#005c7b"
      ></v-text-field>
    </error-group>
  </div>
</template>

<script> 
export default {
  props: ["field", "value", "readonly", "outlined", "validations"]
};
</script>
