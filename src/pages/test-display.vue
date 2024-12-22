<template>
  <x-svg
    :cols-max="3"
    :patch="patch" />
</template>

<script>

import { defineComponent } from 'vue'
import XSvg from '@/components/XSvg.vue'
import { getTestPatch } from '../../lib/parser/utils/test-patch.ts'

export default defineComponent({
  components: { XSvg },
  computed: {
    patch () {
      return getTestPatch()
    }
  }
})
</script>
