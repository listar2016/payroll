<template>
  <v-card :class="loadingClass">
    <v-card-title class="headline">
      Provider Corporation
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-checkbox
                v-model="form.isStaffingAgency"
                label="Staffing agency"
                :disabled="isDisableStaffingCheckbox"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.name"
              label="Name"
              dense
              :error-messages="nameErrors"
              @input="$v.form.name.$touch()"
              @blur="$v.form.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.taxId"
              label="Tax ID"
              dense
              :error-messages="taxIdErrors"
              @input="$v.form.taxId.$touch()"
              @blur="$v.form.taxId.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.streetAddress"
              label="Street Address"
              dense
              :error-messages="streetAddressErrors"
              @input="$v.form.streetAddress.$touch()"
              @blur="$v.form.streetAddress.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.streetAddressLine2"
              label="Apartment / Suite"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.city"
              label="City"
              dense
              :error-messages="cityErrors"
              @input="$v.form.city.$touch()"
              @blur="$v.form.city.$touch()"
            ></v-text-field>
          </v-col>          
          <v-col>
            <v-select
              :items="usStates"
              label="State"
              v-model="form.state"
              dense
              :error-messages="stateErrors"
              @change="$v.form.state.$touch()"
              @blur="$v.form.state.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.zipCode"
              label="Zip Code"
              dense
              v-mask="maskZipCode"
              :error-messages="zipCodeErrors"
              @input="$v.form.zipCode.$touch()"
              @blur="$v.form.zipCode.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.phoneNumber"
              label="Phone Number"
              dense
              v-mask="maskPhone"
              :error-messages="phoneNumberErrors"
              @input="$v.form.phoneNumber.$touch()"
              @blur="$v.form.phoneNumber.$touch()"
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
        @click="saveCorporation"
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
import { mask } from 'vue-the-mask'
import { required, minLength } from 'vuelidate/lib/validators'
import ProviderCorporation from "@/objs/ProviderCorporation"

export default {
  name: 'NewRatesModal',
  mixins: [validationMixin],
  directives: { mask },
  props: ['corporation'],
  data: () => ({
    valid: false,
    loadingClass: '',
    form: new ProviderCorporation(),
    maskZipCode: '#####',
    maskPhone: '(###) ###-####'
  }),
  computed: {
    ...mapGetters({
      usStates: 'optionModule/usStates'
    }),
    uxData() {
      if(this.form.providerCorporationId > 0) {
        return {
          loaderText: 'Updating provider corporation...',
          path: 'providerModule/updateProviderCorporation',
          snackText: 'Updated successfully!'
        }
      }
      return {
        loaderText: 'Creating provider corporation...',
        path: 'providerModule/createProviderCorporation',
        snackText: 'Created successfully!'
      }
    },
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Name is required')
      return errors
    },
    taxIdErrors () {
      const errors = []
      if (!this.$v.form.taxId.$dirty) return errors
      !this.$v.form.taxId.required && errors.push('Tax Id is required')
      return errors
    },
    streetAddressErrors () {
      const errors = []
      if (!this.$v.form.streetAddress.$dirty) return errors
      !this.$v.form.streetAddress.required && errors.push('Street Address is required')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.form.city.$dirty) return errors
      !this.$v.form.city.required && errors.push('City is required')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.form.state.$dirty) return errors
      !this.$v.form.state.required && errors.push('State is required')
      return errors
    },
    zipCodeErrors () {
      const errors = []
      if (!this.$v.form.zipCode.$dirty) return errors
      !this.$v.form.zipCode.required && errors.push('Zip code is required')
      return errors
    },
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.form.phoneNumber.$dirty) return errors
      !this.$v.form.phoneNumber.required && errors.push('Phone number is required')
      !this.$v.form.phoneNumber.minLength && errors.push('Invalid format')
      return errors
    },
    isDisableStaffingCheckbox () {
      if(this.$route.name === 'New Session Rate') return true
      return false
    }
  },
  validations: {
    form: {
        name: { required },
        taxId: { required },
        streetAddress: { required },
        city: { required },
        state: { required },
        zipCode: { required },
        phoneNumber: { 
            required,
            minLength: minLength(14)
        },
    }
  },
  mounted () {
      this.form = {
          ...this.corporation
      }
  },
  methods: {
    async saveCorporation () {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
        return
        }
        this.form.phoneNumber = this.form.phoneNumber.replace(/\D/g, "")
        
        this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
        this.loadingClass = 'modal-underloading'
        const res = await this.$store.dispatch(this.uxData.path, {...this.form})
        this.$store.dispatch("uxModule/hideLoader")
        if(this.$route.name === 'New Session Rate')
          this.$emit('setNewCompany', res.data.providerCorporationId)
        if(res.success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
        else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
        this.$emit('close')        
    }
  }
}
</script>
