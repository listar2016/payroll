<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-text-field
        slot-scope="{ attrs }"
        v-bind="attrs"
        @input="$emit('fieldChange', $event)"
        :value="value"
        :label="field.label"
        v-mask="mask"
        :disabled="readonly"
        color="#005c7b"
      ></v-text-field>
    </error-group>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  props: ["field", "value", "readonly", "validations"],
  directives: { mask },

  data() {
    return {
      mask: "(###) ###-####",
    };
  },
};
</script>
