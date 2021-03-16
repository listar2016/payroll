<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-text-field
        @input="$emit('fieldChange', Number($event))"
        :value="value"
        :label="field.label"
        :disabled="readonly"
        slot-scope="{ attrs }"
        v-bind="attrs"
        :outlined="outlined"
        v-mask="mask"
        color="#005c7b"
      ></v-text-field>
    </error-group>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  props: ["field", "value", "readonly", "outlined", "validations"],
 
  directives: { mask },
  data() {
    return {
      mask: "######",
    };
  },
};
</script>
