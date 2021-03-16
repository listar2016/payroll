<template>
  <v-card>
    <v-card-title class="headline">
      Other Earning Rate
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        
        <v-row>
          <v-col>
            <date-picker-component
              :pickerLabel="`Effective Date`"
              @changeDate="changeEffectiveDate"
            >
            </date-picker-component>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
          <v-select
            :items="chargeTypes"
            label="Charge Type"
            v-model="selectedChargeType"
            dense
          ></v-select>
        </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="deductionTypes"
              item-text="name"
              item-value="earningsCodeId"
              label="Earnings Type"
              v-model="form.earningsCodeId"
              dense
              :error-messages="earningsCodeIdErrors"
              @change="$v.form.earningsCodeId.$touch()"
              @blur="$v.form.earningsCodeId.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-radio-group
                v-model="form.isHourlyRate"
                :error-messages="isHourlyRateErrors"
                @input="$v.form.isHourlyRate.$touch()"
                @blur="$v.form.isHourlyRate.$touch()"
            >
                <v-radio
                    v-for="(item, index) in rateType"
                    :key="index"
                    :label="item.text"
                    :value="item.value"
                ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        @click="saveOtherEarning"
        :disabled="!valid"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators'
import OtherEarningRate from "@/objs/OtherEarningRate"
import datePickerComponent from '../Shared/date-picker-component.vue'

export default {
  
  name: 'NewRatesModal',
  components: { datePickerComponent },
  mixins: [validationMixin],
  props: ['otherEarning', 'seletedDeductionType'],
  data: () => ({
    valid: false,
    form: new OtherEarningRate(),
    earningRateType: true,
    selectedChargeType: 1,
    chargeTypes: [
      {
        text: 'Reimbursement',
        value: 1
      },{
        text: 'Deduction',
        value: 2
      },{
        text: 'Payment',
        value: 3
      }
    ],
    rateType: [
      {
        text: 'Hourly rate',
        value: true
      },
      {
        text: 'Flat fee',
        value: false
      }
    ]
  }),

  computed: {
    ...mapGetters({
      earningsCodes: 'optionModule/earningsCodes'
    }),
    uxData() {
      if(this.form.otherEarningsRateId > 0) {
        return {
          loaderText: 'Updating other earning rate...',
          path: 'providerModule/updateOtherEarningsRate',
          snackText: 'Updated successfully!'
        }
      }
      return {
        loaderText: 'Creating other earning rate...',
        path: 'providerModule/createOtherEarningsRate',
        snackText: 'Created successfully!'
      }
    },
    deductionTypes () {
      switch(this.selectedChargeType){
        case 1:
          return this.earningsCodes.filter((item) => {
            return item.isReimbursement
          })
        case 2:
          return this.earningsCodes.filter((item) => {
            return item.isDeduction
          })
        case 3:
          return this.earningsCodes.filter((item) => {
            return item.isPayment
          })
      }                
    },
    earningsCodeIdErrors () {
      const errors = []
      if (!this.$v.form.earningsCodeId.$dirty) return errors
      !this.$v.form.earningsCodeId.required && errors.push('Earning Type is required')
      return errors
    },
    isHourlyRateErrors () {
      const errors = []
      if (!this.$v.form.isHourlyRate.$dirty) return errors
      !this.$v.form.isHourlyRate.required && errors.push('Earning Type is required')
      return errors
    },
    amountErrors () {
      const errors = [];
      if (!this.$v.form.amount.$dirty) return errors;
      !this.$v.form.amount.required &&
        errors.push("Amount is required");
      !this.$v.form.amount.minValue &&
        errors.push("Amount is invalid");
      return errors;
    }
  },
  validations: {
    form: {
        amount: {
          required,
          minValue: minValue(0),
        },
        earningsCodeId: {required},
        isHourlyRate: {required},
    }
  },
  mounted () {
      this.form = {
          ...this.form,
          ...this.otherEarning
      }
      this.seletedDeductionType && (this.selectedChargeType = this.seletedDeductionType)
  },
  methods: {
    async saveOtherEarning () {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          return
        }
        if(this.form.effectiveDate === null)
          this.form.effectiveDate = new Date().toISOString().substr(0, 10)
        this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
        const success = await this.$store.dispatch(this.uxData.path, {...this.form})
        this.$store.dispatch("uxModule/hideLoader")
        this.$emit('close')
        if(success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
        else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
    },
    changeEffectiveDate(date) {
      this.form.effectiveDate = date
    },
  }
}
</script>
