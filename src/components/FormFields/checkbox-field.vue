<template>
  <v-row>
    <v-col cols="1">
      <error-group :validator="validations" name="field">
        <v-checkbox
          :disabled="readonly"
          @change="onChange"
          v-model="val"
          slot-scope="{ attrs }"
          v-bind="attrs"
          color="#005c7b"
        ></v-checkbox>
      </error-group>
    </v-col>
    <v-col cols="11">
      <label class="checkboxLabel">{{ field.label }}</label>
    </v-col>
  </v-row>
</template>

<script>
import ErrorGroup from "../validations/field-error-group";

export default {
  props: ["field", "value", "readonly", "validations"],
  components: {
    "error-group": ErrorGroup,
  },
  computed: {
    val: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {},
    },
  },
  methods: {
    onChange(event) {
      if (event == true) {
        this.$emit("fieldChange", true);
      } else {
        this.$emit("fieldChange", false);
      }
    },
  },
};
</script>

<style>
.checkboxLabel {
  color: grey;
  padding-top: 21px;
  text-align: justify;
}
</style>
