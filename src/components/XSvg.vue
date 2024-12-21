<template>
  <svg
    ref="svg"
    :viewBox="`0 0 ${w} ${h}`"
    :class="{
      'x-dark': dark
    }"
    :style="$attrs.style"
    style="width: calc(100vw)"
    @mousemove="onMouseMove"
    @mouseout="onMouseOut">

    <rect
      v-if="cursor && cursorBlock && (selectedModule || showCursorBlock)"
      id="highlighted-block"
      fill="rgba(0,0,0,.25)"
      :x="-moduleMH"
      :rx="zebuOrIo(cursorBlock) ? 4 : 8"
      :ry="zebuOrIo(cursorBlock) ? 4 : 8"
      :y="-moduleMH"
      :transform="`translate(${gridPosOrZebu(cursorBlock)})`"
      :width="(zebuOrIo(cursorBlock) ? moduleZebu : moduleS) + moduleM"
      :height="(zebuOrIo(cursorBlock) ? moduleZebu : moduleS) + moduleM" />

    <!-- gridPosOrZebu test -->
    <template v-if="false">
      <rect
        fill="red"
        :transform="`translate(${gridPosOrZebu({x:0,y:0,page: -1})})`"
        :width="moduleM"
        :height="moduleM" />
      <rect
        fill="red"
        :transform="`translate(${gridPosOrZebu({x:0,y:0,page: -2})})`"
        :width="moduleM"
        :height="moduleM" />
      <rect
        fill="red"
        :transform="`translate(${gridPosOrZebu({x:0,y:0,page: 0})})`"
        :width="moduleM"
        :height="moduleM" />
    </template>

    <!-- file name and number -->
    <text
      :transform="`translate(${[w - margin, margin + moduleS * .8]})`"
      :font-size="moduleS * .4"
      text-anchor="end"
      dominant-baseline="hanging">
      <tspan
        v-if="Number.isInteger(patchNumber) && (patchNumber >= 0)"
        class="g-bold"
        fill-opacity=".67">{{ patchNumber }}.
      </tspan>
      <tspan
        :dx="moduleS * .1"
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
        :font-size="moduleS * .7"
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
          :dy="-margin / 4"
          :font-size="margin / 2"
          :fill-opacity="page.index === -1 ? .3 : .67"
          alignment-baseline="baseline">
          <template v-if="page.index > -1">{{ page.index }}. {{ page.name }}</template>
          <template v-else>Euroburo</template>
        </text>
      </g>

      <!-- io -->
      <template
        v-for="(iog, iogIndex) of ioGrid"
        :key="iogIndex">
        <x-svg-symbol
          v-if="patch?.modules?.length"
          :type="iog.type"
          :text="iog?.text?.[0]"
          :location="0"
          :input="iog.input"
          :px="px"
          :dark="dark"
          :size="moduleZebu"
          :active="iog.active"
          :position="gridPosOrZebu(iog)" />
      </template>

      <x-svg-symbol
        v-if="patch?.modules?.length"
        :location="0"
        :text="patch?.cpu >= 100 ? '%' : '%'"
        :px="px"
        :dark="dark"
        :size="moduleZebu"
        :progress="patch?.cpu"
        :active="true"
        :position="gridPosZebu({x: 0, y: 0, page: -2}, true)" />

      <x-svg-symbol
        v-if="patch?.starred?.length"
        star
        :location="0"
        :px="px"
        :dark="dark"
        :size="moduleZebu"
        :active="!!patch?.starred?.length"
        :position="gridPosZebu({x: 1, y: 0, page: -2}, true)" />

      <!-- zebu -->
      <template v-if="zebuMode">
        <template
          v-for="(zg, zgIndex) of showZebu"
          :key="zgIndex">
          <template v-if="zg">
            <circle
              v-if="(zg.type === JackType.Button) && !zg.module"
              fill="rgba(128,128,128,.3)"
              :cx="moduleZebuH"
              :cy="moduleZebuH"
              :r="moduleZebuH / 2"
              :transform="`translate(${gridPosZebu(zg)})`" />
            <rect
              v-else-if="(zg.type === JackType.Button) && zg.module"
              :stroke-width="px"
              :fill="RGBColors[zg.module.color]"
              rx="2"
              ry="2"
              :width="moduleZebu"
              :height="moduleZebu"
              fill-opacity=".5"
              :y="0"
              :transform="`translate(${gridPosZebu(zg)})`" />
            <x-svg-symbol
              v-else-if="zg.type"
              :type="zg.type"
              :input="zg.input"
              :position="gridPosZebu(zg)"
              :location="zg.x === 11 ? 2 : 0"
              :active="zg.active"
              :px="px"
              :dark="dark"
              :size="moduleZebu"
              :text="zg.text === 'H' ? 'HEADPHONES' : zg.text" />
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

      <!-- grid -->
      <template
        v-for="(sg, sgIndex) of showGrid"
        :key="sgIndex">
        <template v-if="sg">
          <!-- mid block -->
          <rect
            v-if="!(sg.first || sg.last)"
            :fill="RGBColors[sg.module.color]"
            :width="moduleS + ((sg.x > 0) && (sg.x < 7)) * moduleM + (sg.x === 7 || sg.x === 0) * (moduleMH)"
            :height="moduleS"
            fill-opacity=".5"
            :x="(sg.x > 0) * -moduleMH"
            :y="0"
            :transform="`translate(${gridPos(sg)})`" />
          <!-- single block -->
          <rect
            v-else-if="sg.first && sg.last"
            :fill="RGBColors[sg.module.color]"
            fill-opacity=".5"
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
            :fill="RGBColors[sg.module.color]"
            fill-opacity=".5"
            :transform="`translate(${gridPos(sg)}) translate(${sg.last ? (sg.x > 0) * -moduleMH : 0},0)`" />
          <!-- block label -->
          <text
            v-if="true"
            dy="14"
            :dx="moduleSH"
            text-anchor="middle"
            dominant-baseline="hanging"
            :font-size="margin / 3"
            :transform="`translate(${gridPos(sg)})`">{{ sg.blockName.replaceAll('_', '').slice(0, 4) }}
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
            dy="4"
            dx="3"
            class="g-bolder"
            dominant-baseline="hanging"
            :font-size="margin / 3"
            :transform="`translate(${gridPos(tg)})`">
            <!--            {{ tg.module.name ? `${tg.module.name} (${tg.module.type})` : tg.module.type }}-->
            {{ tg.display }}
          </text>
        </template>
      </template>

      <!-- connections -->
      <g
        v-if="showConnections"
        :class="{
          'x-connection-animation': animations
        }">
        <line
          v-for="(c, cIndex) in connections"
          :key="cIndex"
          :x1="c.from[0]"
          :y1="c.from[1]"
          :x2="c.to[0]"
          :y2="c.to[1]"
          stroke-width="px"
          class="x-connection" />
      </g>
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
    v-show="positionTooltip"
    ref="tooltip"
    style="position: absolute; pointer-events: none; transition: left 100ms ease-out, top 100ms ease-out, opacity 100ms ease-out;"
    :style="{
      left: `${positionTooltip?.x || cursor?.[0] || 0}px`,
      top: `${positionTooltip?.y || cursor?.[1] || 0}px`,
      opacity: selectedModule ? 1 : 0,
      // width: `${tooltipWidth}px`,
      // height: `${tooltipHeight}px`
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
              <template v-if="s.module.name">
                <b class="g-bolder">{{ s.module.name }}</b>: {{ s.module.type }}
              </template>
              <template v-else>
                {{ s.module.type }}
              </template>
            </td>
            <td class="text-right">
              {{ s.module.page }}
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
                <b>{{ patch.cpu }}%</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="({ type, cpu, count, pagesDisplay, cpuSum }, cpuIndex) of cpuTable(patch)"
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
    <template v-else-if="selectedModule?.type >= JackType.Audio">
      <div
        class="px-4 py-2"
        style="min-width: 160px;">
        <span class="g-bolder">{{ selectedModule.title }}</span>
        <!--      <pre>{{ selectedModule }}</pre>-->
      </div>
    </template>
    <template v-else-if="selectedModule">
      <div
        class="px-4 py-2"
        style="min-width: 160px;">
        <span class="g-bolder">{{ selectedModule.module.type }}</span><span
          v-if="selectedModule.module.name">: {{ selectedModule.module.name }}</span>
        <br>
        {{ selectedModule.blockName }}
        <!--      <pre>{{ selectedModule.module }}</pre>-->
      </div>
    </template>
  </v-card>
</template>
<script lang="js">
import { svgRect } from '@/utils/svg-rect.js'
import { getTooltipPosition } from '@/utils/tooltip.js'
import {
  getCpuTable,
  G,
  getPagesConnections,
  getEuroConnections,
  getStarredTable,
  getPagesGrid,
  getPagePosition,
  getIoGrid,
  JackType,
  RGBColors,
  ZEBU_X,
  getEuroGrid, getIoConnections
} from '../../lib/index.ts'

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
    moduleR: {
      type: Number,
      default: 6
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
    zebu: {
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
    showTooltip: false,
    tooltipWidth: 200,
    tooltipHeight: 200,
    showCursor: false,
    showCursorBlock: false
  }),
  computed: {
    JackType () {
      return JackType
    },
    RGBColors () {
      return RGBColors
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
    grid () {
      return getPagesGrid(this.patch)
    },
    zebuMode () {
      return this.zebu && this?.patch?.zebu
    },
    showGrid () {
      return !this.zebuMode
        ? this.grid
        : this.grid.slice(40)
    },
    showZebu () {
      return getEuroGrid(this.patch.modules)
    },
    px () {
      return Math.round(this.w / window.innerWidth * 100) / 100
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
    moduleZebu () {
      return (this.moduleS + this.moduleM) * 8 / ZEBU_X - this.moduleM
    },
    moduleZebuH () {
      return this.moduleZebu / 2
    },
    pageWidth () {
      return 7 * (this.moduleM + this.moduleS) + this.moduleS
    },
    pageHeight () {
      return 4 * (this.moduleM + this.moduleS) + this.moduleS
    },
    ioGrid () {
      return getIoGrid(this.patch.modules)
    },
    cursorBlock () {
      return this.cursor ? this.svgToGrid(...this.cursor) : null
    },
    scale () {
      return window.innerWidth / this.w
    },
    starred () {
      return getStarredTable(this.patch)
    },
    selectedModule () {
      if (!this.cursorBlock) {
        return null
      }

      const { x, y, page } = this.cursorBlock

      if (this.zebuMode && page === 0) {
        const m = this.showZebu.find(z => z.x === x && z.y === y)

        if (!m.module) {
          if (m.type >= JackType.Audio) {
            return m
          }

          return
        }

        return m
      } else if (page === -1) {
        return this.ioGrid[x]
      } else if (page === -2 && x === 1 && y === 0) {
        if (this.patch.starred.length) {
          return { starred: true }
        } else {
          return null
        }
      } else if (page === -2 && x === 0 && y === 0) {
        return { cpu: true }
      }

      return this.showGrid.find(g => g?.page === page && g?.x === x && g?.y === y)
    },
    positionTooltip () {
      if (!this.cursorBlock) {
        return null
      }

      const tt = this.$refs.tooltip.$el.getBoundingClientRect()

      const [blockX, blockY] = this.gridPosOrZebu(this.cursorBlock)
      const z = this.zebuOrIo(this.cursorBlock)

      const { x, y } = getTooltipPosition(
        {
          x: blockX,
          y: blockY,
          width: z ? this.moduleZebu : this.moduleS,
          height: z ? this.moduleZebu : this.moduleS
        },
        // this.tooltipWidth / this.scale,
        // this.tooltipHeight / this.scale,
        tt.width / this.scale,
        tt.height / this.scale,
        this.w,
        this.h,
        this.scale,
        this.$refs.svg
      )

      return { x: x * this.scale, y: y * this.scale }
    },
    ioAndBlocksConnections () {
      return [...getPagesConnections(this.patch), ...getIoConnections(this.patch)]
    },
    zebuConnections () {
      return getEuroConnections(this.patch, this.showZebu)
    },
    connections () {
      return (this.zebuMode ? [...this.ioAndBlocksConnections, ...this.zebuConnections] : this.ioAndBlocksConnections)
        // return (this.zebuMode ? [...this.ioAndBlocksConnections ] : this.ioAndBlocksConnections)
        // return (this.zebuMode ? [...this.zebuConnections ] : this.ioAndBlocksConnections)
        .map(({ source, target, connection }) => {
          const sid = source.id || this.patch.modules[connection.source[0]]?.id
          const did = target.id || this.patch.modules[connection.target[0]]?.id

          return {
            from: this.connectionPos(source, sid),
            to: this.connectionPos(target, did)
          }
        })
    }
  },
  watch: {
    patch () {
      this.cursor = null
    }
  },
  methods: {
    cpuTable: getCpuTable,
    rectPath: svgRect,
    connectionPos (point, id) {
      if (this.patch.zebu && !point.io) {
        point = { ...point }
        point.page++
      }

      let zFrom
      let fs = this.moduleSH

      if (this.zebuMode && !point.page) {
        id = id || point.id
        const g = this.showZebu.find(g => (g?.module?.id === id) || (g?.id === id))
        zFrom = this.gridPosZebu(g)
        fs = this.moduleZebuH
      }

      if (point.page === -1) {
        fs = this.moduleZebuH
      }

      const from = zFrom || (this.gridPosOrZebu(point))

      return [from[0] + fs, from[1] + fs]
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
      return this.gridPos(getPagePosition(gridIndex + (this.zebuMode ? G : 0)))
    },
    gridPosZebu (grid) {
      const [x, y] = this.pagePos(grid.page)

      return [
        x + grid.x * (this.moduleZebu + this.moduleM),
        y + grid.y * (this.moduleZebu + this.moduleM)
      ]
    },
    gridPosOrZebu (grid) {
      return this.zebuOrIo(grid)
        ? this.gridPosZebu(grid, grid.page < 0)
        : this.gridPos(grid)
    },
    zebuOrIo (grid) {
      return (this.zebuMode && (grid.page === 0))
        || grid.page === -1 || grid.page === -2
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

      const z = this.zebuOrIo({ page: pageIndex })
      const div = z ? (this.moduleZebu + this.moduleM) : (this.moduleS + this.moduleM)
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
      const svgRect = event.currentTarget.getBoundingClientRect()

      // Calculate the scale ratio between viewBox and actual SVG size
      const scaleX = this.w / svgRect.width  // w is your viewBox width
      const scaleY = this.h / svgRect.height // h is your viewBox height

      // Get mouse position relative to SVG element
      const mouseX = event.clientX - svgRect.left
      const mouseY = event.clientY - svgRect.top

      // Convert to viewBox coordinates
      const viewBoxX = mouseX * scaleX
      const viewBoxY = mouseY * scaleY

      // viewBoxX and viewBoxY are now in viewBox coordinate space
      return [viewBoxX, viewBoxY]
    },
    onMouseMove (event) {
      this.cursor = this.getEventPosition(event)
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
    stroke-dashoffset: 6;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.x-connection {
  stroke-dasharray: 2 4;
  stroke: black;
  stroke-opacity: .5;
}

.x-connection-animation {
  .x-connection {
    animation-name: stroke;
    animation-duration: .8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}

text {
  pointer-events: none;
  user-select: none;
  fill: #000;
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
  }
}
</style>
