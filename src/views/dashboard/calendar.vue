<template>
    <div class="page-content">
        <header>
        <v-toolbar fixed class="teal">
          <v-toolbar-side-icon class="hidden-md-and-up white--text" @click.native.stop="calSidebar = !calSidebar" />
          <v-toolbar-logo class="text-xs-right white--text">Eezii</v-toolbar-logo>          
          <v-toolbar-items>
            <v-btn dark icon>
                <v-icon>apps</v-icon>
            </v-btn>    
            <v-btn dark icon>
                <v-icon>notifications</v-icon>                
            </v-btn>        
        </v-toolbar-items>
        </v-toolbar>
        </header>
        <main>
             <v-sidebar v-model="calSidebar" height="auto" fixed>
             <!-- Agenda Function-->
                <v-list subheader>
                    <v-subheader>Works</v-subheader>                    
                    <v-list-item v-for="item in calActions" @click="changeView(item.title, item.view)" :key="item.view">
                        <v-list-tile ripple :class="activeView===item.title? 'list__tile--highlighted list__tile--active':''">
                            <v-list-tile-avatar>
                            <v-icon v-html="item.icon"/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                            <v-list-tile-title v-html="item.title" />
                            </v-list-tile-content>
                        </v-list-tile>                        
                    </v-list-item>
                    <v-divider light />                    
                    <v-subheader>Services</v-subheader>
                    <v-list-item>
                        <v-list-tile ripple>                    
                            <v-list-tile-content>   
                                <v-checkbox label="All services" primary class="custom-checkbox" v-model="ex6" value="all" dark />                    
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                        <v-list-tile ripple>                    
                            <v-list-tile-content>   
                                <v-checkbox label="All services" primary class="custom-checkbox" v-model="ex6" value="all" dark />                    
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-item>
                    <v-divider light />                    
                    <v-subheader>Staffs</v-subheader>
                    <v-list-item>
                        <v-list-tile ripple>                    
                            <v-list-tile-content>   
                                <v-checkbox label="All services" primary class="custom-checkbox" v-model="ex6" value="all" dark />                    
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                        <v-list-tile ripple>                    
                            <v-list-tile-content>   
                                <v-checkbox label="All services" primary class="custom-checkbox" v-model="ex6" value="all" dark />                    
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-item>
                </v-list>                                       
                </v-sidebar>
          <v-content>
            <v-container fluid>                                
                 <calendarView></calendarView>                                           
            </v-container>          
          </v-content>
        </main>
        <v-footer class="grey darken-2 white--text">
            <div class="copy"> © 2017 <a href="#" target="_blank" class="white--text">Brian Thuan</a></div>
        </v-footer>        
      </div>
</template>
<script>
//   import defaultData from './calendarData'
  import calendarView from './_calendar'
  export default {
    components: {
      calendarView
    },
    data () {
      return {
        activeView: 'agenda',
        ex6: [],
        calSidebar: false,
        calActions: [
          { icon: 'view_agenda', title: 'Agenda', view: 'listMonth' },
          { icon: 'view_day', title: 'Day', view: 'agendaDay' },
          { icon: 'view_column', title: '3 Day', view: 'agendaThreeDay' },
          { icon: 'view_week', title: 'Week', view: 'agendaWeek' },
          { icon: 'view_module', title: 'Month', view: 'month' }
        ]
      }
    },
    methods: {
      changeView (title, view) {
        $('#calendar').fullCalendar('changeView', view)
        this.activeView = title
      }
    }
  }
</script>

<style>
@media (max-width:1024px){
    .content {
        padding: 0 .5rem 0;
    }
}
@media (min-width:1024px) and (max-width:1200px){
    .content {
        padding: 0 1rem 0;
    }
}

@media (min-width:1200px){
    .content {
        padding: 0 1rem 0;
    }
}
.custom-checkbox label {
    width: 100% ;
    height: 100% ;
    position: absolute;
    top: 7px ;
}
.input-group.custom-checkbox .icon {
    position: absolute;
    top: 8px;
}
.copy {
    text-align: left;
    padding-left: 1rem;
}
</style>
