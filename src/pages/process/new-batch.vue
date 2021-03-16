<template>
<v-container>
  <v-form v-model="valid" class="mt-10">
      <h2>Genearate a new payroll batch</h2>
    <v-row class="mt-5">
      <v-col cols="12" md="3">
        <p>Name:</p>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="form.name"
          dense
          :error-messages="nameErrors"
          @change="$v.form.name.$touch()"
          @blur="$v.form.name.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <p>Start date:</p>
      </v-col>
      <v-col cols="12" md="3">
        <date-picker-component
            :pickerLabel="`Start Date`"
            @changeDate="changeStartDate"
        ></date-picker-component>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <p>End date:</p>
      </v-col>
      <v-col cols="12" md="3">
        <date-picker-component
            :pickerLabel="`End Date`"
            @changeDate="changeEndDate"
        ></date-picker-component>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <p>Paycheck date:</p>
      </v-col>
      <v-col cols="12" md="3">
        <date-picker-component
            :pickerLabel="`Paycheck Date`"
            @changeDate="changePaycheckDate"
        ></date-picker-component>
      </v-col>
    </v-row>
    <v-btn color="primary"
        :disabled="!valid"
        @click="generateBatch()"
    >
        Generate batch
    </v-btn>
  </v-form>
</v-container>

</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import CreatePayrollBatch from "@/objs/CreatePayrollBatch";
import DatePickerComponent from "@/components/Shared/date-picker-component"
export default {
  components: {
    "date-picker-component": DatePickerComponent,
  },
  mixins: {
    validationMixin,
  },
  data() {
    return {
      valid: false,
      isMenu1: false,
      form: new CreatePayrollBatch(),
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push("Name is required");
      return errors;
    },
  },
  validations: {
    form: {
      name: { required },
    },
  },
  methods: {
      changeStartDate(date) {
          this.form.startDate = date
      },
      changeEndDate(date) {
          this.form.endDate = date
      },
      changePaycheckDate(date) {
          this.form.paycheckDate = date
      },
      generateBatch(){
          this.$v.form.$touch()
          if(!this.valid)return
          console.log(this.form)
          this.$store.dispatch(
              'processPayrollModule/generateBatch',
              {...this.form}
          )
          this.$router.push({
              name: 'All batches'
          })
      },
  }
};
</script>