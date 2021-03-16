<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <label class="mt-5">{{ field.label }}</label> </v-col
      ><v-col cols="auto">
        <error-group :validator="validations" name="field">
          <v-autocomplete
            :value="hourVal"
            :disabled="readonly"
            v-on:change="onHourChange"
            label="Hour"
            :items="hoursOptions"
            style="width:175px"
            class="pr-6"
            slot-scope="{ attrs }"
            v-bind="attrs"
          ></v-autocomplete
        ></error-group>
      </v-col>
      <v-col cols="auto">
        <v-autocomplete
          :value="minutesVal"
          :disabled="readonly"
          v-on:change="onMinuteChange"
          label="Minute"
          :items="minutes"
          style="width:95px"
          class="pr-6"
        ></v-autocomplete>
      </v-col>
      <v-col cols="auto">
        <v-autocomplete
          :value="ampmVal"
          :disabled="readonly"
          v-on:change="onAmpmChange"
          label="AM / PM"
          :items="ampm"
          style="width:100px"
          color="#005c7b"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script> 
export default {
  //
  props: ["field", "value", "readonly", "validations"],
   
  data: function() {
    return {
      hoursOptions: [
        { text: "01", value: 1 },
        { text: "02", value: 2 },
        { text: "03", value: 3 },
        { text: "04", value: 4 },
        { text: "05", value: 5 },
        { text: "06", value: 6 },
        { text: "07", value: 7 },
        { text: "08", value: 8 },
        { text: "09", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 }
      ],
      minutes: [
        { text: "00", value: 0 },
        { text: "01", value: 1 },
        { text: "02", value: 2 },
        { text: "03", value: 3 },
        { text: "04", value: 4 },
        { text: "05", value: 5 },
        { text: "06", value: 6 },
        { text: "07", value: 7 },
        { text: "08", value: 8 },
        { text: "09", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
        { text: "13", value: 13 },
        { text: "14", value: 14 },
        { text: "15", value: 15 },
        { text: "16", value: 16 },
        { text: "17", value: 17 },
        { text: "18", value: 18 },
        { text: "19", value: 19 },
        { text: "20", value: 20 },
        { text: "21", value: 21 },
        { text: "22", value: 22 },
        { text: "23", value: 23 },
        { text: "24", value: 24 },
        { text: "25", value: 25 },
        { text: "26", value: 26 },
        { text: "27", value: 27 },
        { text: "28", value: 28 },
        { text: "29", value: 29 },
        { text: "30", value: 30 },
        { text: "31", value: 31 },
        { text: "32", value: 32 },
        { text: "33", value: 33 },
        { text: "34", value: 34 },
        { text: "35", value: 35 },
        { text: "36", value: 36 },
        { text: "37", value: 37 },
        { text: "38", value: 38 },
        { text: "39", value: 39 },
        { text: "40", value: 40 },
        { text: "41", value: 41 },
        { text: "42", value: 42 },
        { text: "43", value: 43 },
        { text: "44", value: 44 },
        { text: "45", value: 45 },
        { text: "46", value: 46 },
        { text: "47", value: 47 },
        { text: "48", value: 48 },
        { text: "49", value: 49 },
        { text: "50", value: 50 },
        { text: "51", value: 51 },
        { text: "52", value: 52 },
        { text: "53", value: 53 },
        { text: "54", value: 54 },
        { text: "55", value: 55 },
        { text: "56", value: 56 },
        { text: "57", value: 57 },
        { text: "58", value: 58 },
        { text: "59", value: 59 },
        { text: "60", value: 60 }
      ],
      ampm: ["AM", "PM"],
      selectedHour: "",
      selectedMinutes: "",
      selectedAmpm: ""
    };
  },
  computed: {
    newVal: function() {
      if (this.value == "" || this.value == null) {
        return new Date();
      } else {
        return new Date(this.value);
      }
    },
    hourVal: function() {
      if (this.value == null || this.value == "") {
        return 12;
      }
      var h = this.newVal.getHours();
      if (h == 0) {
        return 12;
      } else if (h > 12) {
        return h - 12;
      } else {
        return h;
      }
    },
    minutesVal: function() {
      if (this.value == null || this.value == "") {
        return 0;
      }
      return this.newVal.getMinutes();
    },
    ampmVal: function() {
      if (this.value == null || this.value == "") {
        return "AM";
      }
      if (this.newVal.getHours() >= 12) {
        return "PM";
      } else {
        return "AM";
      }
    },
    day: function() {
      return this.newVal.getDate();
    },
    month: function() {
      return this.newVal.getMonth();
    },
    year: function() {
      return this.newVal.getFullYear();
    },
    hours: function() {
      if (this.selectedAmpm === "AM") {
        if (this.selectedHour == 12) {
          return 0;
        } else {
          return this.selectedHour;
        }
      } else if (this.selectedAmpm === "PM") {
        if (this.selectedHour == 12) {
          return 12;
        } else {
          return this.selectedHour + 12;
        }
      } else {
        if (this.ampmVal === "AM") {
          if (this.selectedHour == 12) {
            return 0;
          } else {
            return this.selectedHour;
          }
        } else if (this.ampmVal === "PM") {
          if (this.selectedHour == 12) {
            return 12;
          } else {
            return this.selectedHour + 12;
          }
        }
      }
    }
  },
  methods: {
    onHourChange: function(event) {
      this.selectedHour = event;
      var date = new Date(
        this.year,
        this.month,
        this.day,
        this.hours,
        this.minutesVal,
        0,
        0
      );
      this.$emit("fieldChange", date);
    },
    onMinuteChange: function(event) {
      this.selectedMinutes = event;
      var date = new Date(
        this.year,
        this.month,
        this.day,
        this.hourVal,
        this.selectedMinutes,
        0,
        0
      );
      this.$emit("fieldChange", date);
    },
    onAmpmChange: function(event) {
      this.selectedAmpm = event;
      var date = new Date(
        this.year,
        this.month,
        this.day,
        this.hours,
        this.minutesVal,
        0,
        0
      );
      this.$emit("fieldChange", date);
    }
  }
};
</script>
