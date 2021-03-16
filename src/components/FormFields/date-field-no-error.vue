<template>
  <v-row no-gutters>
    <v-col cols="3">
      <label class="mt-5">{{ field.label }}</label>
    </v-col>
    <v-col cols="auto">
      <v-autocomplete
        :value="monthVal"
        :disabled="readonly"
        v-on:change="onMonthChange"
        label="Month"
        :items="months"
        style="width:175px"
        class="pr-6"
        color="#005c7b"
      ></v-autocomplete>
    </v-col>

    <v-col cols="auto">
      <v-autocomplete
        :value="dayVal"
        :disabled="readonly"
        v-on:change="onDayChange"
        label="Day"
        :items="daysInMonth"
        style="width:95px"
        class="pr-6"
        color="#005c7b"
      ></v-autocomplete>
    </v-col>
    <v-col cols="auto">
      <v-autocomplete
        :value="yearVal"
        :disabled="readonly"
        v-on:change="onYearChange"
        label="Year"
        :items="years"
        style="width:100px"
        color="#005c7b"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["field", "value", "readonly"],
  methods: {
    onYearChange: function(event) {
      this.tempYear = event;
      if (this.value != null && this.value != "") {
        let date = new Date(event, this.monthVal, this.dayVal, 0, 0, 0, 0);
        this.$emit("fieldChange", date);
      } else {
        if (
          this.tempMonth === "" ||
          this.tempDay == "" ||
          this.tempYear == ""
        ) {
        } else {
          let date = new Date(event, this.monthVal, this.dayVal, 0, 0, 0, 0);
          this.$emit("fieldChange", date);
        }
      }
    },
    onMonthChange: function(event) {
      this.tempMonth = event;
      if (this.value != null && this.value != "") {
        let date = new Date(this.yearVal, event, this.dayVal, 0, 0, 0, 0);
        this.$emit("fieldChange", date);
      } else {
        if (
          this.tempMonth === "" ||
          this.tempDay == "" ||
          this.tempYear == ""
        ) {
        } else {
          let date = new Date(this.yearVal, event, this.dayVal, 0, 0, 0, 0);
          this.$emit("fieldChange", date);
        }
      }
    },
    onDayChange: function(event) {
      this.tempDay = event;
      if (this.value != null && this.value != "") {
        let date = new Date(this.yearVal, this.monthVal, event, 0, 0, 0, 0);
        this.$emit("fieldChange", date);
      } else {
        if (
          this.tempMonth === "" ||
          this.tempDay == "" ||
          this.tempYear == ""
        ) {
        } else {
          let date = new Date(this.yearVal, this.monthVal, event, 0, 0, 0, 0);
          this.$emit("fieldChange", date);
        }
      }
    },
  },
  data: () => ({
    tempMonth: "",
    tempDay: "",
    tempYear: "",
    months: [
      { text: "January", value: 0 },
      { text: "February", value: 1 },
      { text: "March", value: 2 },
      { text: "April", value: 3 },
      { text: "May", value: 4 },
      { text: "June", value: 5 },
      { text: "July", value: 6 },
      { text: "August", value: 7 },
      { text: "September", value: 8 },
      { text: "October", value: 9 },
      { text: "November", value: 10 },
      { text: "December", value: 11 },
    ],
    days30: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
    ],
    days31: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ],
    days29: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
    ],
    days28: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
    ],
    years: [
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026,
      2027,
      2028,
      2029,
      2030,
    ],
  }),
  computed: {
    newVal: function() {
      return new Date(this.value);
    },
    daysInMonth: function() {
      if (
        this.monthVal == 8 ||
        this.monthVal == 3 ||
        this.monthVal == 5 ||
        this.monthVal == 10
      ) {
        return this.days30;
      } else if (this.monthVal == 1) {
        if (this.isLeapYear) {
          return this.days29;
        } else {
          return this.days28;
        }
      } else {
        return this.days31;
      }
    },
    isLeapYear: function() {
      var leap = false;
      if (this.yearVal % 4 == 0) {
        if (this.yearVal % 100 == 0) {
          if (this.yearVal % 400 == 0) {
            leap = true;
          } else {
            leap = false;
          }
        } else {
          leap = true;
        }
      } else {
        leap = false;
      }
      return leap;
    },
    dayVal: function() {
      if (this.value != null && this.value != "") {
        return this.newVal.getDate();
      } else {
        return this.tempDay;
      }
    },
    monthVal: function() {
      if (this.value != null && this.value != "") {
        return this.newVal.getMonth();
      } else {
        return this.tempMonth;
      }
    },
    yearVal: function() {
      if (this.value != null && this.value != "") {
        return this.newVal.getFullYear();
      } else {
        return this.tempYear;
      }
    },
  },
};
</script>
