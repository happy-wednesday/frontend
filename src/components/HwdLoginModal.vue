<template>
  <HwdModal  ref="loginModal">
    <template v-slot:button>
      ログイン
    </template>
    <template v-slot:contents>
      <HwdLogin @close="dialogClose"></HwdLogin>
    </template>
  </HwdModal>
</template>

<script>
import HwdModal from './HwdModal'
import HwdLogin from './HwdLogin'

export default {
  components: {
    HwdModal,
    HwdLogin,
  },
  methods: {
    dialogClose () {
      this.$refs.loginModal.close()
    },
  },
}
</script>
