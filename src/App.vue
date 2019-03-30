<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="red lighten-2">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn flat @click='$router.push({name: "HwdTopView"})' class="title font-weight-bold">
        hwd教
      </v-btn>
      <v-spacer></v-spacer>
      <div v-show="!isLoggedIn">
        <HwdSignupModal></HwdSignupModal>
      </div>
      <div v-show="!isLoggedIn">
        <HwdLoginModal></HwdLoginModal>
      </div>
      <v-btn flat outline v-show="isLoggedIn" @click="logout">ログアウト</v-btn>
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
