<template>
  <v-app
    :theme="dark ? 'dark' : 'light'">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.ts'

const store = useAppStore()
const { dark } = storeToRefs(store)

watch(
  () => store.dark,
  (newValue) => {
    document.body.style.backgroundColor = newValue ? 'rgb(18, 18, 18)' : ''
  },
  { immediate: true }
)
</script>
