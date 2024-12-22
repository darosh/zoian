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

<style>
/* noto-sans-latin-wght-normal */
@font-face {
  font-family: 'Noto Sans';
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}

/* montserrat-latin-wght-normal */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/montserrat:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
</style>

<style>
* {
  font-family: "Noto Sans", sans-serif !important;
}

b, .g-bold {
  font-weight: bold;
}

.g-bolder {
  font-weight: 600;
  font-family: "Montserrat", sans-serif !important;
  letter-spacing: -0.01em;
  word-spacing: -0.04em;
}
</style>
