<template>
  <v-container>
    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-select
          :items="batchFilter"
          v-model="filterOne"
          label="Filter by Date"
        >
        </v-select>
        <v-text-field
          v-if="filterOne === 2"
          v-model="filterDate"
          v-mask="dateMask"
          regular
          label="Search by date"
          @input="filter"
          @blur="filter"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="filterName"
          regular
          clearable
          label="Search by Batch name or ID"
          @input="filter"
          @blur="filter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="fpayrollBatches"
          sort-by="name"
          class="elevation-3 mx-auto"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn text class="mr-2" color="primary" @click="viewBatch(item)">
              View
            </v-btn>
            <v-btn text color="primary" @click="processBatch(item)">
              Process
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";

export default {
  data() {
    return {
      headers: [
        {
          text: "Batch Id",
          value: "payrollBatchId",
        },
        {
          text: "Batch Name",
          value: "name",
        },
        {
          text: "Created On",
          value: "createdOn",
        },
        {
          text: "Closed On",
          value: "closedOn",
        },
        {
          text: "Start Date",
          value: "startDate",
        },
        {
          text: "End Date",
          value: "endDate",
        },
        {
          text: "Paycheck Date",
          value: "paycheckDate",
        },
        {
          text: "Total Payout",
          value: "totalPayout",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      batchFilter: [
        {
          text: "All Batches",
          value: 1,
        },
        {
          text: "Batch Date",
          value: 2,
        },
      ],
      fpayrollBatches: [],
      filterOne: 1,
      filterDate: "",
      filterName: "",
      dateMask: "####-##-##",
    };
  },
  computed: {
    ...mapGetters({
      payrollBatches: "processPayrollModule/payrollBatches",
    }),
  },
  directives: { mask },
  created() {
    this.fpayrollBatches = Array.from(this.payrollBatches);
  },
  watch: {
    filterOne() {
      if (this.filterOne === 1) this.filterDate = "";
    },
  },
  methods: {
    viewBatch(item) {
      this.$router.push({
        name: "Current batch",
        praams: {
          payrollBatchId: item.payrollBatchId,
        },
      });
    },
    processBatch() {},
    filter() {
      let $this = this;
      if ($this.filterName === "")
        $this.fpayrollBatches = Array.from($this.payrollBatches);
      else
        $this.fpayrollBatches = $this.payrollBatches.filter(function (batch) {
          return batch.name.includes($this.filterName);
        });

      if ($this.filterDate === "") return;
      else
        $this.fpayrollBatches = $this.fpayrollBatches.filter(function (batch) {
          return (
            batch.startDate.includes($this.filterDate) ||
            batch.endDate.includes($this.filterDate) ||
            batch.paycheckDate.includes($this.filterDate)
          );
        });
    },
  },
};
</script>