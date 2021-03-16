<template>
  <div>
    <tiptap-vuetify
      :value="value"
      :card-props="{ disabled: true, flat: true }"
      :extensions="extensions"
    >
      <template #toolbar="{ }">
        <pre></pre>
      </template>
    </tiptap-vuetify>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Bold,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  HardBreak
} from "tiptap-vuetify";
export default {
  props: ["value"],
  data() {
    return {
      extensions: [
        Bold,
        Underline,
        ListItem,
        BulletList,
        OrderedList,
        HardBreak
      ]
    };
  },
  components: { TiptapVuetify }
};
</script>
