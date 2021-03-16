<template>
  <v-container>
    <div class="d-flex pb-10 mb-5">
            <v-btn
                text
                plain
                color="primary"
                link
                :to="{name: 'All Providers'}"
            >
                Provider Rates
            </v-btn>
            <v-icon
                color="primary"
            >
                mdi-menu-right
            </v-icon>
            <v-btn
                class="lower-case"
                text
                plain
                color="primary"
                link
                :to="{name: 'All Providers'}"
            >
                {{ selectedProviderName }}
            </v-btn>
            <v-icon
                color="primary"
            >
                mdi-menu-right
            </v-icon>
            <v-btn
                v-if="form.sessionRateId === 0"
                text
                plain
                color="primary"
            >
                {{$route.name}}
            </v-btn>
            <v-btn
                v-else
                text
                plain
                color="primary"
            >
                Edit Session Rate
            </v-btn>
        </div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Session Rate</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
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
            :items="programs"
            item-text="name"
            item-value="programId"
            label="Program"
            v-model="form.programId"
            dense
            :error-messages="programIdErrors"
            @change="$v.form.programId.$touch()"
            @blur="$v.form.programId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
          <v-select
            :items="services"
            item-text="name"
            item-value="serviceId"
            label="Service"
            v-model="form.serviceId"
            dense
            :error-messages="serviceIdErrors"
            @change="$v.form.serviceId.$touch()"
            @blur="$v.form.serviceId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :items="taxStatuses"
            item-text="name"
            item-value="taxStatusId"
            label="Tax/Billing Status"
            v-model="form.taxStatusId"
            dense
            :error-messages="taxStatusIdErrors"
            @change="$v.form.taxStatusId.$touch()"
            @blur="$v.form.taxStatusId.$touch()"
          ></v-select>
        </v-col>
        <v-col
            v-if="form.taxStatusId===3 && associatedCorporations.length > 0"
            cols="12"
            md="3"
        >
            <v-radio-group
                v-model="professionActionType"
                class="mt-0"
            >
                <v-radio
                    v-for="(item, index) in professionActionRadios"
                    :key="index"
                    :label="item.text"
                    :value="item.value"
                ></v-radio>
            </v-radio-group>
        </v-col>
        <v-col
            v-if="form.taxStatusId===3 && professionActionType===1 && associatedCorporations.length > 0"
        >
            <v-select
                :items="associatedCorporations"
                item-text="name"
                item-value="providerCorporationId"
                label="Select an existing company"
                v-model="form.providerCorporationId"
                dense
                :error-messages="providerCorporationIdErrors"
                @change="$v.form.providerCorporationId.$touch()"
                @blur="$v.form.providerCorporationId.$touch()"
            ></v-select>
        </v-col>
        <v-col
            v-if="form.taxStatusId===3 && (associatedCorporations.length===0 || professionActionType===2)"
        >
            <v-btn
                color="primary"
                @click="createCorporation(false)"
            >
                Create new company
            </v-btn>
        </v-col>
        <v-col
            v-if="form.taxStatusId===4"
            cols="12"
            md="3"
        >
            <v-radio-group 
                v-model="agencyActionType"
                class="mt-0"
            >
                <v-radio
                    v-for="(item, index) in agencyActionRadios"
                    :key="index"
                    :label="item.text"
                    :value="item.value"
                ></v-radio>
            </v-radio-group>
        </v-col>
        <v-col
            v-if="form.taxStatusId===4 && agencyActionType===1"
        >
            <v-select
                :items="allStaffingAgencies"
                item-text="name"
                item-value="providerCorporationId"
                label="Select staffing agency"
                v-model="form.providerCorporationId"
                dense
                :error-messages="providerCorporationIdErrors"
                @change="$v.form.providerCorporationId.$touch()"
                @blur="$v.form.providerCorporationId.$touch()"
            ></v-select>
        </v-col>
        <v-col
            v-if="form.taxStatusId===4 && (allStaffingAgencies.length===0 || agencyActionType===2)"
        >
            <v-btn
                color="primary"
                @click="createCorporation(true)"
            >
                Create new company
            </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :items="rateUnitTypes"
            item-text="name"
            item-value="rateUnitTypeId"
            label="Unit Type"
            v-model="form.rateUnitTypeId"
            dense
            :error-messages="rateUnitTypeIdErrors"
            @change="$v.form.rateUnitTypeId.$touch()"
            @blur="$v.form.rateUnitTypeId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        
        <v-col cols="12" md="6">
          <v-select
            :items="sessionLocationCategories"
            label="Location Type"
            v-model="form.sessionLocationCategory"
            dense
            :error-messages="sessionLocationCategoryErrors"
            @change="$v.form.sessionLocationCategory.$touch()"
            @blur="$v.form.sessionLocationCategory.$touch()"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-if="form.sessionLocationCategory === 'Specific location'"
            :items="sessionLocations"
            item-text="name"
            item-value="sessionLocationId"
            label="Location"
            clearable
            dense
            v-model="form.sessionLocationId"
            :error-messages="sessionLocationIdErrors"
            @change="$v.form.sessionLocationId.$touch()"
            @blur="$v.form.sessionLocationId.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="form.isGroup"
            label="Group"
            dense
            hide-details="auto"
            class="mt-0"
          ></v-checkbox>
        </v-col>
        <v-col 
            v-if="form.isGroup"
            cols="12"
            md="4"            
        >
            <v-radio-group 
                v-model="groupType"
                class="mt-0"
            >
                <v-radio
                    v-for="(item, index) in groupRadios"
                    :key="index"
                    :label="item.text"
                    :value="item.value"
                ></v-radio>
            </v-radio-group>
        </v-col>
        <v-col
            v-if="form.isGroup && groupType===1"
            cols="12"
            md="2"
        >
            <v-text-field
                v-model="form.groupSize"
                label="Group Size"
                dense
                type="number"
                min="0"
                step="1"
                :error-messages="groupSizeErrors"
                @input="$v.form.groupSize.$touch()"
                @blur="$v.form.groupSize.$touch()"
          ></v-text-field>
        </v-col>
        <v-col
            v-if="form.isGroup && groupType===2"
            class="d-flex"
            cols="12"
            md="4"
        >
            <v-text-field
                v-model="form.groupSizeMin"
                class="mr-5"
                label="Min"
                dense
                type="number"
                min="0"
                step="1"
                :error-messages="groupSizeMinErrors"
                @input="$v.form.groupSizeMin.$touch()"
                @blur="$v.form.groupSizeMin.$touch()"
          ></v-text-field>

          <v-text-field
                v-model="form.groupSizeMax"
                label="Max"
                dense
                type="number"
                min="0"
                step="1"
                :error-messages="groupSizeMaxErrors"
                @input="$v.form.groupSizeMax.$touch()"
                @blur="$v.form.groupSizeMax.$touch()"
          ></v-text-field>
        </v-col>

      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="form.isBilingual"
            label="Bilingual"
            dense
            hide-details="auto"
            class="mt-0"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-select
            v-if="form.isBilingual"
            v-model="form.languages"
            :items="languages"
            item-text="name"
            return-object
            label="Language"
            chips
            clearable
            dense
            multiple
            :error-messages="languagesErrors"
            @change="$v.form.languages.$touch()"
            @blur="$v.form.languages.$touch()"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="form.dollarAmount"
            label="Amount"
            dense
            prefix="$"
            type="number"
            min="0"
            step="0.01"
            :error-messages="dollarAmountErrors"
            @input="$v.form.dollarAmount.$touch()"
            @blur="$v.form.dollarAmount.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel"> Cancel </v-btn>
        <v-btn 
          color="primary"
          @click="saveRates()"
          :disabled="!valid">
          Assign Rate
        </v-btn>
      </v-row>
    </v-form>
    <v-dialog v-model="corporationDialog" persistent width="500">
      <individual-coporation-modal
        v-if="corporationDialog"
        :corporation="newCorporation"
        @setNewCompany="setNewCompany"
        @close="corporationDialog = false"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minValue, requiredIf } from "vuelidate/lib/validators";
import datePickerComponent from '@/components/Shared/date-picker-component.vue';
import IndividualCoporationModal from "@/components/modal/Individual-coporation-modal.vue";
import SessionRate from "@/objs/SessionRate"
import ProviderCorporation from "@/objs/ProviderCorporation"

export default {
    components: { 
      datePickerComponent,
      IndividualCoporationModal
    },
  name: "NewRatesModal",
  mixins: [validationMixin],
  props: ["sessionRate"],
  data: () => ({
    valid: false,
    form: new SessionRate(),
    corporationDialog: false,
    newCorporation: new ProviderCorporation(),
    groupType: 0,
    groupRadios: [
        {
            text: 'Specific group size',
            value: 1,
        },
        {
            text: 'Group size range',
            value: 2,
        }
    ],
    agencyActionType: 1,
    agencyActionRadios: [
        {
            text: 'Select existing staffing agency',
            value: 1,
        },
        {
            text: 'Create new staffing agency',
            value: 2,
        }
    ],
    professionActionType: 1,
    professionActionRadios: [
        {
            text: 'Select existing company',
            value: 1,
        },
        {
            text: 'Create new company',
            value: 2,
        }
    ]
  }),
  computed: {
    ...mapGetters({
      selectedProviderName: 'providerModule/selectedProviderName',
      taxStatuses: "optionModule/taxStatuses",
      services: "optionModule/assoicatedServices", // Only gets associated services before routing all session rates page
      programs: "optionModule/programs",
      rateUnitTypes: "optionModule/rateUnitTypes",
      languages: "optionModule/languages",
      sessionLocationCategories: "optionModule/sessionLocationCategories",
      sessionLocations: "optionModule/sessionLocations",
      allStaffingAgencies: "providerModule/allStaffingAgencies",
      associatedCorporations: "providerModule/associatedCorporations"
    }),
    uxData() {
      if(this.form.sessionRateId > 0) {
        return {
          loaderText: 'Updating session Rate...',
          path: 'providerModule/updateSessionRate',
          snackText: 'Updated session rate successfully!'
        }
      }
      return {
        loaderText: 'Creating session Rate...',
        path: 'providerModule/createSessionRate',
        snackText: 'Create new session rate successfully!'
      }
    },
    effectiveDateErrors() {
      const errors = [];
      if (!this.$v.form.effectiveDate.$dirty) return errors;
      !this.$v.form.effectiveDate.required &&
        errors.push("Effective date is required");
      return errors;
    },
    programIdErrors() {
      const errors = [];
      if (!this.$v.form.programId.$dirty) return errors;
      !this.$v.form.programId.required && errors.push("Program is required");
      return errors;
    },
    serviceIdErrors() {
      const errors = [];
      if (!this.$v.form.serviceId.$dirty) return errors;
      !this.$v.form.serviceId.required && errors.push("Service is required");
      return errors;
    },
    taxStatusIdErrors() {
      const errors = [];
      if (!this.$v.form.taxStatusId.$dirty) return errors;
      !this.$v.form.taxStatusId.required &&
        errors.push("Tax status is required");
      return errors;
    },
    providerCorporationIdErrors() {
        const errors = [];
        if (!this.$v.form.providerCorporationId.$dirty) return errors;
        !this.$v.form.providerCorporationId.required && errors.push("Provider corporation is required");
        return errors;
    },
    rateUnitTypeIdErrors() {
      const errors = [];
      if (!this.$v.form.rateUnitTypeId.$dirty) return errors;
      !this.$v.form.rateUnitTypeId.required && errors.push("Unity type is required");
      return errors;
    },
    sessionLocationCategoryErrors() {
      const errors = [];
      if (!this.$v.form.sessionLocationCategory.$dirty) return errors;
      !this.$v.form.sessionLocationCategory.required && errors.push("Location Category is required");
      return errors;
    },
    sessionLocationIdErrors() {
      const errors = [];
      if (!this.$v.form.sessionLocationId.$dirty) return errors;
      !this.$v.form.sessionLocationId.required && errors.push("Loaction is required");
      return errors;
    },
    groupSizeErrors() {
      const errors = [];
      if (!this.$v.form.groupSize.$dirty) return errors;
      !this.$v.form.groupSize.required && errors.push("Group size is required");
      return errors;
    },
    groupSizeMinErrors() {
      const errors = [];
      if (!this.$v.form.groupSizeMin.$dirty) return errors;
      !this.$v.form.groupSizeMin.required && errors.push("Min size is required");
      return errors;
    },
    groupSizeMaxErrors() {
      const errors = [];
      if (!this.$v.form.groupSizeMax.$dirty) return errors;
      !this.$v.form.groupSizeMax.required && errors.push("Max size is required");
      return errors;
    },
    languagesErrors() {
      const errors = [];
      if (!this.$v.form.languages.$dirty) return errors;
      console.log(this.$v.form.languages.required)
      !this.$v.form.languages.required && errors.push("Languages is required");
      return errors;
    },

    dollarAmountErrors() {
      const errors = [];
      if (!this.$v.form.dollarAmount.$dirty) return errors;
      !this.$v.form.dollarAmount.required &&
        errors.push("Rate amount is required");
      !this.$v.form.dollarAmount.minValue &&
        errors.push("Rate amount is invalid");
      return errors;
    },
    
  },
  
  async created () {
    await this.$store.dispatch('providerModule/getAllStaffingAgencies')
    await this.$store.dispatch('providerModule/getCorporationsForProvider', this.sessionRate.providerId)
      
  },
  mounted () {
      this.form = {
          ...this.form,
          ...this.sessionRate
      }
  },
  validations: {
    form: {
        programId: { required },
        effectiveDate: { required },
        serviceId: { required },
        taxStatusId: { required },
        rateUnitTypeId: { required },
        sessionLocationCategory: { required },
        sessionLocationId: {
            required: requiredIf((form) => {
                return form.sessionLocationCategory === 'Specific location'
            })
        },
        providerCorporationId: {
            required: requiredIf((form) => {
                return form.taxStatusId > 2
            })
        },
        languages: {
          required: requiredIf((form) =>{
              return form.isBilingual
          })  
        },
        groupSize: {
            required,
            minValue: minValue(0)
        },
        groupSizeMin: {
            required, 
            minValue: minValue(0)
        },
        groupSizeMax: {
            required,
            minValue: minValue(0)
        },
        dollarAmount: {
            required,
            minValue: minValue(0),
        },
    },
  },
  watch: {
      form: {
          deep: true,
          handler: 'watchForm'
      },
      professionActionType() {
        if(this.professionActionType === 2) this.form.providerCorporationId = null
      },
      agencyActionType () {
        if(this.agencyActionType === 2) this.form.providerCorporationId = null
      },
      groupType () {
          if(this.groupType === 1){
              this.form.groupSizeMin = 0
              this.form.groupSizeMax = 0
          } 
          else if(this.groupType === 2)
            this.form.groupSize = 0
      }
  },
  methods: {
    watchForm(newValue) {
        console.log(this.allStaffingAgencies, this.associatedCorporations)
        if(newValue.taxStatusId === 3 && newValue.providerCorporationId > 0)
            this.professionActionType = 1
        else if (newValue.taxStatusId === 4 && newValue.providerCorporationId > 0)
            this.agencyActionType = 1
        else if (newValue.taxStatusId < 3) this.form.providerCorporationId = null
        if(newValue.isGroup && newValue.groupSize > 0)
            this.groupType = 1
        if(newValue.isGroup && newValue.groupSizeMin > 0)
            this.groupType = 2
        if(!newValue.isGroup){
            newValue.groupSize = 0
            newValue.groupSizeMin = 0
            newValue.groupSizeMax = 0
        }
    },
    changeEffectiveDate(date) {
      this.$v.form.effectiveDate.$touch();
      this.form.effectiveDate = date
    },
    createCorporation(value) {
        this.newCorporation.isStaffingAgency = value
        this.corporationDialog = true
    },
    setNewCompany(corporationId) {
        if(this.form.taxStatusId===3)
            this.professionActionType = 1
        else if(this.form.taxStatusId===4)
            this.agencyActionType = 1
        this.form.providerCorporationId = corporationId
    },
    cancel() {
        this.$router.push({
            name: 'All Session Rates'
        })
    },
    async saveRates() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        if(this.form.taxStatusId > 2 && !this.form.providerCorporationId)
          this.$store.dispatch('uxModule/showSnackBarMsg', 'You need to create/select a company')
        return;
      }
      if(this.form.providerCorporationId === 0) this.form.providerCorporationId = null
      if(this.form.sessionLocationId === 0) this.form.sessionLocationId = null
      this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
      console.log(this.form)
      const success = await this.$store.dispatch(this.uxData.path, {...this.form})

      this.$store.dispatch("uxModule/hideLoader")
      
      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')

      this.$router.push({
          name: 'All Session Rates'
      })
    },
  },
};
</script>
