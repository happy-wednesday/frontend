<template>
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
    flat
  >
    <v-alert :value="nonFieldErrors.length" type="error">
      <div v-for="error in nonFieldErrors" :key="error">{{ error }}</div>
    </v-alert>
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        box
        color="deep-purple"
        label="メールアドレス"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(6)]"
        box
        color="deep-purple"
        counter="6"
        label="パスワード"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
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
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        @click="submit"
        class="white--text"
        color="red lighten-2"
        depressed
      >ログイン</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    nonFieldErrors: [],
    rules: {
      email: v => !!(v || '').match(/@/) || '正しいメールアドレスにしてください',
      length: len => v => (v || '').length >= len || `${len}文字以上にしてください`,
      password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
    },
  }),
  methods: {
    ...mapActions(['login']),
    submit () {
      this.nonFieldErrors = []
      this.login([this.email, this.password]).then(res => {
        this.$refs.form.reset()
        this.$emit('close')
      })
        .catch(error => {
          window.alert('メアドかパスワードが違います')
          console.log(error)
        })
    },
  },
}
</script>
