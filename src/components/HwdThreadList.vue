<template>
  <div>
    <div v-show="$store.state.loading">
      <v-container fluid>
       <v-layout column>
         <v-flex xs12>
           <div class="resultContainer">
             <v-layout align-center justify-center row fill-height>
               <v-progress-circular
                 indeterminate
                 color="red lighten-2"
               ></v-progress-circular>
             </v-layout>
           </div>
         </v-flex>
       </v-layout>
     </v-container>
    </div>
    <div style="max-width: 900px; margin: auto;" v-show="!$store.state.loading">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card
        flat
        hover
        v-for="data in thread"
        :key="data.id"
        @click='$router.push({name: "HwdThreadView", params: { id: data.id }})'
        >
          <v-card-text class="pt-2 pb-0">
            <h4>{{ data.title }}</h4>
          </v-card-text>
          <v-card-actions class="px-3 pt-0 pb-2 grey--text">
            {{ data.createdAt | printDate }}
            <v-spacer></v-spacer>
            {{ data.thread.length }}
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>

      </v-flex>
    </v-layout>
  </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
    }
  },
  computed: {
    thread () {
      return this.$store.state.thread
    },
  },
  methods: {

  },
  mounted () {
    this.$store.dispatch('fetchThreadAsync', {offset: 0})
  },
  filters: {
    printDate (val) {
      return moment(val).locale('ja').format('MM/DD HH:mm')
    },
  },
}
</script>
