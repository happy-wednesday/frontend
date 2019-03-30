<template>
  <HwdModal>
    <template v-slot:button>
      入信
    </template>
    <template v-slot:contents>
      <HwdSignup></HwdSignup>
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
}
</script>
