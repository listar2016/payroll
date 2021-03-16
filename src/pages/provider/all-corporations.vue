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
    <v-toolbar flat color="white">
      <v-toolbar-title>Provider Corporations</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="btn mb-2" @click="createCorporation">
        New Corporation
      </v-btn>
    </v-toolbar>
    <v-toolbar flat color="white">
          <v-row  class="mt-5 mb-2">
            <v-spacer></v-spacer>
            <v-col cols="12" md="3">
              <v-select
                height="42"
                v-model="filterType"
                :items="corporationType"
                label="Show corporation type"
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
      class="elevation-4 mx-auto"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                @click="editItem(item.providerCorporationId)"
              >
              fa fa-pencil-square-o
              </v-icon>
            </span>            
          </template>
          <span>Edit item</span>
        </v-tooltip> 
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                color="primary"
                class="mr-2"
                @click="deleteItem(item.providerCorporationId)"
                :disabled="item.providers.length > 0 ? true : false"
              >
                fa fa-trash-o
              </v-icon>
            </span>            
          </template>
          <span>Delete item</span>
        </v-tooltip> 
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                color="primary"
                @click="viewProviders(item.providers)"
              >
                fa fa-users
              </v-icon>
            </span>            
          </template>
          <span>View associated providers</span>
        </v-tooltip> 
        
      </template>
    </v-data-table>
    <v-dialog v-model="corporationDialog" persistent width="500">
      <individual-coporation-modal
        v-if="corporationDialog"
        :corporation="selectedItem"
        @close="corporationDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="providersDialog" persistent width="900">
      <associated-providers-modal
        v-if="providersDialog"
        :providers="associatedProviders"
        @close="providersDialog = false"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import IndividualCoporationModal from "@/components/modal/Individual-coporation-modal.vue";
import ProviderCorporation from "@/objs/ProviderCorporation"
import AssociatedProvidersModal from '@/components/modal/associated-providers-modal.vue';

export default {
  components: {
    IndividualCoporationModal,
    AssociatedProvidersModal,
  },
  data: () => ({
    corporationDialog: false,
    providersDialog: false,
    associatedProviders: [],
    selectedItem: new ProviderCorporation(),
    filterType: 'All',
    searchQuery: '',
    headers: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Tax ID",
        value: "taxId",
        sortable: false,
      },
      {
        text: "Corporation Type",
        value: "corporationType",
        sortable: false,
      },
      {
        text: "Address",
        value: "address",
        sortable: false
      },
      {
        text: "Phone Number",
        value: "phoneNumber",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    corporationType: [
      'All',
      'Staffing agencies',
      '1099 Professional Corporations'
    ]

  }),
  computed: {
    ...mapGetters({
      corporations: "providerModule/corporations",
      programs: "optionModule/programs",
      rateUnitTypes: "optionModule/rateUnitTypes",
      services: "optionModule/services",
      sessionLocations: "optionModule/sessionLocations",
      taxStatuses: "optionModule/taxStatuses",
    }),
    tableData() {
      let $this = this
      let buf = []
      if(this.filterType === 'Staffing agencies')
        buf = this.corporations.filter(function (item) {
          return item.isStaffingAgency === true
        });
      else if (this.filterType === '1099 Professional Corporations')
        buf = this.corporations.filter(function (item) {
          return item.isStaffingAgency === false
        });
      else buf = Array.from(this.corporations)

      if(this.searchQuery !== '' && this.searchQuery !== null){
        buf = buf.filter(function (item) {
            for(let i = 0; i< item.providers.length; i++){
              if(item.providers[i].firstName.includes($this.searchQuery)) return true
              if(item.providers[i].lastName.includes($this.searchQuery)) return true
            }
            return item.name.includes($this.searchQuery) ||
              item.taxId.includes($this.searchQuery) ||
              item.streetAddress.includes($this.searchQuery) ||
              item.streetAddressLine2.includes($this.searchQuery) ||
              item.zipCode.includes($this.searchQuery) ||
              item.phoneNumber.includes($this.searchQuery) ||
              item.state.includes($this.searchQuery)
        });
      }

      buf.map((item) => {
        item.corporationType = item.isStaffingAgency
          ? "StaffingAgency"
          : "Provider Coporation";
        item.address = item.streetAddressLine2 + ' ' + item.streetAddress + ' ' + item.city + ' ' + item.state + ' ' + item.zipCode
        item.phoneNumber = item.phoneNumber.replace(/\D/g, "");
        item.phoneNumber =
          "(" +
          item.phoneNumber.substring(0, 3) +
          ") " +
          item.phoneNumber.substring(3, 6) +
          "-" +
          item.phoneNumber.substring(6);
      });
      return buf;
    },
  },
  async created() {
    this.$store.dispatch("uxModule/showLoader", "Loading data...");
    await this.$store.dispatch("providerModule/getAllProviderCorporations");
    this.$store.dispatch("uxModule/hideLoader");
    console.log(this.corporations, "asd");
  },

  methods: {
    createCorporation() {
      this.selectedItem = new ProviderCorporation();
      this.corporationDialog = true
    },
    editItem(corporationId) {
      const findIndex = this.corporations.findIndex(
        ({ providerCorporationId }) => providerCorporationId === corporationId
      );
      this.selectedItem = {
        ...this.corporations[findIndex],
      };
      this.corporationDialog = true;
    },
    async deleteItem(corporationId) {
      this.$store.dispatch("uxModule/showLoader", 'Deleting provider corporation')
      const result = await this.$store.dispatch('providerModule/deleteProviderCorporation', corporationId)
      this.$store.dispatch("uxModule/hideLoader")
      console.log(result)
      if(result) this.$store.dispatch('uxModule/showSnackBarMsg', 'Deleted successfully!')
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
    },
    viewProviders(providers) {
      this.associatedProviders = providers
      this.providersDialog = true
    }
  },
};
</script>
