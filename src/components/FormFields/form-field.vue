<template>
  <div>
    <component
      v-bind:is="field.componentName"
      :field="field"
      :value="getFieldValue"
      :readonly="readonly"
      :outlined="field.outlined"
      v-on:fieldChange="setFieldValue"
      :validations="validations"
    ></component>
  </div>
</template>

<script>
import FormField from "../../objs/Shared/FormField";
import TextField from "./text-field";
import TextArea from "./text-area";
import LargeTextArea from "./large-text-area";
import Checkbox from "./checkbox-field";
import DateFieldNoError from "./date-field-no-error";
import DateField from "./date-field";
import DatePicker from "./date-picker-field";
import TimeField from "./time-field";
import TimeInputField from "./time-input-field";
import StandardSelect from "./standard-select";
import MultipleSelect from "./multiple-select";
import RadioGroup from "./radio-group";
import PhoneNumberField from "./phone-number-field";
import ZipCodeField from "./zip-code-field";
import Autocomplete from "./autocomplete";
import NumericField from "./numeric-field";
import TextEditorReadonly from "./text-editor-readonly";
import TextEditorFullExtensionList from "./text-editor-full-extension-list";
import MultipleAutocomplete from "./multiple-autocomplete";
import FileInput from "./file-input";
export default {
  name: "form-field",
  props: {
    field: Object,
    readonly: Boolean,
    validations: Object
  },

  components: {
    "text-field": TextField,
    "text-area": TextArea,
    "large-text-area": LargeTextArea,
    checkbox: Checkbox,
    "date-field-no-error": DateFieldNoError,
    "date-field": DateField,
    "date-picker": DatePicker,
    "time-field": TimeField,
    "time-input": TimeInputField,
    "standard-select": StandardSelect,
    "multiple-select": MultipleSelect,
    "radio-group": RadioGroup,
    "phone-number-field": PhoneNumberField,
    "zip-code-field": ZipCodeField,
    autocomplete: Autocomplete,
    "numeric-field": NumericField,
    "text-editor-readonly": TextEditorReadonly,
    "text-editor-full-extension-list": TextEditorFullExtensionList,
    "multiple-autocomplete": MultipleAutocomplete,
    "file-input": FileInput
  },

  computed: {
    getFieldValue: function() {
      switch (this.field.tier) {
        case -1:
          return this.field.value;
        case 0:
          return this.$store.state[this.field.moduleName][this.field.objName];
        case 1:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.propName
          ];
        case 2:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.propName
          ][this.field.subPropName];
        case 3:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.propName
          ][this.field.index];
        case 4:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.propName
          ][this.field.index][this.field.subPropName];
        case 5:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.index
          ][this.field.propName];
        case 6:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.index
          ][this.field.propName][this.field.subIndex][this.field.subPropName];
        case 7:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.index
          ][this.field.propName][this.field.subPropName];
        case 8:
          return this.$store.state[this.field.moduleName][this.field.objName][
            this.field.propName
          ][this.field.subPropName][this.field.index][
            this.field.subSubPropName
          ][this.field.subIndex][this.field.subSubSubPropName];
        case 9:
          console.log("In get of tier 9");
          console.log("Module name is " + this.field.moduleName);
          console.log("Obj name is " + this.field.objName);
          console.log("Prop name is " + this.field.propName);
          console.log("SubPropName is " + this.field.subPropName);
          console.log("Index is " + this.field.index);
          console.log("SubsubPropName is " + this.field.subSubPropName);
          var returnVal = this.$store.state[this.field.moduleName][
            this.field.objName
          ][this.field.propName][this.field.subPropName][this.field.index][
            this.field.subSubPropName
          ];
          console.log(returnVal);

          return returnVal;
      }
    }
  },
  methods: {
    setFieldValue: function(event) {
      if (this.validations != null) {
        this.validations.$touch();
      }
      this.$emit("fieldChange", event);
      switch (this.field.tier) {
        case -1:
          //this.$emit("fieldChange", event);
          break;
        case 0:
          this.$store.commit("formFieldsModule/setTier0", {
            objName: this.field.objName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 1:
          this.$store.commit("formFieldsModule/setTier1", {
            objName: this.field.objName,
            propName: this.field.propName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 2:
          this.$store.commit("formFieldsModule/setTier2", {
            objName: this.field.objName,
            propName: this.field.propName,
            subPropName: this.field.subPropName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 3:
          this.$store.commit("formFieldsModule/setTier3", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 4:
          this.$store.commit("formFieldsModule/setTier4", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            subPropName: this.field.subPropName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 5:
          this.$store.commit("formFieldsModule/setTier5", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 6:
          this.$store.commit("formFieldsModule/setTier6", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            subIndex: this.field.subIndex,
            subPropName: this.field.subPropName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 7:
          this.$store.commit("formFieldsModule/setTier7", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            subPropName: this.field.subPropName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 8:
          this.$store.commit("formFieldsModule/setTier8", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            subPropName: this.field.subPropName,
            subSubPropName: this.field.subSubPropName,
            subSubSubPropName: this.field.subSubSubPropName,
            subIndex: this.field.subIndex,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
        case 9:
          this.$store.commit("formFieldsModule/setTier9", {
            objName: this.field.objName,
            propName: this.field.propName,
            index: this.field.index,
            subPropName: this.field.subPropName,
            subSubPropName: this.field.subSubPropName,
            value: event,
            moduleName: this.field.moduleName
          });
          break;
      }
    }
  }
};
</script>
