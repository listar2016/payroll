<template>
  <v-card style="border:2px solid black" height="750" width="1100">
    <span>{{applications}}</span>
    <div class="mx-4">
      <form-field :field="subject"></form-field>
    </div>
    <div
      id="style-11"
      class="mt-4 mx-4"
      style="overflow-x: hidden; overflow-y: auto; height:45%;"
    >
      <form-field :field="content"></form-field>
    </div>
  </v-card>
</template>
<script>
  import FormField from "../objs/Shared/FormField";
import { FieldTypes } from "../objs/Shared/FieldTypes";
export default {
  data() {
    return {
      dialog: true
    };
  },

    computed: {
      applications: function ()
      {
        //var apps = this.$store.state.securityModule.applications[0];
        //return apps.name + ' ' + apps.icon + ' ' + apps.url;
        return this.$store.state.securityModule.applications;
      },
    subject: function() {
      return new FormField({
        tier: 1,
        moduleName: "sampleModule",
        objName: "object",
        propName: "subject",
        label: "Subject",
        componentName: FieldTypes.TEXT_FIELD
      });
    },
    content: function() {
      return new FormField({
        tier: 1,
        moduleName: "sampleModule",
        objName: "object",
        propName: "content",
        componentName: FieldTypes.TEXT_AREA
      });
    }
  }
};
</script>
