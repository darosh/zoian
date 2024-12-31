<template>
  <svg
    ref="svg"
    :viewBox="`0 0 ${w} ${h}`"
    :class="{
      'x-dark': dark
    }"
    :style="$attrs.style"
    style="width: calc(100vw)"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @mousemove="onMouseMove"
    @mouseout="onMouseOut">

    <!-- gridPosOrEuro test -->
    <template v-if="false">
      <rect
        fill="red"
        :transform="`translate(${gridPosOrEuro({x:0,y:0,page: -1})})`"
        :width="moduleM"
        :height="moduleM" />
      <rect
        fill="red"
        :transform="`translate(${gridPosOrEuro({x:0,y:0,page: -2})})`"
        :width="moduleM"
        :height="moduleM" />
      <rect
        fill="red"
        :transform="`translate(${gridPosOrEuro({x:0,y:0,page: 0})})`"
        :width="moduleM"
        :height="moduleM" />
    </template>

    <!-- file name and number -->
    <text
      :transform="`translate(${[w - margin, margin + moduleS * .8]})`"
      :font-size="moduleFileName"
      text-anchor="end"
      dominant-baseline="hanging">
      <tspan
        v-if="Number.isInteger(patchNumber) && (patchNumber >= 0)"
        dominant-baseline="hanging"
        class="g-bold"
        fill-opacity=".67">{{ patchNumber }}.
      </tspan>
      <tspan
        dominant-baseline="hanging"
        :dx="moduleSD"
        fill-opacity=".6"
        :style="{
          fill: error ? 'red' : null
        }">{{ patchFile }}{{ (error ? ' !!!' : '') }}
      </tspan>
    </text>

    <template v-if="patch">
      <!-- patch name  -->
      <text
        :transform="`translate(${[w - margin, margin]})`"
        :font-size="modulePatchName"
        text-anchor="end"
        class="x-text-large"
        dominant-baseline="hanging">{{ patch?.modules?.length ? patch.name : '&lt;empty patch&gt;' }}
      </text>

      <!-- page names -->
      <g
        v-for="(page, pageIndex) of patch.pages"
        :key="pageIndex"
        :transform="`translate(${pagePos(pageIndex)})`">
        <text
          :dy="-marginHH"
          :font-size="marginH"
          :fill-opacity="page.index === -1 ? .3 : .67"
          alignment-baseline="baseline">
          <template v-if="page.index > -1">{{ page.index }}. {{ page.name }}</template>
          <template v-else>Euroburo</template>
        </text>
      </g>

      <!-- io -->
      <template
        v-for="(iog, iogIndex) of patch?.modules?.length ? ioGrid : []"
        :key="iogIndex">
        <x-svg-symbol
          :type="iog.jackView.spec.type"
          :text="iog?.jackView.spec?.text?.[0]"
          :location="0"
          :input="iog.jackView.spec.input"
          :px="px"
          :dark="dark"
          :size="moduleE"
          :active="iog.jackView.jack.active"
          :position="gridPosOrEuro(iog)" />
      </template>

      <x-svg-symbol
        v-if="patch?.modules?.length"
        :location="0"
        text="%"
        :px="px"
        :dark="dark"
        :size="moduleE"
        :progress="cpuTable.sum"
        :active="true"
        :position="gridPosEuro({x: 0, y: 0, page: -2}, true)" />

      <x-svg-symbol
        v-if="grid?.view?.connectionTable?.total"
        :text="grid?.view?.connectionTable?.counts?.missing || grid?.view?.connectionTable?.counts?.mixed || grid?.view?.connectionTable?.counts?.unknown ? 'CONNECTION_ERROR' : 'CONNECTION'"
        :location="0"
        :px="px"
        :dark="dark"
        :size="moduleE"
        :active="true"
        :position="gridPosEuro({x: 1, y: 0, page: -2}, true)" />

      <x-svg-symbol
        v-if="patch?.starred?.length"
        :star="!grid.view.starredTable?.error"
        :text="grid.view.starredTable?.error ? 'ERROR' : null"
        :location="0"
        :px="px"
        :dark="dark"
        :size="moduleE"
        :active="!!patch?.starred?.length"
        :position="gridPosEuro({x: 2, y: 0, page: -2}, true)" />

      <!-- euro -->
      <template v-if="euroMode">
        <template
          v-for="(zg, zgIndex) of showEuro"
          :key="zgIndex">
          <template v-if="zg">
            <circle
              v-if="(zg.type === JackType.Button) && !zg.blockView"
              fill="rgba(128,128,128,.3)"
              :cx="moduleEH"
              :cy="moduleEH"
              :r="moduleEHH"
              :transform="`translate(${gridPosEuro(zg)})`" />
            <rect
              v-else-if="(zg.type === JackType.Button) && zg.blockView"
              :stroke-width="px"
              :fill="dark ? zg.colors.dark : zg.colors.light"
              :rx="moduleER"
              :ry="moduleER"
              :width="moduleE"
              :height="moduleE"
              :y="0"
              :transform="`translate(${gridPosEuro(zg)})`" />
            <x-svg-symbol
              v-else-if="zg.type"
              :type="zg.type"
              :input="zg.jackView.spec.input"
              :position="gridPosEuro(zg)"
              :location="zg.jackView.spec.side || 0"
              :active="zg.jackView.jack.active"
              :px="px"
              :dark="dark"
              :size="moduleE"
              :text="zg.jackView.spec.text === 'H' ? 'HEADPHONES' : zg.jackView.spec.text" />
          </template>
        </template>
      </template>

      <!-- helper grid -->
      <template v-if="false">
        <line
          v-for="y of 5"
          :key="y"
          stroke="#bbf"
          :transform="`translate(${gridPos({x: 0, y: y - 1, page: 0})})`"
          stroke-width=".5"
          :x1="0"
          :y1="0"
          :x2="gridPos({x: 7, y: 0, page: 0})[0]"
          :y2="0" />
        <line
          v-for="x of 8"
          :key="x"
          stroke="#bbf"
          :transform="`translate(${gridPos({x: x, y: 0, page: 0})}) translate(${-moduleM},0)`"
          stroke-width=".5"
          :x1="0"
          :y1="0"
          :y2="(moduleS + moduleM) * 5 - moduleM"
          :x2="0" />
        <line
          v-for="x of 8"
          :key="x"
          stroke="#bbf"
          :transform="`translate(${gridPos({x: x - 1, y: 0, page: 0})})`"
          stroke-width=".5"
          :x1="0"
          :y1="0"
          :y2="(moduleS + moduleM) * 5 - moduleM"
          :x2="0" />
      </template>

      <!--
      More correct would be:
      :width="moduleS + ((sg.x > 0) && (sg.x < 7)) * moduleM + (sg.x === 7 || sg.x === 0) * (moduleMH) - sg.forcedLast * moduleMH"

      But I like it as it is

      I would even add some torn like side shape
      to make the overlapped modules more pronounced
      -->

      <!--          <path-->
      <!--            v-if="sg.forcedLast && !(sg.first || sg.last)"-->
      <!--            :d="rectPath({broken: true, left: false, right: false, size: { width: moduleS + ((sg.x > 0 || sg.first) && (sg.x < 7 || sg.last) && !sg.forcedLast) * moduleMH + moduleMH, height: moduleS}, radius: 0})"-->
      <!--            :fill="dark ? sg.colors.dark : sg.colors.light"-->
      <!--            :transform="`translate(${gridPos(sg)}) translate(${(sg.x > 0) * -moduleMH},0)`" />-->
      <!--          <rect-->
      <!--            v-else-if="!(sg.first || sg.last)"-->
      <!--            :fill="dark ? sg.colors.dark : sg.colors.light"-->
      <!--            :width="moduleS + ((sg.x > 0) && (sg.x < 7)) * moduleM + (sg.x === 7 || sg.x === 0) * (moduleMH)"-->
      <!--            :height="moduleS"-->
      <!--            :x="(sg.x > 0) * -moduleMH"-->
      <!--            :y="0"-->
      <!--            :transform="`translate(${gridPos(sg)})`" />-->
      <!--          <path-->
      <!--            v-else-->
      <!--            :d="rectPath({broken: sg.forcedLast, left: sg.first, right: sg.last, size: { width: moduleS + ((sg.x > 0 || sg.first) && (sg.x < 7 || sg.last) && !sg.forcedLast) * moduleMH, height: moduleS}, radius: moduleR})"-->
      <!--            :fill="dark ? sg.colors.dark : sg.colors.light"-->
      <!--            :transform="`translate(${gridPos(sg)}) translate(${sg.last ? (sg.x > 0) * -moduleMH : 0},0)`" />-->

      <!-- grid -->
      <template
        v-for="(sg, sgIndex) of showGrid"
        :key="sgIndex">
        <template v-if="sg">
          <!-- mid block -->
          <rect
            v-if="!(sg.first || sg.last)"
            :fill="dark ? sg.colors.dark : sg.colors.light"
            :width="moduleS + ((sg.x > 0) && (sg.x < 7)) * moduleM + (sg.x === 7 || sg.x === 0) * (moduleMH)"
            :height="moduleS"
            :x="(sg.x > 0) * -moduleMH"
            :y="0"
            :transform="`translate(${gridPos(sg)})`" />
          <!-- single block -->
          <rect
            v-else-if="sg.first && sg.last"
            :fill="dark ? sg.colors.dark : sg.colors.light"
            :width="moduleS"
            :height="moduleS"
            :rx="moduleR"
            :ry="moduleR"
            :x="0"
            :y="0"
            :transform="`translate(${gridPos(sg)})`" />
          <!-- side block -->
          <path
            v-else
            :d="rectPath({left: sg.first, right: sg.last, size: { width: moduleS + ((sg.x > 0 || sg.first) && (sg.x < 7 || sg.last) && !sg.forcedLast) * moduleMH, height: moduleS}, radius: moduleR})"
            :fill="dark ? sg.colors.dark : sg.colors.light"
            :transform="`translate(${gridPos(sg)}) translate(${sg.last ? (sg.x > 0) * -moduleMH : 0},0)`" />
          <!-- block label -->
          <text
            v-if="sg.blockView.from.length || sg.blockView.to.length"
            :dy="moduleS - moduleMH"
            :dx="moduleSH"
            :fill-opacity="dark ? .87 : .6"
            text-anchor="middle"
            dominant-baseline="text-after-edge"
            :font-size="moduleF2"
            :transform="`translate(${gridPos(sg)})`">{{ sg.blockDisplay }}
          </text>
        </template>
        <rect
          v-else
          rx="8"
          ry="8"
          fill="rgba(128,128,128,.25)"
          :width="moduleS"
          :height="moduleS"
          :x="0"
          :y="0"
          :transform="`translate(${gridPosNum(sgIndex)})`" />
      </template>

      <!-- block dividers -->
      <template
        v-for="(sg, sgIndex) of showGrid"
        :key="sgIndex">
        <rect
          v-if="sg && !sg.last && (sg.x < 7) && !sg.forcedLast"
          :rx="moduleMHH"
          :ry="moduleMHH"
          class="x-block-divider"
          :width="moduleMH"
          :height="moduleSH - moduleM"
          :x="0"
          :transform="`translate(${gridPos(sg)}) translate(${moduleS + moduleMHH},${moduleSH + moduleMH})`" />
      </template>

      <!-- module name -->
      <template
        v-for="(tg, tgIndex) of showGrid"
        :key="tgIndex">
        <template v-if="tg">
          <text
            v-if="tg.first"
            :dy="moduleM"
            :dx="moduleM3Q"
            class="g-bolder"
            dominant-baseline="hanging"
            :font-size="moduleF"
            :transform="`translate(${gridPos(tg)})`">
            {{ tg.display }}
          </text>
        </template>
      </template>

      <rect
        v-if="cursorBlock && (selectedModule || showCursorBlock)"
        id="highlighted-block"
        :fill="dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.12)'"
        :rx="cursorBlockR"
        :ry="cursorBlockR"
        :style="`transform: translate3d(${cursorBlockPos[0]}px,${cursorBlockPos[1]}px, 0px);`"
        :width="(cursorBlockEuro ? moduleE : moduleS)"
        :height="(cursorBlockEuro ? moduleE : moduleS)" />

      <!-- connections -->
      <!--      <template v-if="showConnections">-->
      <g
        v-if="straightLines"
        :class="{
          'x-connection-animation': animations,
          'x-connection-selected': selectedBlockView
        }">
        <line
          v-for="c in connections"
          :key="c.id"
          :x1="c.source.x"
          :y1="c.source.y"
          :x2="c.target.x"
          :y2="c.target.y"
          :stroke-width="pxl"
          class="x-connection" />
      </g>
      <g
        v-else
        :class="{
          'x-connection-animation': animations,
          'x-connection-selected': selectedBlockView
        }">
        <path
          v-for="c in connections"
          :key="c.id"
          :d="c.d"
          :stroke-width="pxl"
          class="x-connection" />
      </g>
      <!--      </template>-->

      <!-- connected -->
      <rect
        v-for="(cb, i) of (connectedBlock || [])"
        :key="i"
        fill="none"
        :stroke="dark ? 'rgba(255,255,255,.96)' : 'rgba(0,0,0,.87)'"
        :stroke-width="moduleMH"
        :rx="(cb.type && (cb.type !== JackType.Stomp)) ? moduleEH : null"
        :ry="(cb.type && (cb.type !== JackType.Stomp)) ? moduleEH : null"
        :width="cb.euroOrIo ? moduleE : moduleS"
        :height="cb.euroOrIo ? moduleE : moduleS"
        :transform="`translate(${cb.pos})`" />

      <!-- dots -->
      <!--      <template v-if="showConnections">-->
      <g class="x-dots-source">
        <circle
          v-for="{dot, id} in connectionPosDots.sourceDots"
          :key="id"
          :cx="dot.x"
          :cy="dot.y"
          :r="3 * px" />
      </g>
      <g class="x-dots-target">
        <circle
          v-for="{dot, id} in connectionPosDots.targetDots"
          :key="id"
          :cx="dot.x"
          :cy="dot.y"
          :stroke-width="px"
          :r="3 * px" />
      </g>
      <!--      </template>-->

    </template>

    <!-- cursor helper -->
    <g
      v-if="showCursor && cursor"
      :transform="`translate(${cursor})`">
      <circle
        id="highlighted-cursor"
        :r="moduleMH"
        cx="0"
        cy="0" />
    </g>
  </svg>

  <v-card
    v-show="positionTooltip && !hideTooltip"
    ref="tooltip"
    class="x-no-select"
    style="transform: translate3d(0,0,0); position: absolute;"
    :style="{
      left: `${positionTooltip?.x || 0}px`,
      top: `${positionTooltip?.y || 0}px`,
      opacity: selectedModule ? 1 : 0,
      transition: transitionTooltip ? `left 100ms ease-out, top 100ms ease-out, opacity 100ms ease-out` : 'opacity 100ms ease-out'
    }"
    elevation="1">
    <template v-if="selectedModule?.starred">
      <v-table
        density="compact"
        class="my-1">
        <thead style="opacity: .75">
          <tr>
            <td class="pl-5">
              Starred
            </td>
            <td class="text-right">
              Page
            </td>
            <td class="pr-5 text-right">
              CC
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(s, sIndex) of starred"
            :key="sIndex">
            <td class="pl-5">
              <template v-if="s?.module?.name">
                <b class="g-bolder">{{ s.module.name }}</b>: {{ s.module.type }}
              </template>
              <template v-else>
                {{ s?.module?.type ?? 'ERROR' }}
              </template>
            </td>
            <td class="text-right">
              {{ s?.module?.page }}
            </td>
            <td class="pr-5 text-right">
              {{ s.cc }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
    <template v-else-if="selectedModule?.cpu">
      <div
        style="min-width: 160px;">
        <v-table
          density="compact"
          class="my-2">
          <thead style="opacity: .75">
            <tr>
              <td>CPU usage</td>
              <td class="pr-0">
                Pages
              </td>
              <td
                colspan="2"
                class="pr-5 text-right">
                <b>{{ cpuTable.sum }}%</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="({ type, cpu, count, pagesDisplay, cpuSum }, cpuIndex) of cpuTable.rows"
              :key="cpuIndex">
              <td class="g-bolder">
                {{ type }}
              </td>
              <td class="pr-0">
                {{ pagesDisplay }}
              </td>
              <td class="text-right pr-0">
                <template v-if="count > 1">
                  {{ count }} <span style="opacity: .6;">&times;</span> {{ cpu }} <span style="opacity: .6;">=</span>
                </template>
              </td>
              <td class="text-right pl-1 pr-5">
                {{ cpuSum }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>
    <template v-else-if="selectedModule?.connection">
      <v-table
        density="compact"
        class="my-1">
        <thead style="opacity: .75">
          <tr>
            <td class="pl-5">
              Connections
            </td>
            <td class="pr-5 text-right g-bold">
              {{ grid.view.connectionTable.total }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cr, sIndex) of grid.view.connectionTable.rows"
            :key="sIndex">
            <td class="pl-5 g-bolder">
              {{ ConnectionType[cr.type] }}
            </td>
            <td class="pr-5 text-right">
              {{ cr.count }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
    <template v-else-if="selectedModule?.jackView">
      <div
        class="px-4 pt-2 pb-2"
        :class="selectedModule.jackView.from.length || selectedModule.jackView.to.length ? 'x-pb-2-5' : 'pb-2'"
        style="min-width: 160px;">
        <span class="g-bolder">{{ selectedModule.jackView.spec.title }}</span>
        <!--        <pre>{{ inspect(selectedModule.jackView) }}</pre>-->
        <template v-if="selectedModule.jackView.to.length">
          <br><small>outgoing: <b>{{ selectedModule.jackView.to.length }}</b></small>
        </template>
        <template v-if="selectedModule.jackView.from.length">
          <br><small>incoming: <b>{{ selectedModule.jackView.from.length }}</b></small>
        </template>
      </div>
      <div v-if="selectedModule.jackView.jack.active && (selectedModule.jackView.spec.type === JackType.Midi)">
        <v-divider class="mt-1" />
        <v-table
          density="compact"
          class="my-1">
          <thead style="opacity: .75">
            <tr>
              <td class="pl-5">
                Module
              </td>
              <td class="text-right">
                Page
              </td>
              <td class="pr-5 text-right">
                Channel
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(md, mdIndex) of (selectedModule.jackView.spec.input ? grid.view.midiTable.input : grid.view.midiTable.output)"
              :key="mdIndex">
              <td class="pl-5">
                <template v-if="md?.module?.name">
                  <b class="g-bolder">{{ md.module.name }}</b>: {{ md.module.type }}
                </template>
                <b
                  v-else
                  class="g-bolder">{{ md.module.type }}</b>
              </td>
              <td class="text-right">
                {{ md.module.page }}
              </td>
              <td class="text-right pr-5">
                {{ md.channel }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>
    <template v-else-if="selectedModule">
      <div
        v-if="tips && (selectedModule.first || selectedModule.pos === 'euro')"
        class="font-italic px-4 pt-3"
        style="max-width: 360px; font-size: 15px; opacity: .78; margin-right: 3px;">
        {{ TIPS[selectedModule.blockView.moduleView.module.id] }}
      </div>
      <v-divider
        v-if="tips && (selectedModule.first || selectedModule.pos === 'euro')"
        class="mt-3" />
      <div
        class="px-4"
        :class="{
          'pt-2': tips && selectedModule.first,
          'pt-3': !(tips && selectedModule.first),
          'x-pb-2-5': selectedModule.blockTitle,
          'pb-3': !selectedModule.blockTitle
        }"
        style="min-width: 160px;">
        <span class="g-bolder">{{ selectedModule.blockView.moduleView.module.type }}</span><span
          v-if="selectedModule.blockView.moduleView.module.name">: {{
          selectedModule.blockView.moduleView.module.name
        }}</span>
        <template v-if="selectedModule.blockTitle">
          <br>
          <small><span class="g-bold">{{ selectedModule.blockTitle }}</span> <span
            v-if="selectedModule.blockDisplay && (selectedModule.blockDisplay !== selectedModule.blockTitle)"
            style="opacity: .87">&ensp;[&thinsp;{{ selectedModule.blockDisplay }}&thinsp;]</span></small>
        </template>
      </div>
      <v-table
        v-if="selectedConnections?.current?.length || selectedConnections?.hidden?.length"
        style="font-size: 80%;"
        density="compact"
        class="mb-2">
        <tbody>
          <tr
            v-for="(r, rIndex) in selectedConnections.current"
            :key="rIndex">
            <td class="pl-5 pr-2" />
            <td
              class="px-2"
              style="font-size: 24px; opacity: .8">
              {{ r.hidden ? (!r.from ? '⇠' : '⇢') : (!r.from ? '←' : '→') }}
            </td>
            <td class="px-2">
              {{ r.module }}
            </td>
            <td class="px-2">
              {{ r.block }}
            </td>
            <td class="text-right px-2">
              {{ r.db }}&thinsp;dB
            </td>
            <td class="text-right pl-2 pr-5">
              {{ r.percent }}&thinsp;%
            </td>
          </tr>
          <template v-if="selectedConnections.hidden">
            <tr
              v-for="(r, rIndex) in selectedConnections.hidden"
              :key="rIndex">
              <td class="pl-5 pr-2">
                {{ r.name }}
              </td>
              <td
                class="px-2"
                style="font-size: 24px; opacity: .8">
                {{ !r.from ? '⇠' : '⇢' }}
              </td>
              <td class="px-2">
                {{ r.module }}
              </td>
              <td class="px-2">
                {{ r.block }}
              </td>
              <td class="text-right px-2">
                {{ r.db }}&thinsp;dB
              </td>
              <td class="text-right pl-2 pr-5">
                {{ r.percent }}&thinsp;%
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </template>
  </v-card>
</template>
<script lang="js">
import debug from 'debug'

import { toRaw } from 'vue'
import { equals } from 'rambdax'
import { inspect } from 'util'
import { svgRect } from '@/utils/svg-rect.js'
import { getTooltipPosition } from '@/utils/tooltip.js'
import {
  G,
  EURO_X,
  TIPS,
  JackType,
  ConnectionType,
  getPagePosition,
  getView,
  getGrid,
  getConnectedPos,
  getConnectedPosEuro,
  getCablePath,
  getPointsSides
} from '../../lib/index.ts'

const log = debug('zoian:svg')

export default {
  props: {
    colsMax: {
      type: Number,
      default: 4
    },
    margin: {
      type: Number,
      default: 24
    },
    moduleS: {
      type: Number,
      default: 24
    },
    moduleF: {
      type: Number,
      default: 8
    },
    moduleF2: {
      type: Number,
      default: 7
    },
    moduleR: {
      type: Number,
      default: 6
    },
    moduleER: {
      type: Number,
      default: 2
    },
    moduleM: {
      type: Number,
      default: 4
    },
    gridX: {
      type: Number,
      default: 8
    },
    gridY: {
      type: Number,
      default: 5
    },
    euro: {
      type: Boolean,
      default: false
    },
    tips: {
      type: Boolean,
      default: false
    },
    patch: {
      type: Object,
      default: null
    },
    patchFile: {
      type: String,
      default: null
    },
    patchNumber: {
      type: Number,
      default: null
    },
    showConnections: {
      type: Boolean,
      default: false
    },
    animations: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    cursor: null,
    cursorBlock: null,
    transitionTooltip: false,
    hideTooltip: false,
    showCursor: false,
    showCursorBlock: false,
    scrollY: window.scrollY,
    pendingScroll: false,
    pendingMove: false,
    observer: null,
    tipWidth: 0,
    tipHeight: 0,
    connectedBlock: null,
    straightLines: false,
    selectedConnections: null,
    touchStartTimer: null
  }),
  computed: {
    ConnectionType () {
      return ConnectionType
    },
    JackType () {
      return JackType
    },
    TIPS () {
      return TIPS
    },
    pages () {
      return this?.patch?.pages?.length || 1
    },
    cols () {
      const c = this.pages > this.colsMax ? this.colsMax : this.pages
      return Math.max(c, 2)
      // return this.colsMax
    },
    rows () {
      return Math.ceil(this.pages / this.cols)
    },
    pageX () {
      return this.gridX * this.moduleS + (this.gridX - 1) * this.moduleM
    },
    pageY () {
      return this.gridY * this.moduleS + (this.gridY - 1) * this.moduleM
    },
    w () {
      return this.cols * (this.pageX + this.margin) + this.margin
    },
    h () {
      return this.rows * (this.pageY + this.margin) + this.margin + this.offsetTop
    },
    offsetTop () {
      return this.moduleS * 2 + this.moduleM
    },
    px () {
      return this.round(this.w / this.$vuetify.display.width)
    },
    pxl () {
      return this.selectedBlockView ? this.px * 2 : this.px * 2
    },
    moduleSH () {
      return this.moduleS / 2
    },
    moduleMH () {
      return this.moduleM / 2
    },
    moduleMHH () {
      return this.moduleM / 4
    },
    moduleM3Q () {
      return this.moduleM / 4 * 3
    },
    moduleE () {
      return this.round((this.moduleS + this.moduleM) * 8 / EURO_X - this.moduleM)
    },
    moduleEH () {
      return this.moduleE / 2
    },
    moduleEHH () {
      return this.moduleE / 4
    },
    moduleSD () {
      return this.round(this.moduleS / 12)
    },
    moduleFileName () {
      return this.round(this.moduleS * .4)
    },
    modulePatchName () {
      return this.round(this.moduleS * .7)
    },
    marginH () {
      return this.margin / 2
    },
    marginHH () {
      return this.margin / 4
    },
    scale () {
      return this.$vuetify.display.width / this.w
    },
    bounding () {
      return {
        left: 0,
        top: -this.scrollY,
        width: this.w * this.scale,
        height: this.h * this.scale
      }
    },
    euroMode () {
      return this.euro && this?.patch?.euro
    },
    grid () {
      const view = getGrid(getView(this.patch))

      log('grid', toRaw(view))

      return view
    },
    showGrid () {
      return !this.euroMode
        ? this.grid.pagesGrid
        : this.grid.pagesGrid.slice(40)
    },
    showEuro () {
      return this.grid.euroGrid
    },
    ioGrid () {
      return this.grid.ioGrid
    },
    cpuTable () {
      return this.grid.view.cpuTable
    },
    starred () {
      return this.grid.view.starredTable
    },
    cursorBlockPos () {
      return this.gridPosOrEuro(this.cursorBlock)
    },
    cursorBlockEuro () {
      return this.euroOrIo(this.cursorBlock)
    },
    cursorBlockR () {
      if (!this.cursorBlockEuro) {
        return this.moduleR
      }

      if (!this.selectedModule?.blockView
        && ![JackType.Button, JackType.Stomp].includes(this.selectedModule?.jackView?.spec?.type)) {
        return this.moduleEH
      }

      return this.moduleER
    },
    selectedBlockView () {
      return this.selectedModule?.blockView || this.selectedModule?.jackView
    },
    selectedModule () {
      if (!this.patch || !this.cursorBlock) {
        return null
      }

      const { x, y, page } = this.cursorBlock

      if (this.euroMode && page === 0) {
        const m = this.showEuro.find(z => z.x === x && z.y === y)

        if (m.blockView || m.jackView) {
          return m
        }

        return null
      } else if (page === -1) {
        return this.ioGrid[x] || null
      } else if (page === -2 && x === 2 && y === 0) {
        if (this.patch.starred.length) {
          return { starred: true }
        } else {
          return null
        }
      } else if (page === -2 && x === 0 && y === 0) {
        return { cpu: true }
      } else if (page === -2 && x === 1 && y === 0) {
        return { connection: true }
      }

      return this.showGrid.find(g => g?.page === page && g?.x === x && g?.y === y) || null
    },
    positionTooltip () {
      if (!this.cursorBlock) {
        return null
      }

      const [blockX, blockY] = this.gridPosOrEuro(this.cursorBlock)
      const z = this.euroOrIo(this.cursorBlock)

      const { x, y } = getTooltipPosition(
        {
          x: blockX,
          y: blockY,
          width: z ? this.moduleE : this.moduleS,
          height: z ? this.moduleE : this.moduleS
        },
        this.tipWidth / this.scale,
        this.tipHeight / this.scale,
        this.w,
        this.h,
        this.scale,
        this.$refs.svg
      )

      return { x: x * this.scale, y: y * this.scale }
    },
    connectionPos () {
      return this.euroMode ? this.grid.connectionsEuro : this.grid.connections
    },
    connectionPosCenters () {
      return this.connectionPos.map(([source, target], id) => {
        const sh = this.euroOrIo(source) ? this.moduleEH : this.moduleSH
        const th = this.euroOrIo(target) ? this.moduleEH : this.moduleSH
        const from = this.gridPosOrEuro(source)
        const to = this.gridPosOrEuro(target)

        return {
          source: { x: from[0] + sh, y: from[1] + sh },
          target: { x: to[0] += th, y: to[1] += th },
          sourcePos: source,
          targetPos: target,
          sh,
          th,
          id
        }
      })
    },
    connectionPosDots () {
      const sides = getPointsSides(this.connectionPosCenters, this.moduleEH, this.moduleSH)
      log('side', toRaw(sides))

      let all = [
        ...sides.io,
        ...sides.euro,
        ...sides.block
      ]
        .filter(Boolean)
        .map((x, id) => ({ pos: x.pos, dot: x.dot, isSource: x.isSource, id }))

      let lines = this.connectionPosCenters

      if (this.selectedBlockView) {
        lines = lines
          .filter(l => ((l.sourcePos.blockView || l.sourcePos.jackView) === this.selectedBlockView)
            || ((l.targetPos.blockView || l.targetPos.jackView) === this.selectedBlockView)
          )

        if (!this.showConnections) {
          const inc = []

          for (const l of lines) {
            inc.push(l.sourcePos, l.targetPos)
          }

          all = all.filter(x => inc.includes(x.pos))
        }
      } else if (!this.showConnections) {
        lines = []
        all = []
      }

      lines = lines.map((p) => {
        const source = sides[p.sourcePos.pos][p.sourcePos.index].dot
        const target = sides[p.targetPos.pos][p.targetPos.index].dot

        return {
          id: p.id,
          source,
          target
        }
      })

      return {
        lines,
        sourceDots: all.filter(x => x.isSource),
        targetDots: all.filter(x => !x.isSource)
      }
    },
    connectionPosDotsCurves () {
      return this.connectionPosDots.lines.map((s) => {
        return {
          ...s,
          d: getCablePath(s.source, s.target)
        }
      })
    },
    connections () {
      if (this.straightLines) {
        return this.connectionPosDots.lines
      }

      return this.connectionPosDotsCurves
    }
  },
  watch: {
    patch () {
      if (this.cursorBlock?.page === -2) {
        return
      }

      this.cursor = null
      this.cursorBlock = null
      this.connectedBlock = null
    },
    selectedModule (newVal, oldVal) {
      this.transitionTooltip = newVal && oldVal
      log('selected block', toRaw(newVal))

      if (!newVal || newVal.cpu || newVal.starred || newVal.connection) {
        // this.connectedBlock = null
        this.selectedConnections = null
        return
      }

      if (!newVal.blockView && !newVal.jackView) {
        this.connectedBlock = null
        this.selectedConnections = null
        log('missing block view', newVal)
        return
      }

      this.recalcConnectedBlock()
    },
    euro () {
      if (this.selectedModule) {
        this.recalcConnectedBlock()
      } else {
        this.connectedBlock = null
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)

    this.observer = new ResizeObserver((entries) => {
      this.tipWidth = entries[0].contentRect.width
      this.tipHeight = entries[0].contentRect.height
    })

    this.observer.observe(this.$refs.tooltip.$el)
  },
  beforeUnmount () {
    this.observer.unobserve(this.$refs?.tooltip?.$el)
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    inspect: inspect,
    rectPath: svgRect,
    round (x) {
      return Math.round(x * 100) / 100
    },
    pagePos (pageIndex) {
      // IO
      if (pageIndex === -1) {
        return [
          this.margin,
          this.margin
        ]
      } else if (pageIndex === -2) {
        return [
          (this.pageX + this.margin) + this.margin,
          this.margin
        ]
      }

      const x = pageIndex % this.cols
      const y = (pageIndex - x) / this.cols

      return [
        x * (this.pageX + this.margin) + this.margin,
        y * (this.pageY + this.margin) + this.margin + this.offsetTop
      ]
    },
    gridPos (grid) {
      const [x, y] = this.pagePos(grid.page ?? grid.module.page)

      return [
        x + grid.x * (this.moduleS + this.moduleM),
        y + grid.y * (this.moduleS + this.moduleM)
      ]
    },
    gridPosNum (gridIndex) {
      return this.gridPos(getPagePosition(gridIndex + (this.euroMode ? G : 0)))
    },
    gridPosEuro (grid) {
      const [x, y] = this.pagePos(grid.page)

      return [
        x + grid.x * (this.moduleE + this.moduleM),
        y + grid.y * (this.moduleE + this.moduleM)
      ]
    },
    gridPosOrEuro (grid) {
      return this.euroOrIo(grid)
        ? this.gridPosEuro(grid, grid.page < 0)
        : this.gridPos(grid)
    },
    euroOrIo (grid) {
      return (this.euroMode && (grid.page === 0))
        || grid.page === -1 || grid.page === -2
    },
    recalcConnectedBlock () {
      const connectedPos = this.euroMode
        ? getConnectedPosEuro(this.selectedModule.blockView || this.selectedModule.jackView, this.grid.blockMap)
        : getConnectedPos(this.selectedModule.blockView || this.selectedModule.jackView, this.grid.blockMap)

      const connectedGrid = connectedPos
        .map(g => ({
          pos: this.gridPosOrEuro(g),
          type: g?.jackView?.spec?.type,
          euroOrIo: this.euroOrIo(g)
        }))

      log('connected pos', toRaw(connectedPos))
      log('connected grids', toRaw(connectedGrid))

      this.connectedBlock = connectedGrid
      this.selectedConnections = this.grid.getConnected(this.selectedModule)
    },
    // First, convert SVG coordinates to page coordinates
    svgToPage (x, y) {
      // Remove margin and offsetTop to get relative position
      const adjustedX = x - this.margin
      const adjustedY = y - this.margin - this.offsetTop

      // Calculate page position by dividing by total page width/height including margin
      const pageX = Math.floor(adjustedX / (this.pageX + this.margin))
      const pageY = Math.floor(adjustedY / (this.pageY + this.margin))

      if (pageY === -1 && pageX === 0) {
        return -1
      }

      if (pageY === -1 && pageX === 1) {
        return -2
      }

      // Ensure we're within bounds
      if (pageX < 0 || pageY < 0 || pageX >= this.cols) {
        return null
      }

      return pageY * this.cols + pageX
    },
    // Then convert SVG coordinates to grid coordinates within a page
    svgToGrid (x, y) {
      // First find which page we're in
      const pageIndex = this.svgToPage(x, y)

      if (pageIndex === null) {
        return null
      }

      // Get the page's top-left position
      const [pageX, pageY] = this.pagePos(pageIndex)

      // Calculate position relative to page origin
      const relativeX = x - pageX
      const relativeY = y - pageY

      const z = this.euroOrIo({ page: pageIndex })
      const div = z ? (this.moduleE + this.moduleM) : (this.moduleS + this.moduleM)
      const X = z ? 12 : 8
      const Y = z ? 7 : 5

      // Convert to grid coordinates by dividing by module size + spacing
      const gridX = Math.floor(relativeX / div)
      const gridY = Math.floor(relativeY / div)

      if (pageIndex === -2 && gridY === -2) {
        return {
          page: pageIndex,
          x: gridX - 26,
          y: 0
        }
      }

      // Check if within bounds
      if (gridX < 0 || gridX >= X || gridY < 0 || gridY >= Y) {
        return null
      }

      if (pageIndex === -1 && gridY !== 0) {
        return null
      }

      return {
        page: pageIndex,
        x: gridX,
        y: gridY
      }
    },
    getEventPosition (event) {
      // Get the SVG element's bounding rectangle
      // rect = rect || event.currentTarget.getBoundingClientRect()
      const rect = this.bounding

      // Calculate the scale ratio between viewBox and actual SVG size
      const scaleX = this.w / rect.width  // w is your viewBox width
      const scaleY = this.h / rect.height // h is your viewBox height

      // Get mouse position relative to SVG element
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Convert to viewBox coordinates
      const viewBoxX = mouseX * scaleX
      const viewBoxY = mouseY * scaleY

      // viewBoxX and viewBoxY are now in viewBox coordinate space
      return [viewBoxX, viewBoxY]
    },
    onScroll () {
      if (this.touchStartTimer) {
        clearTimeout(this.touchStartTimer)

        this.touchStartTimer = null
      }

      if (!this.pendingScroll) {
        this.pendingScroll = true
        requestAnimationFrame(() => {
          this.pendingScroll = false
          this.scrollY = window.scrollY
        })
      }
    },
    onTouchStart (event) {
      this.touchStartTimer = setTimeout(() => {
        this.onMouseMove({
          clientX: event.touches?.[0]?.clientX,
          clientY: event.touches?.[0]?.clientY,
          isTouch: true
        })
      }, 100)
    },
    onTouchMove () {
      if (this.touchStartTimer) {
        clearTimeout(this.touchStartTimer)

        this.touchStartTimer = null
      }
    },
    onMouseMove (event) {
      if (!this.pendingMove) {
        this.pendingMove = true

        requestAnimationFrame(() => {
          this.pendingMove = false
          const cursor = this.getEventPosition(event)
          const cursorBlock = cursor ? this.svgToGrid(...cursor) : null
          this.cursor = cursor

          if (!equals(cursorBlock, this.cursorBlock)) {
            this.cursorBlock = cursorBlock
            this.hideTooltip = false
          } else if (event.isTouch) {
            this.hideTooltip = !this.hideTooltip
          }
        })
      }
    },
    onMouseOut () {
      // this.cursor = null // breaks transition
    }
  }
}
</script>

<style scoped>
@keyframes stroke {
  from {
    stroke-dashoffset: 5;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.x-connection {
  stroke: black;
  stroke-opacity: .14;
  fill: none;
}

.x-connection-animation {
  .x-connection {
    stroke-opacity: .2;
    stroke-dasharray: 3 2;
    animation-name: stroke;
    animation-duration: .8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}

.x-connection-selected {
  .x-connection {
    stroke-opacity: .87;
  }
}

text, tspan, .x-no-select {
  pointer-events: none !important;
  touch-action: none !important;
  user-select: none !important;
  -webkit-user-select: none !important; /* Safari, Chrome */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* Edge */
  -webkit-touch-callout: none;
}

.x-text-large {
  fill-opacity: .24;
}

.x-block-divider {
  fill: #fff;
  fill-opacity: .96;
}

.x-dark {
  text {
    fill: #fff;
  }

  .x-block-divider {
    fill: #fff;
    fill-opacity: .5;
  }

  .x-connection {
    stroke: #fff;
    stroke-opacity: .2;
  }

  .x-connection-animation {
    .x-connection {
      stroke-opacity: .27;
    }
  }

  .x-connection-selected {
    .x-connection {
      stroke-opacity: .87;
    }
  }
}

.x-dots-source circle {
  fill: #000;
  fill-opacity: 1;
}

.x-dots-target circle {
  fill: #fff;
  stroke: #000;
  fill-opacity: 1;
}

.x-dark {
  .x-dots-source circle {
    fill: #fff;
  }

  .x-dots-target circle {
    fill: #000;
    stroke: #fff;
  }
}

.x-pb-2-5 {
  padding-bottom: 10px;
}
</style>
