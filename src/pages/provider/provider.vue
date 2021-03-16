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
                text
                plain
                color="primary"
            >
                {{$route.name}}
            </v-btn>
        </div>
<v-form v-model="valid">
      <v-row>
        <v-col
            cols="12"
            md="3"
        >
            <v-select
            :items="genders"
            label="Gender"
            v-model="form.gender"
            dense
            :error-messages="genderErrors"
            @change="$v.form.gender.$touch()"
            @blur="$v.form.gender.$touch()"
            ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="3"
        >
            <v-select
            :items="titles"
            label="Title"
            v-model="form.title"
            dense
            :error-messages="titleErrors"
            @change="$v.form.title.$touch()"
            @blur="$v.form.title.$touch()"
            ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="3"
        >
            <v-text-field
            v-model="form.firstName"
            label="First Name"
            dense
            :error-messages="firstNameErrors"
            @input="$v.form.firstName.$touch()"
            @blur="$v.form.firstName.$touch()"
            ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="3"
        >
            <v-text-field
            v-model="form.lastName"
            label="Last Name"
            dense
            :error-messages="lastNameErrors"
            @input="$v.form.lastName.$touch()"
            @blur="$v.form.lastName.$touch()"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="form.streetAddress"
          label="Street address line 1"
          dense
          :error-messages="addressOneErrors"
          @input="$v.form.streetAddress.$touch()"
          @blur="$v.form.streetAddress.$touch()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="form.streetAddressLine2"
          label="Street address line 2"
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.city"
          label="City"
          dense
          :error-messages="cityErrors"
          @input="$v.form.city.$touch()"
          @blur="$v.form.city.$touch()"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
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
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="form.zipCode"
          label="Zip code"
          dense
          :error-messages="zipCodeErrors"
          @input="$v.form.zipCode.$touch()"
          @blur="$v.form.zipCode.$touch()"
          v-mask="maskZipCode"
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="form.homePhone"
          label="Home phone"
          dense
          :error-messages="homePhoneErrors"
          @input="$v.form.homePhone.$touch()"
          @blur="$v.form.homePhone.$touch()"
          v-mask="maskPhone"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="form.mobilePhone"
          label="Mobile phone"
          dense
          :error-messages="mobilePhoneErrors"
          @input="$v.form.mobilePhone.$touch()"
          @blur="$v.form.mobilePhone.$touch()"
          v-mask="maskPhone"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          v-model="form.workPhone"
          label="Work phone"
          dense
          :error-messages="workPhoneErrors"
          @input="$v.form.workPhone.$touch()"
          @blur="$v.form.workPhone.$touch()"
          v-mask="maskPhone"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-select
          :items="phoneTypes"
          label="Preferred Phone"
          v-model="form.preferredPhone"
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-if="phoneValidation">
      <v-col>
        <v-subheader>*At least one phone number is required.</v-subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.emailAddress"
          label="Email address"
          dense
          :error-messages="emailAddressErrors"
          @input="$v.form.emailAddress.$touch()"
          @blur="$v.form.emailAddress.$touch()"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="form.legacyProviderId"
          label="Legacy System Id"
          dense
          :error-messages="legacyProviderIdErrors"
          @input="$v.form.legacyProviderId.$touch()"
          @blur="$v.form.legacyProviderId.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          :items="disciplines"
          item-text="name"
          return-object
          label="Disciplines"
          v-model="form.disciplines"
          dense
          multiple
          :error-messages="disciplinesErrors"
          @change="$v.form.disciplines.$touch()"
          @blur="$v.form.disciplines.$touch()"
        >
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          :items="languages"
          item-text="name"
          return-object
          label="Languages"
          v-model="form.languages"
          dense
          multiple
          :error-messages="languagesErrors"
          @change="$v.form.languages.$touch()"
          @blur="$v.form.languages.$touch()"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
      <date-picker-component
            :pickerLabel="`App Start Date`"
            :isNullAble="true"
            @changeDate="changeAppStartDate"
      ></date-picker-component>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      @click="save"
      :disabled="!valid || phoneValidation"
    >
      Save
    </v-btn>
    <v-btn
      color="primary"
      text
      @click="close"
    >
      Cancel
    </v-btn>
  </v-form>
</v-container>
  
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email, requiredIf, requiredUnless } from 'vuelidate/lib/validators'
import Provider from "@/objs/Provider";
import { mask } from 'vue-the-mask'
import { mapGetters } from 'vuex'
import DatePickerComponent from "@/components/Shared/date-picker-component"

export default {
  name: 'Provider',
  props: {
    providerProps: {
      type: Object,
    },
  },
  components: {
    'date-picker-component': DatePickerComponent,
  },
  directives: { mask },
  mixins: [validationMixin],
  data: () => ({
    valid: false,
    form: new Provider(),
    maskZipCode: '#####',
    maskPhone: '(###) ###-####'
  }),
  computed: {
    ...mapGetters({
        genders: 'optionModule/genders',
        titles: 'optionModule/titles',
        disciplines: 'optionModule/disciplines',
        languages: 'optionModule/languages',
        phoneTypes: 'optionModule/phoneTypes',
        usStates: 'optionModule/usStates',
    }),
    uxData() {
      if(this.form.providerId > 0) {
        return {
          loaderText: 'Updating Provider...',
          path: 'providerModule/updateProvider',
          snackText: 'Updated provider successfully!'
        }
      }
      return {
        loaderText: 'Creating Provider...',
        path: 'providerModule/createProvider',
        snackText: 'Create new provider successfully!'
      }
    },
    genderErrors () {
      const errors = []
      if (!this.$v.form.gender.$dirty) return errors
      !this.$v.form.gender.required && errors.push('Gender is required')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.form.title.$dirty) return errors
      !this.$v.form.title.required && errors.push('Title is required')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.form.firstName.$dirty) return errors
      !this.$v.form.firstName.required && errors.push('First Name is required')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.lastName.$dirty) return errors
      !this.$v.form.lastName.required && errors.push('Last Name is required')
      return errors
    },
    addressOneErrors () {
      const errors = []
      if (!this.$v.form.streetAddress.$dirty) return errors
      !this.$v.form.streetAddress.required && errors.push('Street address line 1 is required')
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
    homePhoneErrors () {
      const errors = []
      if (!this.$v.form.homePhone.$dirty) return errors
      !this.$v.form.homePhone.required && errors.push('Home phone is required')
      return errors
    },
    mobilePhoneErrors () {
      const errors = []
      if (!this.$v.form.mobilePhone.$dirty) return errors
      !this.$v.form.mobilePhone.required && errors.push('Mobile phone is required')
      return errors
    },
    workPhoneErrors () {
      const errors = []
      if (!this.$v.form.workPhone.$dirty) return errors
      !this.$v.form.workPhone.required && errors.push('Mobile phone is required')
      return errors
    },
    emailAddressErrors () {
      const errors = []
      if (!this.$v.form.emailAddress.$dirty) return errors
      !this.$v.form.emailAddress.required && errors.push('Email is required')
      !this.$v.form.emailAddress.email && errors.push('Must be valid e-mail')
      return errors
    },
    legacyProviderIdErrors () {
      const errors = []
      if (!this.$v.form.legacyProviderId.$dirty) return errors
      !this.$v.form.legacyProviderId.required && errors.push('Legacy system id is required')
      return errors
    },
    disciplinesErrors () {
      const errors = []
      if (!this.$v.form.disciplines.$dirty) return errors
      !this.$v.form.disciplines.required && errors.push('Disciplines is required')
      return errors
    },
    languagesErrors () {
      const errors = []
      if (!this.$v.form.languages.$dirty) return errors
      !this.$v.form.languages.required && errors.push('Languages is required')
      return errors
    },
    phoneValidation () {
      if(this.$v.form.homePhone.requiredIf || this.$v.form.mobilePhone.requiredIf || this.$v.form.workPhone.requiredIf)return false
      return true
    }
  },
  validations: {
    form: {
        gender: { required },
        title: { required },
        firstName: { required },
        lastName: { required },
        streetAddress: { required },
        city: { required },
        state: { required },
        zipCode: { required },
        homePhone: { 
          required: requiredIf(function(model) {
                    if(model.preferredPhone === 'Home')return true
                    return false
                  }),
          requiredIf: requiredUnless(function() {
                    return (
                      this.form.mobilePhone !== '' || this.form.workPhone !== ''
                    )
                  })
        },
        
        mobilePhone: {
          required: requiredIf(function(model) {
                if(model.preferredPhone === 'Mobile')return true
                return false
            }),
          requiredIf: requiredUnless(function() {
                    return (
                      this.form.homePhone !== '' || this.form.workPhone !== ''
                    )
            })
        },
        workPhone: {
          required: requiredIf(function(model) {
                      if(model.preferredPhone === 'Work')return true
                      return false
                    }),
          requiredIf: requiredUnless(function() {
                    return (
                      this.form.mobilePhone !== '' || this.form.homePhone !== ''
                    )
                  })
        },
        emailAddress: { required, email },
        legacyProviderId: { required },
        disciplines: { required },
        languages: { required }
    }
  },
  created () {
    this.form = {
      ...this.form,
      ...this.providerProps,
      ...this.sample
    }
  },
  mounted () {
    if(this.form.languages.length === 0)
      this.form.languages = [{
        languageId: 7,
        name: "English"
      }]
  },
  methods: {
    modifyPhonenumbers () {
      this.form.homePhone && (this.form.homePhone = this.form.homePhone.replace(/\D/g, ""))
      this.form.mobilePhone && (this.form.mobilePhone = this.form.mobilePhone.replace(/\D/g, ""))
      this.form.workPhone && (this.form.workPhone = this.form.workPhone.replace(/\D/g, ""))
    },    
    async save () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      
      this.modifyPhonenumbers()
      if(this.form.preferredPhone === "")this.form.preferredPhone = null
      this.$store.dispatch("uxModule/showLoader", this.uxData.loaderText)
      
      const success = await this.$store.dispatch(this.uxData.path, { ...this.form })

      this.$store.dispatch("uxModule/hideLoader")
      
      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', this.uxData.snackText)
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
      
      this.$router.push({name: 'All Providers'})
    },
    changeAppStartDate(date){
      this.form.appStartDate = date
    },
    close() {
      this.$router.push({name: 'All Providers'})
    }
  }
}
</script>
