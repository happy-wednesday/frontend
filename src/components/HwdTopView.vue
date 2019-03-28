<template>
  <div>
    <HwdThreadList></HwdThreadList>
    <HwdPostThread></HwdPostThread>
  </div>
</template>

<script>
import HwdThreadList from './HwdThreadList'
import HwdPostThread from './HwdPostThread'

export default {
  components: {
    HwdThreadList,
    HwdPostThread,
  },
}
</script>
