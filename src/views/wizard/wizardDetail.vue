<template>
  <div class="page-content">
    <v-toolbar fixed class="white accent-2">
      <v-container>
        <v-row>
          <v-col xs8 md10>
            <v-toolbar-title class="pa-0 teal--text">Eezii</v-toolbar-title>
          </v-col>
          <v-col xs4 md2 class="text-xs-right">
            <v-btn class="teal" @click.native="onFininsh">Finish</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <main>
      <v-content>
        <v-container class="mt-mod">
          <v-row class="mb-0">
            <v-col xs12="xs12">
              <v-row>
                <v-col xs12>
                  <v-card class="mb-3">
                    <v-toolbar class="teal white--text">
                      <v-toolbar-title class="pa-0">1. Add your information</v-toolbar-title>
                    </v-toolbar>
                    <!-- Basic information -->
                    <v-card-row class="mt-2">
                          <v-col xs4 lg2 class="text-lg-right text-xs-left">Business Name</v-col>
                          <v-col xs8 lg10 class="text-xs-left"><span class="headline" v-text="businessName"></span></v-col>
                    </v-card-row>
                    <v-card-row>
                          <v-col xs4 lg2 class="text-lg-right text-xs-left">Business Type</v-col>
                          <v-col xs8 lg10 class="text-xs-left"><strong v-text="subcategory.title"></strong><v-btn @click.native="editBusinessType" flat class="blue--text darken-1">Edit</v-btn></v-col>
                    </v-card-row>
                    <!-- Start Opening Hour -->
                    <v-card-row>
                      <v-col xs4 class="text-lg-right text-xs-left hidden-sm-and-up">Opening hours</v-col>
                    </v-card-row>
                      <addOpeningHour></addOpeningHour>
                    <!-- End Opening Hour -->
                    <!-- Start Address -->
                    <v-card-row class="pb-0 mt-3">
                      <v-col lg2 md6 sm6 class="text-lg-right text-xs-left hidden-sm-and-down">Address</v-col>
                      <v-col lg6 xs12>
                        <ui-textbox class="pl-1" error="This field is required" label="Street address" placeholder="123, Street Name, District"
                          required :invalid="addr_touched && address.length === 0" @touch="addr_touched=true" v-model="address"
                          ></ui-textbox>
                      </v-col>
                    </v-card-row>
                    <v-card-row class="pb-0">
                      <v-col lg2 md6 sm6 class="hidden-sm-and-down"></v-col>
                      <v-col lg3 xs6>
                        <v-text-field class="pl-1" v-model="city" placeholder="Ho Chi Minh City" label="City"></v-text-field>
                      </v-col>
                      <v-col lg3 xs6>
                         <ui-select
                          label="Country"
                          placeholder="Select your country"
                          has-search                          
                          :options="countries"
                          v-model="country"
                          ></ui-select>                        
                      </v-col>
                    </v-card-row>
                    <!-- End Address -->
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- Service -->
          <addService></addService>
          <!-- End Service -->
          <!-- Staff -->
          <addStaff></addStaff>
          <!-- End Staff -->

        </v-container>
      </v-content>
    </main>
  </div>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  /* eslint-disable no-unused-vars */
  import { mapState } from 'vuex'
  import { UiTextbox, UiSelect } from 'keen-ui'
  import addService from './_addService'
  import addOpeningHour from './_addOpeningHour'
  import addStaff from './_addStaff'
  import countries from '../../helpers/countries'
  import Firebase from '../../firebase'
  // import database from '../../database'
  // import auth from '../../auth'
  import { arrayDateToText, getWeekDayOption } from '../../helpers/handyFuncs' // getWeekDayOption
  export default {
    components: {
      addService,
      addStaff,
      addOpeningHour,
      UiTextbox,
      UiSelect
    },
    data() {
      return {
        countries: countries,
        'addr_touched': false,
        weekDayOption: getWeekDayOption()
      }
    },
    computed: {
      city: {
        get() {
          return this.$store.state.business.city
        },
        set(value) {
          this.$store.commit('updateBusinessCity', value)
        }
      },
      address: {
        get() {
          return this.$store.state.business.address
        },
        set(value) {
          if (value !== '') {
            this.$store.commit('updateBusinessAddress', value)
          }
        }
      },
      country: {
        get() {
          return this.$store.state.business.country
        },
        set(value) {
          this.$store.commit('updateBusinessCountry', value)
        }
      },
      businessName() {
        return this.$store.state.business.name
      },
      ...mapState({
        subcategory: state => state.business.subcategory,
        category: state => state.business.category
      })
    },
    methods: {
      shorternDay (arr) {
        return arrayDateToText(arr)
      },
      editBusinessType() {
        this.$router.push('/wizard/select-category')
      },
      onFininsh() {
        // Validate all field
        const _this = this
        const svs = this.$store.state.services
        const invalidSv = svs.filter(item => {
          return item.name.trim() === ''
        })
        if (this.$store.state.business.address.trim() === '' || invalidSv.length > 0) {
          // Show error on address
          this.addr_touched = true
          // show error on all invalid services
          svs.forEach((item, index) => {
            const value = {
              index,
              's_touched': true
            }
            _this.$store.commit('updateServiceNameTouched', value)
          })

          return
        }
        // Continue handling form submit here.
        // Save all data to firebase here
        // Save Business's basic profile
        // const userPath = `businesses/${auth.getUser().uid}`
        // let userServicePath = `services/${auth.getUser().uid}`
        // let userStaffPath = `staffs/${auth.getUser().uid}`
        // let parsedOp = JSON.parse(JSON.stringify(this.$store.state.opening_hours))
        // firebase.database().ref(userPath).update({is_finished: true})

        // const userOpeningHourPath = `opening_hours/${auth.getUser().uid}`
        // const parsedOp = JSON.parse(JSON.stringify(this.$store.state.opening_hours))
        // firebase.database().ref(userOpeningHourPath).set(parsedOp)
      }
    },
    created() {
      Firebase.fetchServices(this.$store.state.user.uid)
        .then((val) => {
          this.$store.dispatch('initServices', val)
          Firebase.fetchStaffs(this.$store.state.user.uid)
          .then((val) => {
            this.$store.commit('initStaffs', val)
          })
          .catch(() => {
            this.$store.dispatch('addStaff')
          })
        })
        .catch(() => {
          this.$store.dispatch('addService')
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
