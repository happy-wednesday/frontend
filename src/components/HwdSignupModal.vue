<template>
  <HwdModal ref="signUpModal">
    <template v-slot:button>
      入信
    </template>
    <template v-slot:contents>
      <HwdSignup @close="dialogClose"></HwdSignup>
    </template>
  </HwdModal>
</template>

<script>
import HwdModal from './HwdModal'
import HwdSignup from './HwdSignup'

export default {
  components: {
    HwdModal,
    HwdSignup,
  },
  methods: {
    dialogClose () {
      this.$refs.signUpModal.close()
    },
  },
}
</script>
