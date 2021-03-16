<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate
                           size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  import mgr from "../../security/security.js";

  export default {
    created: async function ()
      {
        try
        {
          var result = await mgr.signinRedirectCallback();
          var returnToUrl = '/';
          if (result.state !== undefined)
          {
            returnToUrl = result.state;
          }
          var user = await mgr.getUser();
          this.$store.commit('securityModule/setIsAuthenticated', true);
          this.$store.commit('securityModule/setUser', user);
         //Here, dispatch whatever actions are necessary to load app specific user information
          this.$router.push({ path: returnToUrl });
        } catch (e)
        {
          this.$store.commit('securityModule/setIsAuthenticated', false);
          console.log("in the error");
                this.$router.push({ name: 'Unauthorized' });
            }
        }
    }
</script>
