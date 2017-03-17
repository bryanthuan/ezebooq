<template>
    <v-row class="mb-4">
        <v-col xs12="xs12">
            <v-row>
                <v-col xs12>
                    <v-card class="mb-3">
                        <v-toolbar class="teal white--text">
                            <v-toolbar-title class="pa-0">3. Who provides services</v-toolbar-title>
                        </v-toolbar>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <template v-for="(item, index) in staffs">
                    <v-col xs12 lg6 md6  :key="item.id"><v-card class="mb-3">
                        <v-card-row class="grey lighten-3">
                            <v-col xs10 class="pt-4">
                            <v-text-field placeholder="i.e John"
                                label="Staff name"
                                class="ma-0 pa-0"
                                :value.native="staffs[index].name" 
                                @input.native="updateName(index, item.id, $event)"
                            ></v-text-field>
                            </v-col>
                            <v-col xs2 lg2 class="text-xs-right">
                                <v-btn icon="icon" slot="activator" default @click.native="removeStaffForm(item.id)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-card-row>
                        <v-card-text class="pb-0 pt-3 pr-2 pl-3">
                                <v-card-row>                     
                                    <v-col xs12 class="ma-0 pa-0">
                                        <ui-select
                                        :name="'group'+item.id"
                                        multiple
                                        label="Assigned services"
                                        :placeholder="serviceOption.length===0 ?'No service' :'Select some services'"
                                        type="image"
                                        :options="serviceOption"
                                        :value="staffs[index].services"
                                        @change="updateAssign(index, item.id, $event)"   
                                    ></ui-select>   
                                    </v-col>         
                                    <!--
                                    TODO: We could enable this amazing checkbox group once keen ui finish testing on safary.
                                        <ui-checkbox-group
                                        :name="'group'+item.id"
                                        vertical
                                        :options="serviceOption"
                                        :value="staffs[index].services"
                                        @change="updateAssign(index,$event)"                                            
                                        >  <template v-if="serviceOption.length===0">No service</template>
                                        <template v-else>Assigned services</template>
                                    </ui-checkbox-group>
                                     -->
                                </v-card-row>
                            <v-card-row>
                            <v-col xs12 class="ma-0 pa-0">
                            
                            <ui-textbox
                                    class="pa-0 ma-0"
                                    label="Short bio"
                                    :multi-line="true"
                                    :value="staffs[index].short_bio"
                                    @input="updateBio(index, item.id, $event)"
                                ></ui-textbox>
                            </v-col>
                            </v-card-row>
                        </v-card-text>
                        </v-card></v-col>
                </template>
                <v-col xs12 class="text-xs-center">
                    <v-btn @click.native="addStaffForm" flat class="blue--text darken-1">
                        + Add staff
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
  /* eslint-disable space-before-function-paren */
  import { UiTextbox, UiCheckboxGroup, UiSelect } from 'keen-ui'
//   import { uniqid } from '../../helpers/handyFuncs'
//   import moment from 'moment'
  import firebase from 'firebase'
  export default {
    components: {
      UiCheckboxGroup,
      UiTextbox,
      UiSelect
    },
    data() {
      return {
        staffIndex: 0,
        check: []
      }
    },
    computed: {
      staffs () {
        return this.$store.state.staffs
      },
      services () {
        return this.$store.state.services
      },
      serviceOption () {
        return this.$store.getters.getServiceOptions
      }
    },
    methods: {
      updateName (index, key, e) {
        const value = {
          index,
          'name': e.target.value
        }
        firebase.database().ref(`staffs/${this.$store.state.user.uid}`).child(key).child('name').set(e.target.value)
        this.$store.commit('updateStaffName', value)
      },
      updateBio (index, key, e) {
        const value = {
          index,
          'short_bio': e
        }
        firebase.database().ref(`staffs/${this.$store.state.user.uid}`).child(key).child('short_bio').set(e)
        this.$store.commit('updateStaffBio', value)
      },
      updateAssign (index, key, e) {
        const value = {
          index,
          key,
          'services': e
        }
        // firebase.database().ref(`staffs/${this.$store.state.user.uid}`).child(key).child('short_bio').set(e)
        // this.$store.commit('updateStaffAssign', value)
        this.$store.dispatch('updateStaffAssign', value)
      },
      addStaffForm() {
        // TODO: change the get serviceOptions to be getServiceValuesArr once keen ui has finished testing on Safary.
        const initService = this.$store.getters.getServiceOptions
        console.log(initService)
        this.$store.dispatch('addStaff', initService)
      },
      removeStaffForm(key) {
        this.$store.dispatch('removeStaff', key)
      }
    }
  }

</script>
