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
          <v-toolbar-title>Provider List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="showNewProvider"
          >
            New Provider
          </v-btn>
        </v-toolbar>
    <v-toolbar flat color="white">
          <v-row  class="mt-5 mb-2">
            <v-spacer></v-spacer>
            <v-col cols="12" md="3">
              <v-select
                height="42"
                v-model="filterDisciplines"
                :items="disciplines"
                item-text="name"
                item-value="disciplineId"
                multiple
                clearable
                label="Filter by disciplines"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item.name }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="grey--text caption"
                  >
                    (+{{ filterDisciplines.length - 1 }} others)
                  </span>
                </template>
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
      sort-by="name"
      class="elevation-1 mx-auto"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                @click="editItem(item)"
              >
                fa fa-pencil-square-o
              </v-icon>
            </span>            
          </template>
          <span>Edit provider</span>
        </v-tooltip> 
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                @click="showRate(item)"
              >
                fa fa-usd
              </v-icon>
            </span>            
          </template>
          <span>View session rates</span>
        </v-tooltip> 

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                x-small
                class="mr-2"
                color="primary"
                @click="showOtherEarnings(item)"
              >
                fa fa-money
              </v-icon>
            </span>            
          </template>
          <span>View other earning rates</span>
        </v-tooltip> 
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                v-if="item.canDelete"
                x-small
                color="primary"
                @click="deleteItem(item.providerId)"
              >
                fa fa-trash-o
              </v-icon>
            </span>            
          </template>
          <span>Delete provider</span>
        </v-tooltip> 
        
        
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Provider from "@/objs/Provider";

export default {
  data: () => ({
    headers: [
      {
        text: 'Provider Id',
        value: 'providerId'
      },
      {
        text: 'First Name',
        value: 'firstName'
      },
      {
        text: 'Last Name',
        value: 'lastName'
      },
      {
        text: 'Legacy Provider Id',
        value: 'legacyProviderId'
      },
      {
        text: 'Email Address',
        value: 'emailAddress'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    searchQuery: '',
    filterDisciplines: [],
  }),
  computed: {
    ...mapGetters({
      providers: 'providerModule/providers',
      disciplines: 'optionModule/disciplines',
    }),
    tableData () {
      let $this = this
      let buf = []
      if(this.filterDisciplines.length > 0)
        buf = this.providers.filter(function (item) {
            console.log(item)
            for(let i = 0; i < item.disciplines.length; i ++){
              if($this.filterDisciplines.includes(item.disciplines[i].disciplineId)) return true
            }
            return false          
        });
      else buf = Array.from(this.providers)
      console.log(this.searchQuery)
      if(this.searchQuery !== '' && this.searchQuery !== null){
        buf = buf.filter(function (item) {
            return item.firstName.includes($this.searchQuery) ||
              item.lastName.includes($this.searchQuery) 
        });
      }

      return buf
    },
  },
  async created () {
    this.$store.dispatch("uxModule/showLoader", 'Loading data...')

    await this.$store.dispatch("providerModule/getAllProviders")
    console.log(this.providers)
    this.$store.dispatch("uxModule/hideLoader")
  },
  methods: {
    showNewProvider () {
      const params = new Provider();
      this.$router.push({
        name: 'New Provider',
        params: {
          providerProps: params
        }
      })
    },
    editItem (item) {
      // this.$store.dispatch('setProvider', { ...item })
      this.$router.push({
        name: 'New Provider',
        params: {
          providerProps: {
            ...item
          }
        }
      })
    },
    async deleteItem (providerId) {
      this.$store.dispatch("uxModule/showLoader", "Deleting provider...")
      const success = await this.$store.dispatch('providerModule/deleteProvider', providerId)
      this.$store.dispatch("uxModule/hideLoader")

      if(success) this.$store.dispatch('uxModule/showSnackBarMsg', 'Deleted a provider successfully!')
      else this.$store.dispatch('uxModule/showSnackBarMsg', 'Raised an error!')
    },
    showRate (item) {
      let disciplineIds = []
      item.disciplines.map(item => {
        disciplineIds.push(item.disciplineId)
      })
      this.$store.dispatch('optionModule/getAssoicatedServicesFromDisciplines', disciplineIds)
      this.$store.dispatch('providerModule/setProviderInfo', {
        providerId: item.providerId,
        name: item.firstName + ' ' + item.lastName  
      })
      this.$router.push({
        name: 'All Session Rates'
      })
    },
    showOtherEarnings (item) {
      this.$store.dispatch('providerModule/setProviderInfo', {
        providerId: item.providerId,
        name: item.firstName + ' ' + item.lastName  
      })
      this.$router.push({
        name: 'All Other Earnings'
      })
    },
  }
}
</script>
