<template>
  <div>
    <v-btn
      dark
      flat
      @click="dialog = true"
    >
      <slot name="button"></slot>
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
}
</script>
