<template>
  <v-card>
    <v-card-title class="headline">
      Associated Provider List
    </v-card-title>
    <v-card-text>
      <v-data-table
      :headers="headers"
      :items="providers"
    >
    </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$emit('close')"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  name: 'AssociatedProvidersModal',
  props: ['providers'],
  data: () => ({
    headers: [
      {
        text: 'Provider Id',
        value: 'providerId'
      },
      {
        text: 'First Name',
        value: 'firstName'
      },
      {
        text: 'Last Name',
        value: 'lastName'
      },
      {
        text: 'Legacy Provider Id',
        value: 'legacyProviderId'
      },
      {
        text: 'Email Address',
        value: 'emailAddress'
      }
    ]
  }),
}
</script>
