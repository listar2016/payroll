<template>
  <div>
    <error-group :validator="validations" name="field">
      <v-text-field
        color="#005c7b"
        :label="field.label"
        outlined
        required
        type="time"
        @input="onChange"
        :value="newVal"
        slot-scope="{ attrs }"
        v-bind="attrs"
      >
      </v-text-field
    ></error-group>
  </div>
</template>

<script>
export default {
  props: ["field", "value", "validations"],
  computed: {
    newVal: function() {
      if (this.value == "" || this.value == null) {
        return "";
      } else {
        var hour =
          (this.value.getHours() < 10 ? "0" : "") + +this.value.getHours();
        var min =
          (this.value.getMinutes() < 10 ? "0" : "") + +this.value.getMinutes();
        return hour + ":" + min;
      }
    }
  },
  methods: {
    onChange: function(event) {
      console.log("the new time is " + event);
      if (event == "") {
        this.$emit("fieldChange", null);
      } else {
        var date = new Date();
        var time = event.split(":");
        if (time.length == 2) {
          var h = time[0];
          var m = time[1];
          date.setHours(h);
          date.setMinutes(m);
          this.$emit("fieldChange", date);
        } else {
          this.$emit("fieldChange", null);
        }
      }
    }
  }
};
</script>
