<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="70vw">
      <v-card light id="screenshotCard">
        <v-card-title class="headline grey lighten-2" primary-title>
          We welcome your feedback!
        </v-card-title>
        <div class="mx-auto my-6" style="width:60vw;">
          <v-img style="outline-style:solid 1px" :src="imageBase64URL"></v-img>
        </div>
        <v-row>
          <v-col cols="11">
            <v-card-text class="blockquote ml-8" style="text-align:left">
              Please describe, in specific detail, what you would like changed.
              We appreciate your feedback, and will use it to evaluate features
              and make improvements to our apps.
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="11">
            <error-group :validator="$v.message" name="field" class="ml-10">
              <v-textarea
                outlined
                class="ma-4"
                placeholder="Write your comments here."
                v-model="message"
                slot-scope="{ attrs }"
                v-bind="attrs"
                color="#005c7b"
              ></v-textarea>
            </error-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="11">
            <error-group
              :validator="$v.fromEmailAddress"
              name="field"
              class="ml-10"
            >
              <v-text-field
                class="ma-4"
                outlined
                label="Enter your email address."
                v-model="fromEmailAddress"
                slot-scope="{ attrs }"
                v-bind="attrs"
                color="#005c7b"
              ></v-text-field>
            </error-group>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="#005c7b" @click="uploadAndSend">
            Send Feedback
          </v-btn>
          <v-btn color="#005c7b" outlined @click="cancel">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { mapActions } from "vuex";
import FeedbackParams from "../../objs/Shared/FeedbackParams";
import { required, alpha, email } from "vuelidate/lib/validators";
import { EventBus } from "../Shared/event-bus.js";

export default {
  created: function() {
    const scope = this;
    EventBus.$on("trigger-feedback-form", function(data) {
      scope.capture();
    });
  },
  data() {
    return {
      dialog: false,
      sendButtonClicked: false,
      message: "",
      fromEmailAddress: "",
      imageBase64URL: null
    };
  },
  computed: {
    senderEmailAddress: function() {
      return this.fromEmailAddress + "@omnirehab.com";
    },
    image: function() {
      return this.imageBase64URL.split("base64,").pop();
    },
    formParams: function() {
      return new FeedbackParams({
        message: this.message,
        fromEmailAddress: this.senderEmailAddress,
        image: this.image
      });
    }
  },
  methods: {
    ...mapActions("sharedModule", ["sendFeedbackEmail"]),
    capture: function() {
      html2canvas(document.getElementById("app"), {
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(canvas => {
        this.imageBase64URL = canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
        this.dialog = true;
      });
    },

    uploadAndSend: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.dialog = false;
        this.sendFeedbackEmail({ feedbackParams: this.formParams });
      } else {
        return;
      }
    },

    cancel() {
      this.dialog = false;
    }
  },
  validations() {
    return {
      message: { required },
      fromEmailAddress: { required, email }
    };
  }
};
</script>
