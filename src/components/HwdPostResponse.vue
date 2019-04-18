<template>
  <div>
    <v-btn
      color="blue lighten-2"
      dark
      fixed
      bottom
      right
      fab
      @click="dialog = true"
    >
      <v-icon>create</v-icon>
    </v-btn>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar
            cards
            dark
            flat
          >
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            :disabled="!form"
            :loading="isLoading"
            class="white--text"
            depressed
            round
            color="red lighten-2"
            @click="doPost">
              投稿
            </v-btn>
          </v-toolbar>
          <v-form
            ref="form"
            v-model="form"
            class="pa-3 pt-4"
          >
            <v-text-field
              v-model="name"
              box
              color="red lighten-2"
              label="名前(ログインして社名や業種を登録すると変更できます)"
              placeholder="名無しの信者"
              disabled
            ></v-text-field>
            <v-textarea
              v-model="message"
              :rules="[rules.empty,rules.length(120)]"
              auto-grow
              box
              color="red lighten-2"
              label="本文"
              placeholder="レスポンス的な"
              counter="120"
            ></v-textarea>

          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              flat
              @click="$refs.form.reset()"
            >
              消去
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      name: '',
      message: '',
      form: false,
      isLoading: false,
      rules: {
        length: len => v => (v || '').length <= len || `${v.length - len}文字オーバーしています！`,
        empty: v => !!v || '空欄です！',
      },
    }
  },
  methods: {
    anchor:function(value){
      const regexp = /(>+)(\d{1,4})/g
      const to_lst = []
      let m
      while ((m = regexp.exec(value)) != null) {
        to_lst.push(m);
      }

      const to=[]
      for(const i of to_lst){
        if(this.$store.state.response.thread[Number(i[2]) - 1]){
          to.push(this.$store.state.response.thread[Number(i[2]) - 1].id)
        }
      }
      console.log(to)
      return to
    },
    doPost () {
      if (!this.form) {
        return
      }
      this.$request.response.post(
        {'thread': this.$route.params.id, 'message': this.message, 'anchorParent':this.anchor(this.message)})
          .then(res => {
            this.$refs.form.reset()
            this.dialog = false
            this.$store.dispatch('fetchResponseAsync', this.$route.params.id)
          })
    },
  },
}
</script>
