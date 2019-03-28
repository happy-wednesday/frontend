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
              v-model="password"
              box
              color="red lighten-2"
              label="名前(ログインして社名や業種を登録すると変更されます)"
              placeholder="名無しの信者"
              style="min-height: 96px"
              disabled
            ></v-text-field>
            <v-textarea
              v-model="comment"
              :rules="[rules.empty,rules.length(120)]"
              auto-grow
              box
              color="red lighten-2"
              label="本文"
              placeholder="今日の布教活動とか"
              counter="120"
            ></v-textarea>
            <v-input
            v-model="rating"
            :rules="[rules.empty]"
            :messages="text"
            >
              <v-rating
                v-model="rating"
                background-color="dark"
                color="yellow accent-4"
                dense
                hover
                size="40"
              ></v-rating>
            </v-input>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              flat
              @click="$refs.form.reset()"
            >
              Clear
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
      comment: '',
      rating: 0,
      form: false,
      isLoading: false,
      password: '',
      rules: {
        length: len => v => (v || '').length <= len || `${v.length - len}文字オーバーしています！`,
        empty: v => !!v || '空欄です！',
      },
      text: '本気度的な？',
    }
  },
  methods: {
    doPost () {
      if (!this.form) {
        return
      }
      this.$request.contents.post(
        {'comment': this.comment, 'rating': this.rating}).then(res => {
        this.$refs.form.reset()
        this.dialog = false
        this.$store.dispatch('fetchDataAsync', {offset: 0})
      })
    },
  },
}
</script>
