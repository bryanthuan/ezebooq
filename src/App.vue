<template>
  <v-app left-fixed-sidebar top-fixed-toolbar footer>
    <router-view v-if="finished"></router-view>
        <main class="pt-5 loading_main" v-if="!finished">
          <v-content class="pt-5">
              <div class="loading_center">
                <img src="./assets/logo-conegg-green.png" alt="Loading" width="100px">
                <v-progress-linear success v-bind:indeterminate="true"></v-progress-linear>
              </div>              
          </v-content>
        </main>    
  </v-app>
</template>

<script>
  import FastClick from 'fastclick'
  const initApp = function initApp () {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', () => {
        FastClick.attach(document.body)
      }, false)
    }
  }
  export default {
    computed: {
      finished () {
        return this.$store.state.user
      }
    },
    created: initApp
  }
</script>

<style lang="stylus">
  $color-pack = true
  @import './styles/vuetify'  
</style>
<style lang="sass">
  @import './styles/main.css'
  @import '../node_modules/keen-ui/dist/keen-ui.css'
</style>
