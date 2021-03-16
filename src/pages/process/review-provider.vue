<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="fproviders"
          sort-by="name"
          class="elevation-3 mx-auto"
        >
          <template v-slot:item.id="{ item }">
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <label
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{item.id}}
                  </label>                  
                </template>
                <div>Left tooltip</div>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="fproviders"
          sort-by="name"
          class="elevation-3 mx-auto"
        >
          <template v-slot:item.id="{ item }">
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <label
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{item.id}}
                  </label>                  
                </template>
                <div>Left tooltip</div>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-fab-transition>
              <v-btn
                color="primary"
                fab
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
      </v-col>
    </v-row>
    <v-row >
      <v-col class="text-center">
        <v-btn color="primary" class="mt-5 mr-2" @click="closeBatch">
          Close Batch
        </v-btn>
        </v-col>        
        
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";

export default {
  props: ["batchId"],
  data() {
    return {
      headers: [
        {
          text: "Provider Name",
          value: "name",
        },
        {
          text: "Provider ID",
          value: "id",
        },
        {
          text: "Program(s)",
          value: "program",
        },
        {
          text: "Total Payout",
          value: "payout",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      providerFilter: [
        {
          text: "All programs",
          value: 1,
        },
        {
          text: "Batch Date",
          value: 2,
        },
      ],
      hideApproved: false,
      showFlaggedOnly: false,
      fproviders: [],
      filterOne: 1,
      filterDate: "",
      filterName: "",
      dateMask: "####-##-##",
    };
  },
  computed: {
    ...mapGetters({
      providers: "processPayrollModule/providers",
    }),
  },
  directives: { mask },
  created() {
    this.fproviders = Array.from(this.providers);
  },
  watch: {
    filterOne() {
      if (this.filterOne === 1) this.filterDate = "";
    },
  },
  methods: {
    review(item) {},
    flag(item) {},
    reRun(item) {},
    closeBatch() {
      this.$router.push({
        name: "All batches",
      });
    },
    filter() {
      let $this = this;
      $this.fproviders = $this.providers.filter(function (provider) {
        if ($this.hideApproved) return provider.approved;
        if ($this.showFlaggedOnly) return provider.flaged;
        if ($this.filterName !== "")
          return (
            provider.name.includes($this.filterName) ||
            provider.id.includes($this.filterByName)
          );
        return true;
      });
    },
    filterByDate() {
      let $this = this;
      if ($this.filterDate === "") {
        this.fproviders = Array.from(this.providers);
        return;
      }
      $this.fproviders = $this.providers.filter(function (batch) {
        return (
          batch.startDate.includes($this.filterDate) ||
          batch.endDate.includes($this.filterDate) ||
          batch.paycheckDate.includes($this.filterDate)
        );
        // batch.createdOn.includes($this.filterDate) ||
        // batch.closedOn.includes($this.filterDate)
      });
    },
    filterByName() {
      let $this = this;
      if ($this.filterName === "") {
        this.fproviders = Array.from(this.providers);
        return;
      }
      $this.fproviders = $this.providers.filter(function (batch) {
        return batch.name.includes($this.filterName);
        // batch.batchId.includes($this.filterName)
      });
    },
  },
};
</script>


