<template>
<v-card>
    <v-toolbar class="teal white--text">
    <v-toolbar-title class="pa-0">What's your business type?</v-toolbar-title>
  </v-toolbar>
    <v-list>
        <v-list-group v-for="(cat,index) in catsWithActive" :key="index" v-model="cat.active" no-action>
            <v-list-tile slot="item">
                <v-list-tile-action>
                    <v-icon class="teal--text">{{ cat.action.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ cat.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-list-item v-for="(subcat,subkey) in subcategories[cat.id]" @click="onSelectSubCat(subkey, subcat.title, cat.id, cat.title)" :key="subkey">
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon v-if="subkey==subcategory.id">done</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subcat.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-item>
        </v-list-group>
    </v-list>
    </v-card>
</template>
<script>
    import { mapState } from 'vuex'
    // import firebase from 'firebase'
    export default {
      props: ['categories', 'subcategories'],
      computed: {
        catsWithActive () {
          return Object.keys(this.categories).map((key) => {
            return {
              id: key,
              title: this.categories[key]['title'],
              action: this.categories[key]['action'],
              active: this.categories[key]['title'] === this.category.title
            }
          })
        },
        ...mapState({
          subcategory: state => state.business.subcategory,
          category: state => state.business.category
        })
      },
      methods: {
        onSelectSubCat (subcat, subcatTitle, cat, catTitle) {
          // Save to firebase
        //   firebase.database().ref(`businesses/${this.$store.state.user.uid}`).child('category').set({id: cat, title: catTitle})
        //   firebase.database().ref(`businesses/${this.$store.state.user.uid}`).child('subcategory').set({id: subcat, title: subcatTitle})
          this.$store.dispatch('updateBusinessCat', {
            subcategory: {id: subcat, title: subcatTitle},
            category: {id: cat, title: catTitle}
          })
        }
      }
    }
</script>
