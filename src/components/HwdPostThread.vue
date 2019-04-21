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
              label="名前(ログインすると変わるよ)"
              placeholder="名無しの信者"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="title"
              :rules="[rules.empty,rules.length(40)]"
              box
              color="red lighten-2"
              label="スレッドタイトル"
              placeholder="適当にね"
              counter="40"
            ></v-text-field>
            <v-textarea
              v-model="message"
              :rules="[rules.empty,rules.length(120)]"
              auto-grow
              box
              color="red lighten-2"
              label="本文"
              placeholder="今日の布教活動とか"
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
      title: '',
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
    doPost () {
      if (!this.form) {
        return
      }
      this.$request.thread.post(
        {'title': this.title}).then(res => {
          this.$request.response.post(
            {'thread': res.data.id, 'message': this.message}).then(res => {
              this.$refs.form.reset()
              this.dialog = false
              this.$store.dispatch('fetchThreadAsync', {offset: 0})
            })
      })
    },
  },
}
</script>
