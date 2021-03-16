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
          <v-toolbar-title>Other earning rates</v-toolbar-title>
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
                @click="editItem(item.otherEarningsRateId)"
                :disabled="!item.canModify"
              >
                fa fa-pencil-square-o
              </v-icon>
            </span>            
          </template>
          <span v-if="!item.canModify">This rate cannot be modified, as there are already charges associated with it.</span>
          <span v-else>Edit other earning rate</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                
                @click="deleteItem(item.otherEarningsRateId)"
                :disabled="!item.canModify"
              >
                fa fa-trash-o
              </v-icon>
            </span>            
          </template>
          <span v-if="!item.canModify">This rate cannot be modified, as there are already charges associated with it.</span>
          <span v-else>Delete other earning rate</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                @click="duplicate(item.otherEarningsRateId)"
              >
                fa fa-files-o
              </v-icon>
            </span>            
          </template>
          <span>Duplicate item</span>
        </v-tooltip>       
      </template>
    </v-data-table>
    <v-dialog v-model="newRateDialog" persistent width="500">
      <other-earning-rate-modal
        v-if="newRateDialog"
        :otherEarning="individualOtherEarningRate"
        @close="newRateDialog = false"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import OtherEarningRate from "@/objs/OtherEarningRate"
import OtherEarningRateModal from "@/components/modal/other-earning-rate-modal"
export default {
  components: {
    'other-earning-rate-modal': OtherEarningRateModal
  },
  data: () => ({
    newRateDialog: false,
    individualOtherEarningRate: new OtherEarningRate(),
    headers: [
      {
        text: 'Earning Type',
        value: 'earningType'
      },
      {
        text: 'Rate Type',
        value: 'rateType',
        sortable: false
      },
      {
        text: 'Effective Date',
        value: 'effectiveDate',
        sortable: false
      },
      {
        text: 'Amount',
        value: 'amount',
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
      otherEarnings: 'providerModule/otherEarnings',
      earningsCodes: 'optionModule/earningsCodes',
      providerId: 'providerModule/selectedProviderId',
    }),
    tableData () {
      let $this = this
      let buf = []
      let otherEarning = {}
      this.otherEarnings.map(item =>{
        otherEarning.otherEarningsRateId = item.otherEarningsRateId
        otherEarning.canModify = item.canModify
        otherEarning.earningType = $this.earningsCodes.find(obj => {return obj.earningsCodeId === item.earningsCodeId}).name
        otherEarning.rateType = (item.isHourlyRate ? 'Hourly' : 'Flat fee')
        otherEarning.effectiveDate = item.effectiveDate.substring(0, 10)
        otherEarning.amount = `$${item.amount}`
        buf.push({...otherEarning})
      })
      return buf
    },
  },
  async created () {
    this.$store.dispatch("uxModule/showLoader", "Loading data...")
    await this.$store.dispatch('providerModule/getOtherEarningRatesForProvider', this.providerId)
    console.log(this.otherEarnings, 'othereanrings')
    this.$store.dispatch("uxModule/hideLoader")
  },

  methods: {
    newItem() {
      let earningRate = new OtherEarningRate()
      earningRate.providerId = this.providerId

      this.individualOtherEarningRate = {
        ...this.individualOtherEarningRate,
        ...earningRate
      }
      this.newRateDialog = true
    },
    duplicate(rateId) {
      const findIndex = this.otherEarnings.findIndex(({otherEarningsRateId}) => otherEarningsRateId === rateId)
      this.individualOtherEarningRate = {...this.otherEarnings[findIndex]}
      this.individualOtherEarningRate.otherEarningsRateId = 0
      this.newRateDialog = true
    },
    editItem(rateId) {
      const findIndex = this.otherEarnings.findIndex(({otherEarningsRateId}) => otherEarningsRateId === rateId)
      this.individualOtherEarningRate = {
        ...this.individualOtherEarningRate,
        ...this.otherEarnings[findIndex]
      }
      this.newRateDialog = true
    },
    async deleteItem (otherRateId) {
      console.log(otherRateId)
      this.$store.dispatch("uxModule/showLoader", "Deleting other  earning rate...")
      await this.$store.dispatch('providerModule/deleteOtherEarningsRate', otherRateId)
      this.$store.dispatch("uxModule/hideLoader")
    }
  }
}
</script>
