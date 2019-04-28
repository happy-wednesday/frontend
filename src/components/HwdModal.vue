<template>
  <div>
    <v-btn
      flat
      @click='open'
      small
    >
      <slot name="button"></slot>
    </v-btn>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar
            cards
            flat
          >
            <v-btn icon @click='close'>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
          <slot name="contents"></slot>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
  },
}
</script>
