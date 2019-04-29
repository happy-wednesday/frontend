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
          color="red lighten-3"
          id="thread-title"
          >
            <v-card-text class="py-2">
              <h4>{{ response.title }}</h4>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

          <v-card
          flat
          hover
          v-for="data in response.thread"
          :key="data.id"
          @click="focus_response(data); click(data.id, '#');"
          >
            <v-card-text class="py-2">
              <div class="grey--text">
                {{ data.responseNumber }}({{data.anchorChild.length}})
                <span v-if="data.user">
                  信者{{ data.user.id }}号
                </span>
                <span v-else>
                  名無しの信者
                </span>
                {{ data.createdAt | printDate }}

                ID : {{ data.responseId }}
              </div>
              <h4 style="word-break: break-all;" v-html="$sanitize(data.message)"></h4>
            </v-card-text>
            <v-card-actions class="py-1">
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="response_to(data.responseNumber)">
                <v-icon>reply</v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
          <v-dialog v-model="dialog1" scrollable max-width="450px">
            <v-card color="grey darken-4">
              <v-card-text id="dialog">
                <template v-for="sub_tree in sub_tree_list" >
                  <template v-for="data in sub_tree">
                    <v-card
                    flat
                    :class="[data.id === focus_response_data.id ? focus_response_style : focus_response_data.anchorParent.includes(data.id) ? parent_response_style : other_response_style]"
                    :key="data.uuid"
                    :style="styles(data.depth)"
                    :id="target(data.id, '')"
                    >
                      <v-card-text class="py-2">
                        <div class="grey--text">
                          {{ data.responseNumber }}({{data.anchorChild.length}})
                          <span v-if="data.user">
                            信者{{ data.user.id }}号
                          </span>
                          <span v-else>
                            名無しの信者
                          </span>
                          {{ data.createdAt | printDate }}

                          ID : {{ data.responseId }}
                        </div>
                        <h4 style="word-break: break-all;" v-html="$sanitize(data.message)"></h4>
                      </v-card-text>
                      <v-divider></v-divider>
                    </v-card>
                  </template>
                </template>
              </v-card-text>
            </v-card>
          </v-dialog>
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
      dialog1: false,
      sub_tree_list: [],
      focus_resposne_data:{},
      parent_response_style: 'blue-grey darken-4 tree',
      focus_response_style: 'blue-grey darken-3 tree',
      other_response_style: 'grey darken-3 tree',
    }
  },
  computed: {
    response () {
      return this.$store.state.response
    },
    tree_response () {
      return this.$store.state.tree_response
    },
  },
  methods: {
    get_sub_tree_list (id) {
      this.sub_tree_list = []
      for (const i of this.tree_response) {
        for (const j of i) {
          if (j.id === id) {
            this.sub_tree_list.push(i)
            break
          }
        }
      }
    },
    target (id, mark) {
      return mark + 'id_' + id
    },
    click (id, mark) {
      this.focus_id = id
      this.get_sub_tree_list(id)
      this.dialog1 = true
      this.$nextTick(() => this.$scrollTo(this.target(id, mark), 200, {container: '#dialog'}))
    },
    response_to (num) {
      this.$store.commit('setResponseNumber', '>>' + num)
      this.$store.commit('setResponseDialog', true)
    },
    focus_response(data){
      this.focus_response_data = data
    },
    styles (depth) {
      return {
        '--margin': depth * 10 + 'px',
      }
    },
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

<style>
.tree{
  --margin:10px;
  margin-left:var(--margin);
}
#thread-title {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
