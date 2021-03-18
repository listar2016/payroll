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
      <v-toolbar-title>New Other Earnings Charge</v-toolbar-title>
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
            @change="changeProvider()"
            @blur="$v.form.providerId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
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
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
          <v-select
            :items="programs"
            item-text="name"
            item-value="programId"
            label="Program"
            v-model="form.programId"
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            :items="chargeTypes"
            label="Charge Type"
            v-model="selectedChargeType"
            dense
          ></v-select>
        </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="deductionTypes"
              item-text="name"
              item-value="earningsCodeId"
              label="Earning Code"
              v-model="form.earningsCodeId"
              dense
              :error-messages="earningsCodeIdErrors"
              @change="changeEarningCode()"
              @blur="$v.form.earningsCodeId.$touch()"
            ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
            <date-picker-component
                :pickerLabel="`Charge Date`"
                @changeDate="changeChargeDate"
            >
            </date-picker-component>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-radio-group
            v-model="form.rateType"
            @change="changeRateType()"
          >
            <v-radio
              v-for="(rate, index) in rateTypes"
              :key="index"
              :label="rate"
              :value="index"              
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            v-if="showNewRateButton"
            color="primary"
            @click="showNewRateModal()"
          >
          Create Rate
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.note"
            label="Note"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="durationMinutes"
            label="Duration(hh:mm)"
            number
            dense
            v-mask="timerMask"
            :error-messages="durationMinutesErrors"
            @input="$v.form.durationMinutes.$touch()"
            @blur="$v.form.durationMinutes.$touch()"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="3">
          <v-text-field
            v-if="form.rateType>0"
            v-model="form.customAmount"
            label="Amount"
            dense
            prefix="$"
            type="number"
            min="0"
            step="0.01"
            :error-messages="customAmountErrors"
            @input="$v.form.customAmount.$touch()"
            @blur="$v.form.customAmount.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel"> Cancel </v-btn>
        <v-btn 
          color="primary"
          @click="saveItem()"
          :disabled="!valid">
          Save
        </v-btn>
      </v-row>
    </v-form> 
    <v-dialog v-model="newRateDialog" persistent width="500">
      <other-earning-rate-modal
        v-if="newRateDialog"
        :otherEarning="otherEarningRate"
        :seletedDeductionType="selectedChargeType"
        @close="closeModal()"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, requiredIf, minValue } from "vuelidate/lib/validators";
import { mask } from 'vue-the-mask'
import datePickerComponent from '@/components/Shared/date-picker-component.vue';
import OtherEarningsCharge from '@/objs/other-earnings/OtherEarningsCharge';
import OtherEarningRate from "@/objs/OtherEarningRate"
import OtherEarningRateModal from "@/components/modal/other-earning-rate-modal"

export default {
    components: { 
      datePickerComponent,
      OtherEarningRateModal
    },
  name: "NewOtherEearningCharge",
  directives: { mask },
  mixins: [validationMixin],
  props: ["otherEarningsCharge"],
  data: () => ({
    valid: false,
    form: new OtherEarningsCharge(),
    selectedChargeType: 1,
    newRateDialog: false,
    otherEarningRate: new OtherEarningRate(),
    showNewRateButton: false,
    durationMinutes: "00:00",
    
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
    rateTypes: ['Use rate', 'Hourly amount', 'Flat amount'],
    timerMask: "##:##"
  }),
  computed: {
    ...mapGetters({
        providers: 'providerModule/providers',
        earningsCodes: 'optionModule/earningsCodes',
        omniCorporationDivisions: 'optionModule/omniCorporationDivisions',
        programs: 'optionModule/programs',
    }),
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
    uxData() {
      if(this.form.otherEarningsChargeId > 0) {
        return {
          loaderText: 'Updating item...',
          path: 'otherEarningsModule/updateOtherEarningsCharge',
          snackText: 'Updated item successfully!'
        }
      }
      return {
        loaderText: 'Creating item...',
        path: 'otherEarningsModule/createOtherEarningsCharge',
        snackText: 'Create new item successfully!'
      }
    },
    chargeDateErrors() {
      const errors = [];
      if (!this.$v.form.chargeDate.$dirty) return errors;
      !this.$v.form.chargeDate.required &&
        errors.push("Charge date is required");
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
    customAmountErrors() {
      const errors = [];
      if (!this.$v.form.customAmount.$dirty) return errors;
      !this.$v.form.customAmount.required && errors.push("Custom amount is required");
      !this.$v.form.customAmount.minValue &&
        errors.push("Custom amount is invalid");
      return errors;
    },
    omniCorporationDivisionIdErrors () {
        const errors = [];
        if (!this.$v.form.omniCorporationDivisionId.$dirty) return errors;
        !this.$v.form.omniCorporationDivisionId.required && errors.push("Omni corporation is required");
        return errors;
    },
    durationMinutesErrors () {
      const errors = [];
      if (!this.$v.form.durationMinutes.$dirty) return errors;
      !this.$v.form.durationMinutes.required && errors.push("Duration minutes is invalid")
      return errors;
    }
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
          ...this.otherEarningsCharge,
          rateType: 0
      }
      if(this.$router.name === 'Edit Scheduled Deduction')
        this.form.rateType = this.form.otherEarningsRateId ? 0 : this.form.isHourlyAmount ? 1 : 2
  },
  watch: {
    form: {
          deep: true,
          handler: 'watchForm'
    },
    durationMinutes () {
      const nums = this.durationMinutes.split(':')
      if(nums.length < 2) this.form.durationMinutes = null
      if((parseInt(nums[0]) * 60 + parseInt(nums[1])) > 0)
        this.form.durationMinutes = parseInt(nums[0]) * 60 + parseInt(nums[1])
      else
        this.form.durationMinutes = null
    }
  },
  validations: {
    durationMinutes: {},
    form: {
      customAmount: {
        required: requiredIf(function(model) {
          if(model.rateType > 0) return true
          return false
        }),
        minValue: minValue(0),
      },
      earningsCodeId: { required },
      providerId: { required },
      chargeDate: { required },
      omniCorporationDivisionId: { required },
      durationMinutes: {
        required: requiredIf(function(model) {
            if(model.rateType === 1) return true
            return false
        })
      },
    },
  },
  methods: {
    changeProvider () {
      this.$v.form.providerId.$touch()
      this.form.earningsCodeId > 0 && this.form.rateType === 0 && this.findMatchingRate()
    },

    changeEarningCode () {
      this.$v.form.earningsCodeId.$touch()
      this.form.providerId > 0 && this.form.rateType === 0 && this.findMatchingRate()
    },

    changeRateType () {
      this.form.rateType === 0 && this.form.providerId > 0 && this.form.earningsCodeId > 0 && this.findMatchingRate()
      this.form.rateType !== 0 && (this.form.otherEarningsRateId = 0)
    },

    watchForm () {
      if(this.form.rateType === 1) this.form.isHourlyAmount = true
      else if(this.form.rateType === 2) this.form.isHourlyAmount = false

      if(this.form.providerId > 0)
        this.otherEarningRate.providerId = this.form.providerId
      if(this.form.earningsCodeId > 0)
        this.otherEarningRate.earningsCodeId = this.form.earningsCodeId
    },
    
    async findMatchingRate () {
      this.$store.dispatch("uxModule/showLoader", 'Lodaing data...')
      const res = await this.$store.dispatch(
        'otherEarningsModule/findMatchingRate', 
        {
          providerId: this.form.providerId, 
          earningCodeId: this.form.earningsCodeId
        }
      )
      if (res.success) {
        this.form.otherEarningsRateId = res.data.otherEarningsRateId
        this.form.isHourlyAmount = res.data.isHourlyRate        
        this.showNewRateButton = false
      }
      else {
        this.form.rateType = 0
        this.showNewRateButton = true
      }
      this.$store.dispatch("uxModule/hideLoader")
    },
    changeChargeDate(date) {
      this.$v.form.chargeDate.$touch();
      this.form.chargeDate = date
    },
    cancel() {
        this.$router.push({
            name: 'Other Earning Charges'
        })
    },

    closeModal() {
      this.newRateDialog = false
      this.findMatchingRate()
    },

    showNewRateModal () {
      this.newRateDialog = true
    },

    async saveItem() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      if(this.form.customAmount === null)this.form.customAmount = 0
      this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
      
      const success = await this.$store.dispatch(this.uxData.path, {...this.form})

      this.$store.dispatch("uxModule/hideLoader")
      
      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')

      this.$router.push({
          name: 'Other Earning Charges'
      })
    },
    
  },
};
</script>
