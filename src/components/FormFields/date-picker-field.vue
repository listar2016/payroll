<template>
  <v-row dense no-gutters>
    <v-col cols="3">
      <label class="mt-5">{{ field.label }}</label> </v-col
    ><v-col cols="auto"
      ><v-menu
        v-model="showDatePicker"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <error-group :validator="validations" name="field"
            ><v-text-field
              :value="formattedDateValue"
              clearable
              v-on="on"
              @click:clear="tempDate = null"
              label="Choose date"
              style="width:370px;"
              slot-scope="{ attrs }"
              v-bind="attrs"
            ></v-text-field>
          </error-group>
        </template>
        <v-date-picker
          :value="dateFormattedForPicker"
          color="#542344"
          @input="onDateChange"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker> </v-menu
    ></v-col>
  </v-row>
</template>

<script>
import ErrorGroup from "../validations/field-error-group";

import * as moment from "moment";
export default {
  props: ["field", "value", "validations"],
  components: {
    "error-group": ErrorGroup,
  },
  data() {
    return {
      showDatePicker: false,
      selectedDate: this.value || "",
    };
  },
  computed: {
    formattedDateValue: function() {
      if (!this.dateValueEmpty) {
        return moment(this.selectedDate).format("dddd, MMMM Do YYYY");
      }
      return "";
    },
    dateValueEmpty: function() {
      return this.selectedDate == "";
    },
    dateFormattedForPicker: function() {
      if (!this.dateValueEmpty) {
        return this.selectedDate.toISOString().substr(0, 10);
      }
      return "";
    },
  },
  methods: {
    onDateChange: function(event) {
      this.showDatePicker = false;
      const [year, month, day] = event.split("-");
      let date = new Date(year, month - 1, day, 0, 0, 0, 0);
      console.log("date " + date);
      this.selectedDate = date;
      this.$emit("fieldChange", date);
    },
  },
};
</script>
