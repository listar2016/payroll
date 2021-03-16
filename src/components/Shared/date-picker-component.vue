<template>
    <v-menu
          v-model="isMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              :clearable="isNullAble?true:false"
              :label="pickerLabel"
              prepend-icon="mdi-calendar"
              readonly
              dense
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="isMenu = false"></v-date-picker>
        </v-menu>
</template>
<script>
export default {
    props: {
      pickerLabel: {
        type: String
      },
      isNullAble: Boolean
    },
    data() {
        return {
            isMenu: false,
            date: null,
        }
    },
    mounted() {
        if(!this.isNullAble) this.date = new Date().toISOString().substr(0, 10)
        this.$emit('changeDate', this.date)
    },
    watch: {
        date(){
            this.$emit('changeDate', this.date)
        }
    }
}
</script>