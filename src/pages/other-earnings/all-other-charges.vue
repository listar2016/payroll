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
          <v-toolbar-title>Other Earning Charges</v-toolbar-title>
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
                v-model="filterEarningsType"
                :items="earningsTypes"
                multiple
                label="Earnings Type"
              ></v-select>
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
      <template v-slot:item.customAmount="{ item }">
        ${{item.customAmount}}
      </template>
      
      <template v-slot:item.actions="{ item }">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                title="Edit item"
                @click="editItem(item.otherEarningsChargeId)"
                :disabled="!item.canModify"
              >
                fa fa-pencil-square-o
              </v-icon>
            <v-icon
              x-small
              class="mr-2"
              color="primary"
              title="Delete item"
              @click="deleteItem(item.otherEarningsChargeId)"
              :disabled="!item.canModify"
            >
              fa fa-trash-o
            </v-icon>
            <v-icon
              x-small
              color="primary"
              title="Revert item"
              @click="revertItem(item.otherEarningsChargeId)"
              :disabled="item.canModify || item.isReversed"
            >
              fa fa-undo
            </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="confirmRevertDialog" persistent width="500">
      <confirm-revert-modal
        v-if="confirmRevertDialog"
        @confirm="confirmRevert"
        @close="confirmRevertDialog = false"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import OtherEarningsCharge from '@/objs/other-earnings/OtherEarningsCharge';
import ConfirmRevertModal from "@/components/modal/confirm-revert-modal"

export default {
  components: {
    "confirm-revert-modal": ConfirmRevertModal
  },
  data: () => ({
    headers: [
      {
        text: 'Charge Id',
        value: 'otherEarningsChargeId'
      },
      {
        text: 'Provider Name',
        value: 'providerName',
        sortable: false
      },
      {
        text: 'Charge Type',
        value: 'chargeType',
        sortable: false
      },
      {
        text: 'Earnings Type',
        value: 'earningsType',
        sortable: false
      },
      {
        text: 'Amount',
        value: 'customAmount',
        sortable: false
      },
      {
        text: 'Charge Date',
        value: 'chargeDate',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    earningsTypes: [
      {
        text: 'Deduction'
      },
      {
        text: 'Payment'
      },
      {
        text: 'Reimbursement'
      }
    ],
    filterEarningsType: [],
    searchQuery: '',
    confirmRevertDialog: false,
    selectedChargeId: 0,
  }),
  computed: {
    ...mapGetters({
      providers: 'providerModule/providers',
      earningsCodes: 'optionModule/earningsCodes',
      otherEarningCharges: 'otherEarningsModule/otherEarningCharges',

    }),
    tableData () {
      let $this = this
      let buf = []
      buf = this.otherEarningCharges.slice()  
      
      buf.map(item =>{
        const provider = $this.providers.find(obj => { return obj.providerId === item.providerId})
        provider && (item.providerName = provider.firstName + ' ' + provider.lastName)
        const earningType = $this.earningsCodes.find(obj => {return obj.earningsCodeId === item.earningsCodeId})
        earningType && (item.chargeType = earningType.name )
        earningType.isDeduction && (item.earningsType = 'Deduction')
        earningType.isPayment && (item.earningsType = 'Payment')
        earningType.isReimbursement && (item.earningsType = 'Reimbursement')
        item.chargeDate = item.chargeDate.substring(0, 10)
      })
      if(this.filterEarningsType.length > 0)
        buf = buf.filter(function (item) {
          return $this.filterEarningsType.includes(item.earningsType)
        });

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
    await this.$store.dispatch('otherEarningsModule/getAllOtherEarningsCharges')
    this.$store.dispatch("uxModule/hideLoader")
  },
  methods: {
      newItem () {
          const item = new OtherEarningsCharge();
          this.$router.push({
            name: 'New Other Earning Charge',
            prams: {
                otherEarningsCharge: { ...item }
            }
        })
      },
      editItem (chargeId) {
          const findIndex = this.otherEarningCharges.findIndex(
            ({ otherEarningsChargeId }) => otherEarningsChargeId === chargeId
        );
        let item = this.otherEarningCharges[findIndex]
        this.$router.push({
            name: 'Edit Other Earning Charge',
            params: {
                otherEarningsCharge: { ...item }
            }
        })
      },
      revertItem(chargeId) {
        this.selectedChargeId = chargeId
        this.confirmRevertDialog = true
      },
      confirmRevert() {
        this.confirmRevertDialog = false
        this.revertCharge()
      },
      async deleteItem (chargeId) {
            this.$store.dispatch("uxModule/showLoader", 'Deleting Item')
            const success = await this.$store.dispatch('otherEarningsModule/deleteOtherEarningsCharge', chargeId)

            this.$store.dispatch("uxModule/hideLoader")
            
            if(success) this.$store.dispatch('uxModule/showSnackBarMsg', 'Deleted successfully')
            else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
      },
      async revertCharge () {
        this.$store.dispatch("uxModule/showLoader", 'Reverting Item')
        const success = await this.$store.dispatch('otherEarningsModule/revertOtherEarningsCharge', this.selectedChargeId)

        this.$store.dispatch("uxModule/hideLoader")
        
        if(success) this.$store.dispatch('uxModule/showSnackBarMsg', 'Reverted successfully')
        else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
      }
  }
}
</script>
