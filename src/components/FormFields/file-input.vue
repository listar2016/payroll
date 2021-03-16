<template>
  <div>
    <v-file-input
     @change="addAttachment"
      v-model="files"
      hide-input
      multiple
      prepend-icon="mdi-paperclip"
      >
    </v-file-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    addAttachment: function() {
      this.$emit("fieldChange", this.files);
    }
  }
};
</script>
