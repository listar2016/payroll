<template>
  <v-container fluid>
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
                text
                plain
                color="primary"
            >
                {{$route.name}}
            </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      sort-by="effective_date"
      class="elevation-1 mx-auto"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Rates List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="newItem"
          >
            New Rate
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.groupSize="{ item }">
        <span v-if="item.isGroup">{{item.groupSize}}</span>
        <span v-else class="n-a-grey">N/A</span>
      </template>
      <template v-slot:item.isBilingual="{ item }">
        <span v-if="item.isBilingual">
          <span v-for="(itm, idx) in item.languages" :key="idx" small>
            {{itm.name}}
            <span v-if="idx!==item.languages.length-1">, </span>
          </span>
        </span>
        <span v-else class="n-a-grey">N/A</span>
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
                @click="editItem(item.sessionRateId)"
                :disabled="!item.canModify"
              >
                fa fa-pencil-square-o
              </v-icon>
            </span>            
          </template>
          <span v-if="!item.canModify">This rate cannot be modified, as there are already charges associated with it.</span>
          <span v-else>Edit session rate</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                
                @click="deleteItem(item.sessionRateId)"
                :disabled="!item.canModify"
              >
                fa fa-trash-o
              </v-icon>
            </span>            
          </template>
          <span v-if="!item.canModify">This rate cannot be modified, as there are already charges associated with it.</span>
          <span v-else>Delete session rate</span>
        </v-tooltip>        
        <v-icon
          x-small
          class="mr-2"
          color="primary"
          @click="duplicate(item.sessionRateId)"
        >
          fa fa-files-o
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import SessionRate from "@/objs/SessionRate"
export default {
  components: {
    // NewRatesModal
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Effective',
        value: 'effectiveDate'
      },
      {
        text: 'Tax Status',
        value: 'taxStatusId',
        sortable: false
      },
      {
        text: 'Program',
        value: 'programId',
        sortable: false
      },
      {
        text: 'Service',
        value: 'serviceId',
        sortable: false
      },
      {
        text: 'Unit',
        value: 'rateUnitTypeId',
        sortable: false
      },
      {
        text: 'Location',
        value: 'sessionLocationId',
        sortable: false
      },
      
      {
        text: 'Group',
        value: 'groupSize',
        sortable: false
      },
      {
        text: 'Bilingual',
        value: 'isBilingual',
        sortable: false
      },
      {
        text: 'Amount',
        value: 'dollarAmount',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ]
  }),
  computed: {
    ...mapGetters({
      selectedProviderName: 'providerModule/selectedProviderName',
      sessionRates: 'providerModule/sessionRates',
      programs: 'optionModule/programs',
      rateUnitTypes: 'optionModule/rateUnitTypes',
      services: 'optionModule/services',
      sessionLocations: 'optionModule/sessionLocations',
      taxStatuses: 'optionModule/taxStatuses',
      providerId: 'providerModule/selectedProviderId'
    }),
    tableData () {
      let buf = []
      let sessionItem = {}
      this.sessionRates.map(item =>{
        sessionItem = {
          ...item
        }
        sessionItem.effectiveDate = item.effectiveDate.substring(0, 10)
        sessionItem.dollarAmount = `$${item.dollarAmount}`
        sessionItem.programId = this.programs.find(obj => {return obj.programId === item.programId}).name
        sessionItem.rateUnitTypeId = this.rateUnitTypes.find(obj => {return obj.rateUnitTypeId === item.rateUnitTypeId}).name
        sessionItem.serviceId = this .services.find(obj => {return obj.serviceId === item.serviceId}).name
        if(item.sessionLocationId){
          sessionItem.sessionLocationId = this.sessionLocations.find(obj => {return obj.sessionLocationId === item.sessionLocationId}).name
        } else {
          sessionItem.sessionLocationId = 'Location Type'
        }
        sessionItem.taxStatusId = this.taxStatuses.find(obj => {return obj.taxStatusId === item.taxStatusId}).name
        if(item.groupSize === 0) sessionItem.groupSize = `${item.groupSizeMin} - ${item.groupSizeMax}`
        buf.push({...sessionItem})
      })
      return buf
    },
  },
  async created () {
    this.$store.dispatch("uxModule/showLoader", "Loading data...")
    await this.$store.dispatch('providerModule/getSessionRatesForProvider', this.providerId)
    this.$store.dispatch("uxModule/hideLoader")
  },
  methods: {
    newItem() {
      let sessionRate = new SessionRate()
      sessionRate.providerId = this.providerId
      this.$router.push({
        name: 'New Session Rate',        
        params: {
          sessionRate: sessionRate
        }
      })
    },
    editItem(rateId) {
      const findIndex = this.sessionRates.findIndex(({sessionRateId}) => sessionRateId === rateId)
      this.$router.push({
        name: 'New Session Rate',
        params: {
          sessionRate: {...this.sessionRates[findIndex]}
        }
      })
    },
    duplicate(rateId) {
      const findIndex = this.sessionRates.findIndex(({sessionRateId}) => sessionRateId === rateId)
      let buf = {...this.sessionRates[findIndex]}
      buf.sessionRateId = 0
      this.$router.push({
        name: 'New Session Rate',
        params: {
          sessionRate: {...buf}
        }
      })
    },
    async deleteItem (sessionRateId) {
      this.$store.dispatch("uxModule/showLoader", "Deleting session rate...")
      const success = await this.$store.dispatch('providerModule/deleteSessionRate', sessionRateId)
      this.$store.dispatch("uxModule/hideLoader")

      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', "Deleted an item successfully")
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
    }
  }
}
</script>
