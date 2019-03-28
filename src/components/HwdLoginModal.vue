<template>
  <div>
    <HwdModal>
      <template v-slot:button>
        ログイン
      </template>
      <template v-slot:contents>
        <HwdLogin></HwdLogin>
      </template>
    </HwdModal>
  </div>
</template>

<script>
import HwdModal from './HwdModal'
import HwdLogin from './HwdLogin'

export default {
  components: {
    HwdModal,
    HwdLogin,
  },
}
</script>
