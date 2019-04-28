<template>
  <v-app id="app" dark>
    <v-toolbar clipped-left color="red lighten-2">
      <v-toolbar-title>
        <v-btn flat @click.stop='$router.push({name: "HwdTopView"})' class="title font-weight-bold">
          hwd教
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <HwdSignupModal v-show="!isLoggedIn"></HwdSignupModal>
      <HwdLoginModal v-show="!isLoggedIn"></HwdLoginModal>
      <v-btn flat small v-show="isLoggedIn" @click="logout">ログアウト</v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app fixed color="red lighten-2">
      <span>&copy; 2019 HappyWednesday教</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import HwdLoginModal from './components/HwdLoginModal'
import HwdSignupModal from './components/HwdSignupModal'

export default {
  name: 'App',
  components: {
    HwdLoginModal,
    HwdSignupModal,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  props: {
    source: String,
  },
  created () {
    this.tryLoggedIn()
  },
  methods: {
    ...mapActions(['login', 'logout', 'tryLoggedIn']),
  },
}
</script>

<style>
</style>
