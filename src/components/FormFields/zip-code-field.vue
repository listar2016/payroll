<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-text-field
        @input="$emit('fieldChange', $event)"
        :value="value"
        :label="field.label"
        :disabled="readonly"
        v-mask="mask"
        slot-scope="{ attrs }"
        v-bind="attrs"
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
      mask: "#####",
    };
  },
};
</script>
