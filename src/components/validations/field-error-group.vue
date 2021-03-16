<template>
  <div>
    <slot :attrs="{ 
         errorMessages: activeErrorMessages
       }" />
  </div>
</template>
<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";
export default {
  extends: singleErrorExtractorMixin
};
</script>
