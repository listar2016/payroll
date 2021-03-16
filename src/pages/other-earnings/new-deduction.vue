<template>
  <v-container>
    <div class="d-flex pb-10 mb-5">
          <v-btn
              text
              plain
              color="primary"
              link
              :to="{name: 'Scheduled Deductions'}"
          >
              Other Earnings
          </v-btn>
          <v-icon
              color="primary"
          >
              mdi-menu-right
          </v-icon>
          <v-btn
              text
              plain
              color="primary"
          >
              {{$route.name}}
          </v-btn>
      </div>
    <v-toolbar flat color="white">
      <v-toolbar-title>New Scheduled Deduction</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="valid" class="mt-5">
        <v-row>
          <v-col cols="12" md="6">
          <v-select
            :items="providers"
            item-text="fullName"
            item-value="providerId"
            label="Provider"
            v-model="form.providerId"
            dense
            :error-messages="providerIdErrors"
            @change="$v.form.providerId.$touch()"
            @blur="$v.form.providerId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="3">
          <v-select
            :items="omniCorporationDivisions"
            item-text="description"
            item-value="omniCorporationDivisionId"
            label="Omni Corporations"
            v-model="form.omniCorporationDivisionId"
            dense
            :error-messages="omniCorporationDivisionIdErrors"
            @change="$v.form.omniCorporationDivisionId.$touch()"
            @blur="$v.form.omniCorporationDivisionId.$touch()"
          ></v-select>
        </v-col>
          <v-col cols="12" md="3">
          <v-select
            :items="deductionTypes"
            item-text="name"
            item-value="earningsCodeId"
            label="Deduction Type"
            v-model="form.earningsCodeId"
            dense
            :error-messages="earningsCodeIdErrors"
            @change="$v.form.earningsCodeId.$touch()"
            @blur="$v.form.earningsCodeId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="2">
              <v-switch
                v-model="form.isActive"
                label="Activation Status"
                style="margin-top: 0"
                ></v-switch>
          </v-col>
          
          <v-col cols="12" md="2">
              <date-picker-component
                  :pickerLabel="`Effective Date`"
                  @changeDate="changeEffectiveDate"
              >
              </date-picker-component>
          </v-col>
        
          <v-col cols="12" md="2">
            <v-text-field
              v-model="form.amount"
              label="Amount"
              dense
              prefix="$"
              type="number"
              min="0"
              step="0.01"
              :error-messages="amountErrors"
              @input="$v.form.amount.$touch()"
              @blur="$v.form.amount.$touch()"
            ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel"> Cancel </v-btn>
        <v-btn 
          color="primary"
          @click="saveDeduction()"
          :disabled="!valid">
          Save
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import datePickerComponent from '@/components/Shared/date-picker-component.vue';
import ScheduledDeduction from '@/objs/other-earnings/ScheduledDeduction';

export default {
    components: { 
      datePickerComponent,
    },
  name: "NewScheduledDeduction",
  mixins: [validationMixin],
  props: ["scheduledDeduction"],
  data: () => ({
    valid: false,
    form: new ScheduledDeduction(),
  }),
  computed: {
    ...mapGetters({
        providers: 'providerModule/providers',
        earningsCodes: 'optionModule/earningsCodes',
        omniCorporationDivisions: 'optionModule/omniCorporationDivisions',
    }),
    deductionTypes () {
        return this.earningsCodes.filter((item) => {
            return item.canSchedule
        })        
    },
    uxData() {
      if(this.form.scheduledDeductionId > 0) {
        return {
          loaderText: 'Updating scheduled deduction...',
          path: 'otherEarningsModule/updateScheduledDeduction',
          snackText: 'Updated scheduled deduction successfully!'
        }
      }
      return {
        loaderText: 'Creating scheduled deduction...',
        path: 'otherEarningsModule/createScheduledDeduction',
        snackText: 'Create new scheduled deduction successfully!'
      }
    },
    effectiveDateErrors() {
      const errors = [];
      if (!this.$v.form.effectiveDate.$dirty) return errors;
      !this.$v.form.effectiveDate.required &&
        errors.push("Effective date is required");
      return errors;
    },
    providerIdErrors() {
      const errors = [];
      if (!this.$v.form.providerId.$dirty) return errors;
      !this.$v.form.providerId.required && errors.push("Provider is required");
      return errors;
    },
    earningsCodeIdErrors () {
        const errors = [];
        if (!this.$v.form.earningsCodeId.$dirty) return errors;
        !this.$v.form.earningsCodeId.required && errors.push("Deduction type is required");
        return errors;
    },
    amountErrors() {
      const errors = [];
      if (!this.$v.form.amount.$dirty) return errors;
      !this.$v.form.amount.required &&
        errors.push("Amount is required");
      !this.$v.form.amount.minValue &&
        errors.push("Amount is invalid");
      return errors;
    },
    omniCorporationDivisionIdErrors () {
        const errors = [];
        if (!this.$v.form.omniCorporationDivisionId.$dirty) return errors;
        !this.$v.form.omniCorporationDivisionId.required && errors.push("Omni corporation is required");
        return errors;
    },
    
  },
  
  async created () {
    if(this.providers.length === 0)
        await this.$store.dispatch('providerModule/getAllProviders')
    this.providers.map(item => {
        item.fullName = item.firstName + ' ' + item.lastName
    })
  },
  mounted () {
      this.form = {
          ...this.form,
          ...this.scheduledDeduction
      }
  },
  validations: {
    form: {
        amount: {
            required,
            minValue: minValue(0)
        },
        earningsCodeId: { required },
        providerId: { required },
        effectiveDate: { required },
        isActive: { required },
        omniCorporationDivisionId: { required },
    },
  },
  methods: {
    
    changeEffectiveDate(date) {
      this.$v.form.effectiveDate.$touch();
      this.form.effectiveDate = date
    },
    cancel() {
        this.$router.push({
            name: 'Scheduled Deductions'
        })
    },
    async saveDeduction() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
      const success = await this.$store.dispatch(this.uxData.path, {...this.form})

      this.$store.dispatch("uxModule/hideLoader")
      
      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')

      this.$router.push({
          name: 'Scheduled Deductions'
      })
    },
    
  },
};
</script>
