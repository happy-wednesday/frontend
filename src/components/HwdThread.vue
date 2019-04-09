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
      <v-container
        fluid
        grid-list-lg
      >
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card
          dark
          flat
          color="red lighten-2"
          >
            <v-card-text class="py-2">
              <h4>{{ response.title }}</h4>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

          <v-card
          dark
          flat
          >
            <v-card-text class="py-2">
              <div class="grey--text">
                1
                <span v-if="response.user">
                  信者{{ response.user.id }}号
                </span>
                <span v-else>
                  名無しの信者
                </span>
                {{ response.createdAt | printDate }}

                ID : {{ response.responseId }}
              </div>
              <h4 v-html="$sanitize(response.message)"></h4>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

          <v-card
          dark
          flat
          v-for="(data, index) in response.thread"
          :key="data.id"
          >
            <v-card-text class="py-2">
              <div class="grey--text">
                {{ index + 2}}
                <span v-if="data.user">
                  信者{{ data.user.id }}号
                </span>
                <span v-else>
                  名無しの信者
                </span>
                {{ data.createdAt | printDate }}

                ID : {{ response.responseId }}
              </div>
              <h4 v-html="$sanitize(data.message)"></h4>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

        </v-flex>
      </v-layout>
      </v-container>
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
    response () {
      return this.$store.state.response
    },
  },
  methods: {

  },
  mounted () {
    this.$store.dispatch('fetchResponseAsync', this.$route.params.id)
  },
  filters: {
    printDate (val) {
      return moment(val).locale('ja').format('MM/DD HH:mm:ss')
    },
  },
}
</script>
