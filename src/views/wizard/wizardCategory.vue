<template>
  <div class="page-content">
    <v-toolbar fixed class="white accent-2">
      <v-container>
        <v-row>
          <v-col xs8 md10>
            <v-toolbar-title class="pa-0 teal--text">Eezii</v-toolbar-title>
          </v-col>
          <v-col xs4 md2 class="text-xs-right" v-if="showContinueBtn">
            <v-btn v-on:click.native="nextStep" class="teal">Continue</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <main>
      <v-content>
        <v-container class="mt-mod">
          <v-row>
            <v-col xs12="xs12">
              <v-card>
                <v-toolbar class="teal white--text">
                  <v-toolbar-title class="pa-0">What's your business name?</v-toolbar-title>
                </v-toolbar>
                <v-toolbar class="white">
                  <v-toolbar-title class="black--text pa-0">
                  <v-text-field class="pb-0 mb-0" id="name" name="name" v-model="name"></v-text-field>
                  </v-toolbar-title>
                </v-toolbar>
              </v-card>
              
              <v-row>

              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs12>
              <component v-bind:is="categoryList" :categories="categories" :subcategories="subcategories">
                <!-- component changes when vm.categoryList changes! -->
              </component>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </main>
  </div>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  // UiTextbox
  import firebase from 'firebase'
  // import moment from 'moment'
  // import database from '../../database'
  // import auth from '../../auth'
  import categoryList from './_categoryList'
  export default {
    name: 'wizard',
    components: {
      categoryList
    },
    data () {
      return {
        category: '',
        // user: firebase.auth().currentUser,
        categories: {},
        subcategories: {},
        arr: [],
        categoryList: ''
      }
    },
    methods: {
      nextStep () {
        // Init some first value here
        this.$store.dispatch('addService').then((service) => {
          // console.log('Hello')
          // console.log(service)
          // let initService = [{value: service.id, label: service.name}]
          return this.$store.dispatch('addStaff', [])
        }).then(() => {
          this.$router.push('/wizard/details')
        })
        // Init Staff
      }
    },
    computed: {
      name: {
        get() {
          return this.$store.state.business.name
        },
        set(value) {
          // firebase.database().ref(`businesses/${this.$store.state.user.uid}`).child('name').set(value)
          this.$store.dispatch('updateBusinessName', value)
        }
      },
      showContinueBtn () {
        return this.$store.getters.isFinishedStep1
      }
    },
    created () {
      firebase.database().ref().once('value', snapshot => {
        this.categories = snapshot.val().categories
        this.subcategories = snapshot.val().subcategories
        this.$store.commit('updateSubcategories', this.subcategories)
        this.categoryList = 'categoryList'
      })
    }
  }

</script>
<style scoped>
  @media (min-width: 1200px){
    .container {
        width: 1128px;
        flex-basis: initial;
    }
}
.with.left-fixed-sidebar main, .with.left-fixed-sidebar footer {
    padding-left: 0px;
}
</style>
