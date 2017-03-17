<template>
    <v-container fluid>                                
                    <v-row>
                        <v-col xs12>
                            <v-card>
                                <v-card-row class="white">
                                    <v-card-title>
                                    <span class="teal--text teal--text">Dashboard</span>
                                    <v-spacer></v-spacer>                            
                                    </v-card-title>
                                </v-card-row>                                
                        </v-card>
                        </v-col>
                    </v-row>                    
                    <v-row class="mt-2">
                        <v-col md4 xs12>
                            <v-card>
                             <v-card-text>
                                <v-card-row height="80px">
                                <v-icon  class="mr-5 teal--text display-3">important_devices</v-icon>
                                <div>
                                    <div class="headline">Free plan</div> <a href="#">Upgrade</a>
                                </div>
                                </v-card-row>
                            </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col md4 xs12>
                            <v-card>
                                <v-card-text>
                                <v-card-row height="80px">
                                <v-icon class="mr-5 teal--text display-3">today</v-icon>
                                <div>
                                    <div class="headline">Booking</div><strong>3/40</strong><br><a href="#">Increase limit</a>
                                </div>
                                </v-card-row>
                            </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col md4 xs12>
                            <v-card>
                                <v-card-text>
                                <v-card-row height="80px">
                                <v-icon  class="mr-5 teal--text display-3">email</v-icon>
                                <div>
                                    <div class="headline">Notification</div><strong>5</strong> <br><a href="#">Increase limit</a>
                                </div>
                                </v-card-row>
                            </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                        
                    <v-row class="mt-2">
                        <v-col xs12>
                        <v-card>
                            <v-card-row class="white">
                                    <v-card-title>
                                    <span class="teal--text teal--text">Upcoming Booking</span>
                                    <v-spacer></v-spacer>                            
                                    </v-card-title>
                                </v-card-row>
                                <v-card-text>
                                <v-card-row>
                                    <v-col xs12>
                                        <UpcomingBooking></UpcomingBooking>
                                    </v-col>
                                </v-card-row>  
                                </v-card-text>
                        </v-card>
                        </v-col>
                    </v-row>                   
                    <v-row class="mt-2">
                        <v-col xs12>
                        <v-card>
                            <v-card-row class="white">
                                    <v-card-title>
                                    <span class="teal--text teal--text">Latest activity</span>
                                    <v-spacer></v-spacer>                            
                                    </v-card-title>
                                </v-card-row>
                            <v-list two-line>                                
                                <template v-for="item in activities">
                                    <v-subheader v-if="item.header" v-text="item.header" />
                                    <v-divider v-else-if="item.divider" v-bind:inset="item.inset" />
                                    <v-list-item v-else v-bind:key="item.title">
                                        <v-list-tile avatar tag="span">
                                        <v-list-tile-avatar>
                                            <v-icon x-large v-html="item.avatar" />
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <div><a href="#">{{item.title}}</a> had an appointment on 03/16/2017, 8:15 am </div>
                                            
                                            <v-list-tile-sub-title v-html="item.subtitle" />
                                        </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list-item>
                                    </template>                              
                            </v-list>
                            </v-card>
                        </v-col>
                    </v-row>                   
            </v-container>  
</template>
<script>
  import UpcomingBooking from './_upcomingBooking'
  export default {
    components: {
      UpcomingBooking
    },
    data () {
      return {
        activities: [
          { avatar: 'account_box', title: 'Nguyen Duc Thuan', subtitle: '03/15/2017, 7:57 pm via Booking page' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Thai Binh', subtitle: '03/12/2017, 6:27 pm via Reservio Calendar' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Qui Qui', subtitle: '03/07/2017, 3:30 pm via Booking page' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Thai Binh', subtitle: '03/12/2017, 6:27 pm via Reservio Calendar' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Qui Qui', subtitle: '03/07/2017, 3:30 pm via Booking page' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Thai Binh', subtitle: '03/12/2017, 6:27 pm via Reservio Calendar' },
          { divider: true, inset: true },
          { avatar: 'account_box', title: 'Qui Qui', subtitle: '03/07/2017, 3:30 pm via Booking page' }
        ]
      }
    }
  }
</script>
