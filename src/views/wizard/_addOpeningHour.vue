<template>
    <v-card-row>
        <v-col md4 lg2 class="text-lg-right text-xs-left hidden-sm-and-down">Opening hours</v-col>        
        <v-col xs12 md8 lg10 class="text-xs-left ml-2">
                <v-row v-for="(item,index) in openingHours" :key="item.id">
                        <v-col xs4>
                            <v-row><v-col xs6>
                                    <ui-select
                                    class="pa-0 ma-0"
                                    label="From"
                                    has-search
                                    :options="hmOption"
                                    :value="openingHours[index].start"
                                    @input="updateStart(index, $event)"
                                ></ui-select>
                                </v-col>
                                <v-col xs6>
                                    <ui-select
                                    class="pa-0 ma-0"
                                    label="To"
                                    has-search
                                    :options="getFilteredTo(openingHours[index].start)"
                                    :value="openingHours[index].end"
                                    @input="updateEnd(index, $event)"
                                ></ui-select>
                                </v-col></v-row>
                        </v-col>
                        <v-col xs6>
                            <ui-select
                                     :name="'opDowSelect'+item.id"
                                        multiple
                                        label="Days"
                                        :options="daysOption"
                                        :value="getDays(openingHours[index].dow)"
                                        @change="updateDow(index,$event)"   
                                    ></ui-select>
                        </v-col>                        
                        <v-col xs2 lg2 class="text-xs-right">
                                <v-btn icon="icon" slot="activator" default @click.native="removeOpForm(index)">
                                    <v-icon>deconste</v-icon>
                                </v-btn>
                          </v-col>  

                    </v-row>
                <v-row><v-col xs12 lg12 class="text-xs-center"><v-btn small @click.native="addOpForm" flat class="blue--text darken-1 pa-0 ma-0">+ Add hours</v-btn></v-col></v-row>
        </v-col>
    </v-card-row>
</template>

<script>
  import { UiSelect } from 'keen-ui'
  // import moment from 'moment'
  import { getHhmm, getWeekDayOption, getDaysLabel, uniqid } from '../../helpers/handyFuncs'
  export default {
    components: {
      UiSelect
    },
    data () {
      return {
        opIndex: 0,
        hmOption: getHhmm(),
        daysOption: getWeekDayOption()
      }
    },
    computed: {
      openingHours () {
        return this.$store.state.opening_hours
      }
    },
    methods: {
      getFilteredTo (from) {
        return getHhmm(from.value)
      },
      getDays (days) {
        // days must be in [1, 3, 4] format
        return getDaysLabel(days)
      },
      updateDow (index, e) {
        const fixedDow = e.map(item => {
          return item.value
        })
        const value = {
          index,
          'dow': fixedDow
        }
        this.$store.commit('updateOpDow', value)
      },
      updateStart (index, e) {
        const value = {
          index,
          'start': e
        }
        this.$store.commit('updateOpStart', value)
      },
      updateEnd (index, e) {
        const value = {
          index,
          'end': e
        }
        this.$store.commit('updateOpEnd', value)
      },
      addOpForm () {
        const newForm = {
          'id': uniqid(),
          // 'created_time': moment(),
          // 'updated_time': moment(),
          'dow': [1],
          'start': {label: '8:00', value: 28800000}, // 8am
          'end': {label: '16:00', value: 57600000} // 8am
        }
        this.$store.commit('addOpeningHour', newForm)
      },
      removeOpForm (index) {
        this.$store.commit('removeOpeningHour', index)
        if (this.$store.state.opening_hours.length === 0) {
          this.addOpForm()
        }
      }

    }
  }

</script>
