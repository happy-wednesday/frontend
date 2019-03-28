<template>
  <div style="max-width: 900px; margin: auto;">
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 v-for="data in contents" :key="data.id">
          <v-card color="red lighten-2" class="white--text">
            <v-card-text>
              <v-layout
                align-center
                justify-end
              >
                <span>{{ data.createdAt | printDate}}</span>
              </v-layout>
              <span>{{ data.comment }}</span><br>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <span v-if="data.user">
                信者{{ data.user.id }}号
              </span>
              <span v-else>
                名無しの信者
              </span>
              <v-spacer></v-spacer>
              <v-rating
                v-model="data.rating"
                background-color="white"
                color="yellow accent-4"
                dense
                hover
                size="18"
                readonly

              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
    contents () {
      return this.$store.state.contents
    },
  },
  methods: {

  },
  mounted () {
    this.$store.dispatch('fetchDataAsync', {offset: 0})
  },
  filters: {
    printDate (val) {
      return moment(val).locale('ja').format('YYYY/MM/DD HH:mm')
    },
  },
}
</script>
