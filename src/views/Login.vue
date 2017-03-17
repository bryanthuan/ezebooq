<template>
    <div class="page-content">
        <v-toolbar fixed class="white accent-2">
          <v-container>
            <v-row>
              <v-col xs8 md10>
                <v-toolbar-title class="pa-0 teal--text">Eezii</v-toolbar-title>
              </v-col>              
            </v-row>
          </v-container>
        </v-toolbar>
        <main class="pt-5">
          <v-content class="pt-5">
              <div class="form-signin">
                <h2 class="form-signin-heading">sign in now</h2>
                <div class="login-wrap">
                  <div id="firebaseui-auth-container"></div>
                  <!--
                  <template v-if="user.uid!==''">
                    <span>You've already signed in</span>
                    <v-btn v-on:click.native="backDashboard" class="teal">Back</v-btn>
                  </template>                  
                  -->
                </div>
              </div>
          </v-content>
        </main>
      </div>
</template>
<script>
  // import auth from '../auth'
  // const user = auth.getUser()
  export default {
    // data () {
    //   return {  }
    // },
    methods: {
      backDashboard () {
        // Save Business Name and Category here.
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
.with.left-fixed-sidebar main, .with.left-fixed-sidebar footer {
    padding-left: 0px;
}
</style>
