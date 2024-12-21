<template>
  <v-expand-transition>
    <v-progress-linear
      v-if="loading"
      color="grey"
      indeterminate
      style="position: absolute; top: 0;" />
  </v-expand-transition>
  <div
    id="x-wrap"
    style="min-height: calc(100vh);"
    @contextmenu="onContextMenu"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop">
    <input
      id="assetsFieldHandle"
      ref="file"
      style="display: none"
      multiple
      type="file"
      accept=".bin">
    <x-svg
      ref="svg"
      :style="{ opacity: isDragging || isDraggingInfo ? .06 : null }"
      style="transition: opacity .2s ease-in-out;"
      :zebu="zebu"
      :cols-max="columns"
      :show-connections="showConnections"
      :animations="animations"
      :dark="dark"
      :error="error"
      :patch="patch"
      :patch-file="file?.name"
      :patch-number="patchNumber" />
    <div
      v-if="isDragging || isDraggingInfo"
      class="x-center-container"
      style="font-size: 24px; line-height: 48px; opacity: .87;"
      @dragover="dragover"
      @drop="drop">
      <v-slide-y-transition>
        <div
          v-if="isDraggingInfoText"
          class="pa-16"
          style="pointer-events: none">
          <b>Drop .BIN patch files or a folder containing them, .ZIP files work as well.</b>
          <br>
          All processing happens in your browser &mdash; no data is sent to any server.
        </div>
      </v-slide-y-transition>
    </div>
  </div>
  <v-menu
    v-model="menuShow"
    :transition="false"
    :target="[menuX, menuY]"
    absolute
    offset-y
    no-click-animation
    @update:model-value="onMenu">
    <v-card elevation="1">
      <v-list
        density="compact"
        class="x-prepend-icons">
        <v-list-item :subtitle="files ? `User patches (${files.length} loaded)` : 'Factory patches'" />
        <v-list-item
          @click="() => {}">
          Select patch
          <template #append>
            <v-icon icon="$menuRight" />
          </template>
          <v-menu
            no-click-animation
            min-width="240"
            :transition="false"
            submenu
            activator="parent"
            open-on-hover>
            <v-card elevation="1">
              <v-list density="compact">
                <v-virtual-scroll
                  :height="320"
                  item-height="40"
                  :items="files || patches">
                  <template #default="{ item: f, index }">
                    <v-list-item
                      :active="files ? f === file : f === patch"
                      :title="f.name"
                      @click="() => files ? selectFile(f) : selectPatch(f)">
                      <template #prepend>
                        <v-list-item-action
                          style="min-width: 24px; opacity: .6; justify-content: end;"
                          class="mr-2">
                          {{ index }}.
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list>
            </v-card>
          </v-menu>
        </v-list-item>
        <v-list-item
          :disabled="files?.length === 1"
          @click="prev">
          Previous patch
          <template #append>
            <v-kbd>N</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          :disabled="files?.length === 1"
          @click="next">
          Next patch
          <template #append>
            <v-kbd>M</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          v-if="files"
          @click="loadFactory">
          Load factory patches
        </v-list-item>
        <v-list-item
          v-if="uint8Array"
          @click="downloadPatch">
          Download patch
        </v-list-item>
        <v-list-item
          @click="sharePatch">
          Share patch
          <template #append>
            <v-kbd>S</v-kbd>
          </template>
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item subtitle="View" />
        <v-list-item
          :prepend-icon="dark ? '$checkboxOn' : '$checkboxOff'"
          @click="dark = !dark">
          Dark theme
          <template #append>
            <v-kbd>D</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          :prepend-icon="showConnections ? '$checkboxOn' : '$checkboxOff'"
          @click="showConnections = !showConnections">
          Show connections
          <template #append>
            <v-kbd>C</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          :prepend-icon="animations ? '$checkboxOn' : '$checkboxOff'"
          @click="animations = !animations">
          Animations
          <template #append>
            <v-kbd>A</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          :prepend-icon="zebu ? '$checkboxOn' : '$checkboxOff'"
          @click="zebu = !zebu">
          Euroburo layout
          <template #append>
            <v-kbd>E</v-kbd>
          </template>
        </v-list-item>
        <v-list-item>
          Max columns
          <template #append>
            <v-kbd>2 &hellip; 6</v-kbd>
          </template>
        </v-list-item>
        <v-list-item>
          <v-btn-toggle
            v-model="columns"
            class="x-no-transition">
            <v-btn
              v-for="n in [2,3,4,5,6]"
              :key="n"
              style="font-family: monospace;"
              :value="n"
              density="compact"
              flat
              height="40"
              min-width="40">
              {{ n }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item
          href="https://github.com/darosh/zoian"
          target="_blank">
          About + Source code
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
  <v-snackbar
    v-model="showWelcomeToast"
    class="mt-8"
    :color="dark ? 'grey-darken-4' : null"
    timer="grey"
    :timeout="8000"
    location="bottom right">
    <div
      class="mx-4 my-2"
      style="font-size: 16px; line-height: 26px;">
      Drop .BIN files or a folder including them.<br>
      Right-click anywhere for main menu.
    </div>
  </v-snackbar>
  <v-snackbar
    v-model="showCopyToast"
    :color="dark ? 'grey-darken-4' : null"
    location="bottom right">
    <div style="font-size: 16px; line-height: 26px;">
      Link copied to clipboard
    </div>
  </v-snackbar>
  <v-snackbar
    v-model="showDropToast"
    :color="dark ? 'grey-darken-4' : null"
    location="bottom right">
    <div style="font-size: 16px; line-height: 26px;">
      {{ files?.length }} patches loaded
    </div>
  </v-snackbar>
</template>

<script lang="js">
import debug from 'debug'

import { mapWritableState } from 'pinia'
import { useTitle } from '@vueuse/core'
import { debounce } from 'rambdax'

import { useAppStore } from '@/stores/app.ts'
import { handleDrop } from '@/utils/file-drop.js'
import { getUint8ArrayFromFile } from '@/utils/array-from-file.js'
import { addBase64Padding, base64ToUint8Array, removePadding, uint8ArrayToBase64 } from '@/utils/base64-array-utils.js'
import { downloadUint8Array } from '@/utils/array-download.js'

import { LENGTH, parse } from '../../lib/index.ts'

import XSvg from '@/components/XSvg.vue'

const log = debug('zoian:app')

export default {
  components: { XSvg },
  data: () => ({
    patch: null,
    isDragging: false,
    isDraggingInfo: false,
    isDraggingInfoDebounced: null,
    isDraggingInfoText: false,
    file: null,
    items: null,
    files: null,
    patches: null,
    loading: true,
    error: false,
    uint8Array: null,
    showCopyToast: false,
    showDropToast: false,
    showWelcomeToast: false,
    menuShow: false,
    menuX: 0,
    menuY: 0
  }),
  computed: {
    ...mapWritableState(useAppStore, [
      'dark', 'columns', 'zebu', 'showConnections', 'animations'
    ]),
    patchNumber () {
      const i = this.files?.indexOf(this.file)

      if (i >= 0) {
        return i
      }

      const j = this.patches?.indexOf(this.patch)

      if (j >= 0) {
        return j
      }

      return null
    }
  },
  watch: {
    'patch.name' (newValue) {
      newValue = newValue.trim()

      if (newValue || this.patchNumber) {
        const t = []

        if (this.patchNumber !== null) {
          t.push(`${this.patchNumber}.`)
        }

        if (newValue) {
          t.push(newValue)
        }

        useTitle(t.join(' '), { restoreOnUnmount: true })
      } else {
        useTitle('ZOIA/Euroburo Patch Explorer', { restoreOnUnmount: true })
      }
    },
    patch (newValue) {
      if (newValue) {
        log('loaded patch', newValue)
      }
    },
    isDragging (newValue) {
      this.isDraggingInfoDebounced = this.isDraggingInfoDebounced || debounce((value) => {
        this.isDraggingInfo = value
        this.isDraggingInfoText = value
      }, 200)

      if (newValue) {
        this.isDraggingInfo = true

        setTimeout(() => {
          this.isDraggingInfoText = true
        }, 120)
      }

      this.isDraggingInfoDebounced(newValue)
    }
  },
  async mounted () {
    const { patches } = await import('../../patches/patches.ts')
    this.patches = patches
    const file = this.$route.query.file
    const link = this.$route.query.link

    if (file) {
      this.uint8Array = base64ToUint8Array(addBase64Padding(file), LENGTH)
      this.parseArray()
    } else if (link) {
      const response = await fetch(link)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const buffer = await response.arrayBuffer()
      this.uint8Array = new Uint8Array(buffer)
      this.parseArray()
    } else {
      const factory = this.$route.query.factory
      this.patch = this.patches[factory ? parseInt(factory, 10) : 0]
    }

    this.loading = false
    this.showWelcomeToast = true
  },
  created () {
    window.addEventListener('keydown', this.onKey)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    onContextMenu (e) {
      if (localStorage.menu === false.toString()) {
        return
      }

      e.preventDefault()
      this.menuShow = false
      this.menuX = e.clientX
      this.menuY = e.clientY

      this.$nextTick(() => {
        this.menuShow = true
        this.showWelcomeToast = false
      })
    },
    dragover (e) {
      e.preventDefault()
      this.$refs.svg.cursor = null
      this.isDragging = true
      this.showWelcomeToast = false
    },
    dragleave () {
      this.isDragging = false
    },
    async drop (e) {
      this.isDragging = false
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files
      this.items = e.dataTransfer.items
      await this.onChange()
    },
    async onChange () {
      const list = this.items ? await handleDrop(this.items) : this.$refs.file.files
      const files = list.filter(f => f.name.endsWith('.bin'))
      files.sort((a, b) => a.name.localeCompare(b.name))
      this.items = null
      this.files = files
      this.showDropToast = true
      const file = this.files.at(0)
      await this.selectFile(file)
    },
    async selectFile (file) {
      this.file = file
      this.uint8Array = await getUint8ArrayFromFile(file)
      this.loading = true
      this.parseArray()
      this.loading = false
    },
    parseArray () {
      try {
        this.patch = parse(this.uint8Array)
        this.error = false
      } catch {
        this.patch = null
        this.error = true
      }
    },
    selectPatch (patch) {
      this.error = false
      this.patch = patch
    },
    loadFactory () {
      this.files = null
      this.file = null
      this.error = false
      this.patch = this.patches[0]
    },
    getShareQuery () {
      if (!this.files) {
        const factory = this.patches.indexOf(this.patch)

        if (factory >= 0) {
          return { factory }
        }
      }

      const uint8Array = this.uint8Array
        .subarray(0, this.patch.size * 4)
        .slice()

      return { file: removePadding(uint8ArrayToBase64(uint8Array)) }
    },
    sharePatch () {
      const url = new URL(window.location.href)
      url.search = Object.entries(this.getShareQuery()).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
      const shared = url.toString()
      log('link', shared)
      navigator.clipboard.writeText(shared)
      this.showCopyToast = true
    },
    downloadPatch () {
      downloadUint8Array(this.uint8Array, 'patch.bin')
    },
    onMenu () {
      this.showWelcomeToast = false
    },
    next () {
      if (this.file) {
        let i = this.files.indexOf(this.file)
        i++
        i = i % this.files.length
        this.selectFile(this.files[i])

        return
      }

      let i = this.patches.indexOf(this.patch)

      if (i >= 0) {
        i++
        i = i % this.patches.length
        this.patch = this.patches[i]
      } else {
        this.patch = this.patches[0]
      }
    },
    prev () {
      if (this.file) {
        let i = this.files.indexOf(this.file) + this.files.length
        i--
        i = i % this.files.length
        this.selectFile(this.files[i])

        return
      }

      let i = this.patches.indexOf(this.patch)

      if (i >= 0) {
        i += this.patches.length
        i--
        i = i % this.patches.length
        this.patch = this.patches[i]
      } else {
        this.patch = this.patches[0]
      }
    },
    onKey (e) {
      const COLS = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }
      const c = COLS[e.key]
      let unknown = false

      if (e.key === 'm') {
        if (this.files?.length === 1) {
          return
        }

        this.next()
      } else if (e.key === 'n') {
        if (this.files?.length === 1) {
          return
        }

        this.prev()
      } else if (e.key === 'd') {
        this.dark = !this.dark
      } else if (e.key === 'e') {
        this.zebu = !this.zebu
      } else if (e.key === 'c') {
        this.showConnections = !this.showConnections
      } else if (e.key === 'a') {
        this.animations = !this.animations
      } else if (e.key === 's') {
        this.sharePatch()
      } else if (c) {
        this.columns = c
      } else {
        unknown = true
      }

      if (!unknown) {
        this.showWelcomeToast = false
      }
    }
  },
}
</script>

<style scoped>
.v-kbd:deep() {
  min-width: 28px;
  text-align: center;
  font-size: .9em;
  line-height: 1.4em;
  background: #ddd;
  color: #000;
  box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12)) !important;
}

.x-no-transition:deep() * {
  transition: none;
}

.x-prepend-icons:deep() *.v-list-item__prepend {
  width: 36px !important;
}

.x-center-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
}
</style>

<style lang="scss">
* {
  font-family: "Noto Sans", sans-serif !important;
}

b, .g-bold {
  font-weight: bold;
}

.g-bolder {
  font-weight: 600;
  font-family: "Montserrat", sans-serif !important;
}
</style>
