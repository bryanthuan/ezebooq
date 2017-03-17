<template>
    <v-row class="mb-2">
        <v-col xs12="xs12">
            <v-row>
                <v-col xs12>
                    <v-card class="mb-3">
                        <v-toolbar class="teal white--text">
                            <v-toolbar-title class="pa-0">2. Add your services</v-toolbar-title>
                        </v-toolbar>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <template v-for="(item,index) in services">
                    <v-col xs12 :key="item.id">
                      <v-card class="mb-3">
                        <v-card-row>
                            <v-col xs6 lg6 class="pt-3">
                                <ui-textbox
                                autocompconste="off"
                                error="This field is required"
                                label="Service"
                                placeholder="i.e Massage"
                                required
                                :invalid="services[index].s_touched && services[index].name.length === 0"
                                @touch="updateTouched(index)"
                                :value="services[index].name" 
                                @input="updateName(index, item.id, $event)"
                                class="mb-0"
                            ></ui-textbox>
                                </v-col>
                            <v-col xs4 lg4>
                                <ui-select
                                    class="pa-0 ma-0"
                                    label="Duration"
                                    :options="option"
                                    :value="services[index].duration"
                                    @input="updateDuration(index, item.id, $event)"
                                ></ui-select>
                            </v-col>
                            <v-col xs2 lg2 class="text-xs-right">
                                <v-btn icon="icon" slot="activator" default @click.native="removeServiceForm(item.id)">
                                    <v-icon>deconste</v-icon>
                                </v-btn>
                            </v-col>
                        </v-card-row>
                        <v-card-row class="pb-0 pt-3 pr-2 pl-1">
                            <v-col xs4 lg4>
                                 <ui-textbox
                                    class="pa-0 ma-0"
                                    label="Price"
                                    type="number"
                                    :min="0"
                                    :max="1000000000"
                                    :value="services[index].price" 
                                    @input="updatePrice(index, item.id, $event)"
                                ></ui-textbox>
                            </v-col>
                            <v-col xs8 lg8>
                                <ui-textbox
                                    class="pa-0 ma-0"
                                    label="Description"
                                    :multi-line="true"
                                    :value="services[index].description"
                                    @input="updateDesc(index, item.id, $event)"
                                ></ui-textbox>                                
                            </v-col>
                        </v-card-row>                        
                        </v-card></v-col>
                </template>
                <v-col xs12 class="text-xs-center">
                    <v-btn flat @click.native="addServiceForm" class="blue--text darken-1">
                       + Add Service
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  // import moment from 'moment'
  import firebase from 'firebase'
  import { UiTextbox, UiSelect } from 'keen-ui'
  import { getDuration } from '../../helpers/handyFuncs'
  export default {
    components: {
      UiSelect,
      UiTextbox
    },
    data() {
      return {
        serviceIndex: 0,
        option: getDuration()
      }
    },
    computed: {
      services () {
        return this.$store.state.services
      }
    },
    methods: {
      updateName (index, key, e) {
        const value = {
          index,
          key,
          name: e
        }
        firebase.database().ref(`services/${this.$store.state.user.uid}`).child(key).child('name').set(e)
        this.$store.commit('updateServiceName', value)
      },
      updateTouched (index) {
        const value = {
          index,
          's_touched': true
        }
        this.$store.commit('updateServiceNameTouched', value)
      },
      updatePrice (index, key, e) {
        const value = {
          index,
          key,
          'price': e
        }
        this.$store.commit('updateServicePrice', value)
        firebase.database().ref(`services/${this.$store.state.user.uid}`).child(key).child('price').set(e)
        // this.$store.dispatch('updateServicePrice', value)
      },
      updateDuration (index, key, e) {
        const value = {
          index,
          key,
          'duration': e
        }
        this.$store.commit('updateServiceDuration', value)
        firebase.database().ref(`services/${this.$store.state.user.uid}`).child(key).child('duration').set(e)
        // this.$store.dispatch('updateServiceDuration', value)
      },
      updateDesc (index, key, e) {
        const value = {
          index,
          key,
          'description': e
        }
        this.$store.commit('updateServiceDesc', value)
        firebase.database().ref(`services/${this.$store.state.user.uid}`).child(key).child('description').set(e)
        // this.$store.dispatch('updateServiceDesc', value)
      },
      addServiceForm() {
        this.$store.dispatch('addService')
      },
      removeServiceForm(key) {
        this.$store.dispatch('removeService', key).then(() => {
          if (this.$store.state.services.length === 0) {
            this.addServiceForm()
          }
        })
      }
    }
  }

</script>

