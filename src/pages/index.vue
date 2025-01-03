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
    v-touch="{
      left: () => prev(),
      right: () => next(),
    }"
    class="x-no-select"
    style="min-height: calc(100vh);"
    @mousedown="onClick"
    @contextmenu="onContextMenu"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
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
      :style="{
        opacity: isDragging || isDraggingInfo ? .06 : null,
        visibility: loadingDrop ? 'hidden' : null
      }"
      style="transition: opacity .2s ease-in-out;"
      :euro="euro"
      :tips="showTips"
      :cols-max="columns"
      :show-connections="showConnections"
      :animations="animations"
      :dark="dark"
      :mouse-mode="mouseMode"
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
      <v-fade-transition hide-on-leave>
        <div
          v-if="isDraggingInfoText"
          class="pa-16"
          style="pointer-events: none">
          <b>Drop .BIN patch files or a folder containing them, .ZIP files work as well.</b>
          <br>
          All processing happens in your browser &mdash; no data is sent to any server.
        </div>
      </v-fade-transition>
      <div
        v-if="isLoadingInfoText"
        class="pa-16"
        style="pointer-events: none">
        Loading&hellip;
      </div>
    </div>
  </div>
  <v-menu
    v-model="menuShow"
    :transition="false"
    :target="[menuX, menuY]"
    absolute
    offset-y
    @update:model-value="onMenu">
    <v-card
      class="x-no-select"
      elevation="1">
      <v-list
        density="compact"
        class="x-prepend-icons">
        <v-list-item :subtitle="files ? `User patches (${files.length} loaded)` : 'Factory patches'" />
        <v-list-item
          :disabled="files?.length === 1"
          @click="() => {}">
          Select patch
          <template #append>
            <v-icon icon="$menuRight" />
          </template>
          <v-menu
            v-if="!(files?.length === 1)"
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
        <v-list-item
          :prepend-icon="dark ? '$checkboxOn' : '$checkboxOff'"
          @click="dark = !dark">
          Dark theme
          <template #append>
            <v-kbd>D</v-kbd>
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
          :prepend-icon="euro ? '$checkboxOn' : '$checkboxOff'"
          @click="euro = !euro">
          Euroburo layout
          <template #append>
            <v-kbd>E</v-kbd>
          </template>
        </v-list-item>
        <v-list-item
          :prepend-icon="showTips ? '$checkboxOn' : '$checkboxOff'"
          @click="showTips = !showTips">
          Module description
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item subtitle="Show connections">
          <template #append>
            <v-kbd>C</v-kbd>
          </template>
        </v-list-item>
        <v-list-item class="text-center">
          <v-btn-toggle
            v-model="showConnections"
            class="x-no-transition">
            <v-btn
              v-for="n in connectionList"
              :key="n.title"
              style="font-family: monospace; font-size: 13px;"
              :value="n.value"
              class="text-capitalize px-2"
              density="compact"
              flat
              height="40"
              min-width="40">
              {{ n.title }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
        <v-divider class="mb-1" />
        <v-list-item subtitle="Max columns">
          <template #append>
            <v-kbd>2 &hellip; 6</v-kbd>
          </template>
        </v-list-item>
        <v-list-item class="text-center">
          <v-btn-toggle
            v-model="columns"
            class="x-no-transition">
            <v-btn
              v-for="n in [2,3,4,5,6]"
              :key="n"
              style="font-family: monospace; font-size: 13px;"
              :value="n"
              density="compact"
              flat
              height="40"
              min-width="40">
              {{ n }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
        <v-divider class="mb-1" />
        <v-list-item subtitle="Mouse mode" />
        <v-list-item class="text-center">
          <v-btn-toggle
            v-model="mouseMode"
            class="x-no-transition">
            <v-btn
              v-for="n in mouseModeList"
              :key="n.title"
              style="font-family: monospace; font-size: 13px;"
              :value="n.value"
              class="text-capitalize px-2"
              density="compact"
              flat
              height="40"
              min-width="40">
              {{ n.title }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
        <v-divider class="mb-1" />
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
    :timer="dark ? 'grey' : 'grey-lighten-1'"
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
  <v-snackbar
    :model-value="showConnectionChangeToast"
    :color="dark ? 'grey-darken-4' : null"
    :timeout="-1"
    rounded="pill"
    min-width="300"
    location="top"
    @mouseenter="onConnectionEnter"
    @mouseleave="onConnectionLeave">
    <div
      class="d-flex"
      style="margin: -12px -10px;">
      <svg
        width="38"
        height="38"
        viewBox="0 0 24 24">
        <x-svg-symbol
          :location="0"
          :px="1"
          :dark="true"
          :size="24"
          :active="true"
          :position="[0,0]"
          text="CONNECTION" />
      </svg>
      <v-tabs
        v-model="connectionTab"
        class="mr-4"
        density="compact">
        <v-tab class="x-toast-tab">
          None
        </v-tab>
        <v-tab class="x-toast-tab">
          CV
        </v-tab>
        <v-tab class="x-toast-tab">
          Audio
        </v-tab>
        <v-tab class="x-toast-tab">
          All
        </v-tab>
      </v-tabs>
    </div>
  </v-snackbar>
</template>

<script lang="js">
import debug from 'debug'

import { mapWritableState } from 'pinia'
import { useTitle } from '@vueuse/core'
import { debounce } from 'rambdax'

import { useAppStore } from '@/stores/app.ts'
import { handleDrop, processZipFile } from '@/utils/file-drop.js'
import { getUint8ArrayFromFile } from '@/utils/array-from-file.js'
import { addBase64Padding, base64ToUint8Array, removePadding, uint8ArrayToBase64 } from '@/utils/base64-array-utils.js'
import { downloadUint8Array } from '@/utils/array-download.js'
import { gzipUint8Array, resizeUint8Array, ungzipUint8Array } from '@/utils/gzp-array.js'

import { LENGTH, parse } from '../../lib/index.ts'

import XSvg from '@/components/XSvg.vue'
import XSvgSymbol from '@/components/XSvgSymbol.vue'

// import { SIMPLE_PATCH } from '../../lib/tests/fixtures/simple-patch.ts'

const log = debug('zoian:app')

export default {
  components: { XSvgSymbol, XSvg },
  data: () => ({
    patch: null,
    isDragging: false,
    isDraggingInfo: false,
    isDraggingInfoDebounced: null,
    isDraggingInfoText: false,
    isLoadingInfoText: false,
    touchTimer: null,
    touchTapTimer: null,
    file: null,
    items: null,
    files: null,
    patches: null,
    loading: true,
    loadingDrop: false,
    error: false,
    uint8Array: null,
    showCopyToast: false,
    showDropToast: false,
    showWelcomeToast: false,
    menuShow: false,
    menuX: 0,
    menuY: 0,
    showConnectionChangeToast: false,
    showConnectionChangeToastTimer: null,
    showConnectionChangeToastOver: false
  }),
  computed: {
    ...mapWritableState(useAppStore, [
      'dark', 'columns', 'euro', 'showConnections', 'animations', 'showTips', 'mouseMode'
    ]),
    connectionList () {
      return [
        { title: 'None', value: false },
        { title: 'CV', value: 1 },
        { title: 'Audio', value: 2 },
        { title: 'All', value: true },
      ]
    },
    mouseModeList () {
      return [
        { title: 'Lazy', value: 0 },
        { title: 'Clicky', value: 1 },
        { title: 'Quicky', value: 2 },
      ]
    },
    connectionTab: {
      get () {
        return this.connectionList.findIndex(x => x.value === this.showConnections)
      },
      set (v) {
        this.showConnections = this.connectionList[v].value
      }
    },
    patchNumber () {
      const i = this.files?.indexOf(this.file)

      if (i >= 0) {
        return this.files.length === 1 ? null : i
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
        }, 25)
      }

      this.isDraggingInfoDebounced(newValue)
    },
    showConnections () {
      this.showConnectionChangeToast = true

      if (this.showConnectionChangeToastTimer) {
        clearTimeout(this.showConnectionChangeToastTimer)
      }

      if (this.showConnectionChangeToastOver) {
        return
      }

      this.showConnectionChangeToastTimer = setTimeout(() => {
        this.showConnectionChangeToast = false
        this.showConnectionChangeToastTimer = null
      }, 1200)
    }
  },
  async mounted () {
    this.showWelcomeToast = true

    // await new Promise(r => setTimeout(() => r), 1e6)

    const { patches } = await import('../../patches/patches.ts')
    this.patches = patches

    const file = this.$route.query.file
    const link = this.$route.query.link

    if (file) {
      let uint8Array = base64ToUint8Array(addBase64Padding(file))

      try {
        uint8Array = await ungzipUint8Array(uint8Array)
      } catch (e) {
        console.error(e)
      }

      uint8Array = resizeUint8Array(uint8Array, LENGTH)

      this.uint8Array = uint8Array

      this.files = [null] // dummy?
      this.parseArray()
    } else if (link) {
      const response = await fetch(link)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      const isZip = contentType === 'application/zip' ||
        contentType === 'application/x-zip-compressed' ||
        contentType === 'multipart/x-zip'

      log('link content type', contentType)

      if (isZip) {
        log('processing zip')

        const buffer = await response.arrayBuffer()
        const list = await processZipFile(buffer)
        const files = list.filter(f => f.name.endsWith('.bin') && !f.name.startsWith('.'))
        files.sort((a, b) => a.name.localeCompare(b.name))
        this.items = null
        this.files = files

        if (files.length !== 1) {
          this.showWelcomeToast = false
          this.showDropToast = true
        }

        const file = this.files.at(0)

        if (file) {
          try {
            await this.selectFile(file)
          } catch (e) {
            console.error(e)
          }
        }
      } else {
        const buffer = await response.arrayBuffer()
        this.uint8Array = new Uint8Array(buffer)
        this.parseArray()
      }
    } else {
      const factory = this.$route.query.factory
      this.patch = this.patches[factory ? parseInt(factory, 10) : 0]
      // this.patch = SIMPLE_PATCH
    }

    this.loading = false
  },
  beforeMount () {
    window.addEventListener('keydown', this.onKey)
    window.addEventListener('keyup', this.onKeyUp)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('keyup', this.onKeyUp)
  },
  methods: {
    onClick (e) {
      if ((e.type === 'mousedown') && (e.button === 0)) {
        e.preventDefault()
        e.stopPropagation()
        this.$refs.svg.hideTooltip = !this.$refs.svg.hideTooltip
        this.$refs.svg.onMouseClick()
      }
    },
    onTouchStart (e) {
      e.stopPropagation()
      e.preventDefault()

      if (this.touchTimer) {
        clearTimeout(this.touchTimer)
        this.touchTimer = null
      }

      this.touchTimer = setTimeout(() => { this.onContextMenu(e) }, 400)
      this.touchTapTimer = setTimeout(() => { this.menuShow = false }, 100)
    },
    onTouchEnd (e) {
      e.stopPropagation()
      e.preventDefault()

      if (this.touchTimer) {
        clearTimeout(this.touchTimer)
      }
    },
    onTouchMove () {
      if (this.touchTapTimer) {
        clearTimeout(this.touchTapTimer)
        this.touchTapTimer = null
      }

      if (this.touchTimer) {
        clearTimeout(this.touchTimer)
        this.touchTimer = null
      }
    },
    onContextMenu (e) {
      if (localStorage.menu === false.toString()) {
        return
      }

      e.preventDefault()
      this.menuShow = false
      this.menuX = e.clientX ?? e.touches?.[0]?.clientX
      this.menuY = e.clientY ?? e.touches?.[0]?.clientY

      this.$nextTick(() => {
        this.menuShow = true
        this.showWelcomeToast = false
      })
    },
    dragover (e) {
      e.preventDefault()
      this.$refs.svg.cursor = null
      this.$refs.svg.cursorBlock = null
      this.$refs.svg.connectedBlock = null
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
      this.isDraggingInfoText = false
      this.isLoadingInfoText = true
      await this.onChange()
    },
    async onChange () {
      this.loadingDrop = true
      const list = this.items ? await handleDrop(this.items) : this.$refs.file.files
      const files = list.filter(f => f.name.endsWith('.bin'))
      files.sort((a, b) => a.name.localeCompare(b.name))
      this.items = null
      this.files = files
      this.showDropToast = true
      const file = this.files.at(0)

      if (file) {
        try {
          await this.selectFile(file)
        } catch (e) {
          console.error(e)
        }
      }

      this.isLoadingInfoText = false
      this.loadingDrop = false
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
    async getShareQuery () {
      if (!this.files) {
        const factory = this.patches.indexOf(this.patch)

        if (factory >= 0) {
          return { factory }
        }
      }

      const uint8Array = this.uint8Array
        .subarray(0, this.patch.size * 4)
        .slice()

      const gz = await gzipUint8Array(uint8Array)

      return { file: removePadding(uint8ArrayToBase64(gz)) }
    },
    async sharePatch () {
      const url = new URL(window.location.href)
      const q = Object.entries(await this.getShareQuery()).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
      // no hash
      // url.search = q
      url.hash = `/?${q}`
      const shared = url.toString()
      log('link', shared)
      await navigator.clipboard.writeText(shared)
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
        this.euro = !this.euro
      } else if (e.key === 'c') {
        this.showConnections = this.connectionList[(this.connectionList.findIndex(x => x.value === this.showConnections) + 1) % this.connectionList.length].value
      } else if ((e.key === 'C') && e.shiftKey) {
        this.showConnections = this.connectionList[(this.connectionList.findIndex(x => x.value === this.showConnections) - 1 + 4) % this.connectionList.length].value
      } else if (e.key === 'a') {
        this.animations = !this.animations
      } else if (e.key === 's') {
        this.sharePatch()
      } else if (c) {
        this.columns = c
      } else if (e.key === 'Escape') {
        this.$refs.svg.cursorBlock = null
        this.$refs.svg.connectedBlock = null
        this.$refs.svg.mouseLocked = false
        unknown = true
      } else {
        unknown = true
      }

      if (!unknown) {
        this.showWelcomeToast = false
      }
    },
    onKeyUp (event) {
      if (event.key === 'Shift') {
        this.$refs.svg.onShiftUp()
      }
    },
    onConnectionEnter () {
      this.showConnectionChangeToastOver = true

      if (this.showConnectionChangeToastTimer) {
        clearTimeout(this.showConnectionChangeToastTimer)
        this.showConnectionChangeToastTimer = null
      }
    },
    onConnectionLeave () {
      this.showConnectionChangeToastOver = false

      this.showConnectionChangeToastTimer = setTimeout(() => {
        this.showConnectionChangeToast = false
        this.showConnectionChangeToastTimer = null
      }, 400)
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

.x-no-select {
  user-select: none !important;
  -webkit-user-select: none !important; /* Safari, Chrome */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* Edge */
  -webkit-touch-callout: none;
}

.x-toast-tab {
  text-transform: none;
  letter-spacing: initial;
  min-width: 64px !important;
}
</style>
