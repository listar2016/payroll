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
      <v-toolbar flat color="white" class="mb-5">
          <v-toolbar-title>Scheduled deductions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="newItem"
          >
            New
          </v-btn>
        </v-toolbar>
      <v-toolbar flat color="white">
          <v-row  class="mt-5 mb-2">
            <v-spacer></v-spacer>
            
            <v-col cols="12" md="3">
              <v-select
                height="42"
                v-model="filterActivation"
                :items="activationTypes"
                label="Show activation status"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                height="42"
                v-model="filterType"
                item-text="name"
                item-value="earningsCodeId"
                :items="deductionTypes"
                multiple
                label="Show deduction type"
              > 
              </v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="searchQuery"
                clearable
                label="Search"
                height="42"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="tableData"
      sort-by="effective_date"
      class="elevation-1 mx-auto"
    >
      <template v-slot:item.amount="{ item }">
        ${{item.amount}}
      </template>
      <template v-slot:item.activation="{ item }">
        <v-switch
            :input-value="item.isActive"
            value
            @change="changeActivation(item.scheduledDeductionId)"
        ></v-switch>
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-on="on" v-bind="attrs">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="editItem(item.scheduledDeductionId)"
              >
                fa fa-pencil-square-o
              </v-icon>
            </span>            
          </template>
          <span>Edit scheduled deduction</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                
                @click="deleteItem(item.scheduledDeductionId)"
              >
                fa fa-trash-o
              </v-icon>
            </span>            
          </template>
          <span>Delete scheduled deduction</span>
        </v-tooltip>  
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import ScheduledDeduction from '@/objs/other-earnings/ScheduledDeduction';

export default {
  components: {
    
  },
  data: () => ({
    headers: [
      {
        text: 'Provider Name',
        value: 'providerName'
      },
      {
        text: 'Deduction Type',
        value: 'deductionType',
        sortable: false
      },
      {
        text: 'Amount',
        value: 'amount',
        sortable: false
      },
      {
        text: 'Effective Date',
        value: 'effectiveDate',
        sortable: false
      },
      {
        text: 'Activation',
        value: 'activation',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    activationTypes: [
      {
        text: 'All',
        value: 0,
      },
      {
        text: 'Activatived',
        value: 1
      },
      {
        text: 'Deactivated',
        value: 2
      }
    ],
    filterActivation: 0,
    filterType: [],
    searchQuery: '',
  }),
  computed: {
    ...mapGetters({
      providers: 'providerModule/providers',
      earningsCodes: 'optionModule/earningsCodes',
      scheduledDeductions: 'otherEarningsModule/scheduledDeductions',

    }),
    tableData () {
      let $this = this
      let buf = []
      if(this.filterActivation > 0)
        buf = this.scheduledDeductions.filter(function (item) {
          return $this.filterActivation === 1 ? item.isActive : !item.isActive
        });
      else
        buf = this.scheduledDeductions.slice()  
      
      if(this.filterType.length > 0)
        buf = buf.filter(function (item) {
          return $this.filterType.includes(item.earningsCodeId)
        })

      buf.map(item =>{
        const provider = $this.providers.find(obj => { return obj.providerId === item.providerId})
        provider && (item.providerName = provider.firstName + ' ' + provider.lastName)
        const earningType = $this.earningsCodes.find(obj => {return obj.earningsCodeId === item.earningsCodeId})
        earningType && (item.deductionType = earningType.name )
        item.effectiveDate = item.effectiveDate.substring(0, 10)
      })

      if(this.searchQuery)
        buf = buf.filter(function (item) {
          return item.providerName.includes($this.searchQuery)
        })
      
      return buf
    },
    deductionTypes () {
        return this.earningsCodes.filter((item) => {
            return item.canSchedule
        })        
    },
  },
  async created () {
    this.$store.dispatch("uxModule/showLoader", 'Loading data...')
    if(this.providers.length === 0)
        await this.$store.dispatch('providerModule/getAllProviders')
    await this.$store.dispatch('otherEarningsModule/getAllScheduledDeductions')
    this.$store.dispatch("uxModule/hideLoader")
  },
  methods: {
      newItem () {
          const item = new ScheduledDeduction();
          this.$router.push({
            name: 'New Scheduled Deduction',
            prams: {
                scheduledDeduction: { ...item }
            }
        })
      },
      editItem (deductionId) {
          const findIndex = this.scheduledDeductions.findIndex(
            ({ scheduledDeductionId }) => scheduledDeductionId === deductionId
        );
        let item = this.scheduledDeductions[findIndex]
        this.$router.push({
            name: 'Edit Scheduled Deduction',
            params: {
                scheduledDeduction: { ...item }
            }
        })
      },
      async deleteItem (deductionId) {
            this.$store.dispatch("uxModule/showLoader", 'Deleting Item')
            const success = await this.$store.dispatch('otherEarningsModule/deleteScheduledDeduction', deductionId)

            this.$store.dispatch("uxModule/hideLoader")
            
            if(success) this.$store.dispatch('uxModule/showSnackBarMsg', 'Deleted successfully')
            else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
      },
      async changeActivation (deductionId) {
          const findIndex = this.scheduledDeductions.findIndex(
            ({ scheduledDeductionId }) => scheduledDeductionId === deductionId
        );
        let item = this.scheduledDeductions[findIndex]
        item.isActive = !item.isActive

        this.$store.dispatch("uxModule/showLoader", 'Updating Item')
        const success = await this.$store.dispatch('otherEarningsModule/updateScheduledDeduction', {...item})

        this.$store.dispatch("uxModule/hideLoader")
        
        if(success) this.$store.dispatch('uxModule/showSnackBarMsg', 'Updated successfully')
        else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
      },
      toggle () {
        this.$nextTick(() => {
          if (this.filterType.length) {
            this.filterType = []
          } else {
            this.filterType = this.deductionTypes.map( item => item.earningsCodeId)
          }
        })
    },
  }
}
</script>
