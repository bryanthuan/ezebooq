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
                    <!-- Basic information -->
                    <v-card-row class="mt-2">
                          <v-col xs4 lg2 class="text-lg-right text-xs-left">Business Name</v-col>
                          <v-col xs8 lg10 class="text-xs-left"><span class="headline" v-text="businessName"></span></v-col>
                    </v-card-row>
                    <v-card-row>
                          <v-col xs4 lg2 class="text-lg-right text-xs-left">Business Type</v-col>
                          <v-col xs8 lg10 class="text-xs-left"><strong v-text="subcategory.title"></strong><v-btn @click.native="editBusinessType" flat class="blue--text darken-1">Edit</v-btn></v-col>
                    </v-card-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {

}
</script>
