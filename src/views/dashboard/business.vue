<template>
    <div class="page-content">
        <header>
        <v-toolbar fixed class="teal">
          <v-toolbar-side-icon class="hidden-md-and-up white--text" @click.native.stop="bizSiderbar = !bizSiderbar" />
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
             <v-sidebar v-model="bizSiderbar" height="auto" fixed>
             <!-- Agenda Function-->
                <v-list subheader>
                    <template v-for="item in myBusinessMenu">
                        <v-divider v-if="item.divider" light />
                        <v-subheader v-else-if="item.header" v-html="item.header"/>                  
                        <v-list-item v-else :key="item.title" @click="activeMenu(item.title)">
                            <v-list-tile router :href="item.to" ripple :class="activePage===item.title? 'list__tile--highlighted list__tile--active':''">
                                <v-list-tile-avatar>
                                <v-icon v-html="item.icon" />
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"/>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-item>                        
                    </template>  
                </v-list>                             
                </v-sidebar>
          <v-content>
            <router-view></router-view>        
          </v-content>
        </main>
      </div>
</template>
<script>
  export default {
    data () {
      return {
        bizSiderbar: false,
        activePage: 'My Business',
        myBusinessMenu: [
          { header: 'My Business' },
          { icon: 'home', title: 'Dashboard', to: '/' },
          { icon: 'reorder', title: 'Business Details', to: '/business/detail' },
          { icon: 'person', title: 'Staff', to: '/staff' },
          { icon: 'event', title: 'Services', to: '/services' },
          { icon: 'loyalty', title: 'Passes', to: '/passes' },
          { icon: 'beach_access', title: 'Holidays', to: '/holidays' },
          { divider: true },
          { header: 'My Account' },
          { icon: 'settings', title: 'Settings', to: '/settings' },
          { icon: 'folder_special', title: 'Premium services', to: '/premium' }
        ]
      }
    },
    methods: {
      activeMenu (page) {
        this.activePage = page
      }
    }
  }
</script>

<style scoped>
.view {
    margin-bottom: 3rem;
}
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
</style>

