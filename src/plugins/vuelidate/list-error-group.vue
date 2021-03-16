<template>
  <div>
    <slot />
    <div v-if="hasErrors">
      <p v-for="(error,index) in activeErrorMessages" :key="index" style="color:red;">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";

export default {
  mixins: [singleErrorExtractorMixin]
};
</script>