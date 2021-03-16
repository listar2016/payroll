<template>
  <div>
    <tiptap-vuetify
      @input="$emit('fieldChange', $event)"
      :card-props="{ flat: true }"
      :value="value"
      :extensions="extensions"
      placeholder="Start typing here..."
    />
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";

export default {
  props: ["value"],
  components: { TiptapVuetify },
  data: function() {
    return {
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Bold,
        Underline,
        Strike,
        Italic,
        Paragraph,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        HorizontalRule,
        HardBreak
      ]
    };
  }
};
</script>
