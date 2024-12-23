<template>
  <g
    :stroke-width="active ? px / 2 : 0"
    :class="{
      'x-dark': dark,
      'x-active': active
    }">
    <circle
      v-if="type === JackType.Audio || type === JackType.Headphones || type === JackType.CPort || type === JackType.Midi || star || progress"
      :r="sizeH"
      :cx="sizeH + x"
      :cy="sizeH + y" />
    <rect
      v-else-if="type === JackType.Stomp"
      :width="size"
      :height="size"
      :x="x"
      :y="y" />
    <g
      v-if="(type === JackType.Midi) && active"
      class="x-pins">
      <!-- Pin 1: Leftmost -->
      <circle
        :r="sizeD * 0.1"
        :cx="x + sizeH - sizeD * 0.7"
        :cy="y + sizeH - sizeD * 0.15" />
      <!-- Pin 2: Center-Left -->
      <circle
        :r="sizeD * 0.1"
        :cx="x + sizeH - sizeD * 0.43"
        :cy="y + sizeH - sizeD * 0.55" />
      <!-- Pin 3: Center -->
      <circle
        :r="sizeD * 0.1"
        :cx="x + sizeH"
        :cy="y + sizeH - sizeD * 0.7" />
      <!-- Pin 4: Center-Right -->
      <circle
        :r="sizeD * 0.1"
        :cx="x + sizeH + sizeD * 0.43"
        :cy="y + sizeH - sizeD * 0.55" />
      <!-- Pin 5: Rightmost -->
      <circle
        :r="sizeD * 0.1"
        :cx="x + sizeH + sizeD * 0.7"
        :cy="y + sizeH - sizeD * 0.15" />
    </g>

    <!--    :style="{ fill: progress >= 100 ? RGBColors.Red : null }"-->
    <text
      v-if="(text?.length === 1) && active && !'LR123C%X4H'.includes(text)"
      :stroke-width="0"
      :transform="`translate(${x + sizeH},${y + sizeH})`"
      text-anchor="middle"
      :font-size="size * (progress ? .6 : .7)"
      dominant-baseline="central">
      {{ text }}
    </text>

    <g :transform="`translate(${x},${y})`">
      <path
        v-if="text && active"
        class="x-text"
        stroke-linecap="round"
        stroke-linejoin="miter"
        shape-rendering="geometricPrecision"
        :stroke-width="active ? 1.25 * px : 0"
        :transform="`scale(${size / 28}) translate(2,1.9)`"
        :d="getGeometricChar(text)"
        fill="none"
        stroke="black" />
    </g>

    <path
      v-if="star"
      fill="#fff"
      :transform="`translate(${[x + sizeH, y + sizeH]})`"
      :d="generateStarPath(sizeH * .65)" />

    <template v-if="active && !star && (type !== null)">
      <template v-if="location === JackLocation.Side">
        <line
          :x1="x + size"
          :y1="y + sizeH"
          :x2="x + size + sizeP * 2"
          :y2="y + sizeH" />
        <template v-if="input">
          <line
            :x1="x + size"
            :y1="y + sizeH"
            :x2="x + size + sizeP"
            :y2="y + sizeH + sizeP" />
          <line
            :x1="x + size"
            :y1="y + sizeH"
            :x2="x + size + sizeP"
            :y2="y + sizeH - sizeP" />
        </template>
        <template v-else>
          <line
            :x1="x + size + sizeP * 2"
            :y1="y + sizeH"
            :x2="x + size + sizeP"
            :y2="y + sizeH + sizeP" />
          <line
            :x1="x + size + sizeP * 2"
            :y1="y + sizeH"
            :x2="x + size + sizeP"
            :y2="y + sizeH - sizeP" />
        </template>
      </template>
      <template v-else>
        <line
          :x1="x + sizeH"
          :y1="y + size"
          :x2="x + sizeH"
          :y2="y + size + sizeP * 2" />
        <template v-if="input">
          <line
            :x1="x + sizeH"
            :y1="y + size"
            :x2="x + sizeH - sizeP"
            :y2="y + size + sizeP" />
          <line
            :x1="x + sizeH"
            :y1="y + size"
            :x2="x + sizeH + sizeP"
            :y2="y + size + sizeP" />
        </template>
        <template v-else>
          <line
            :x1="x + sizeH"
            :y1="y + size + sizeP * 2"
            :x2="x + sizeH - sizeP"
            :y2="y + size + sizeP" />
          <line
            :x1="x + sizeH"
            :y1="y + size + sizeP * 2"
            :x2="x + sizeH + sizeP"
            :y2="y + size + sizeP" />
        </template>
      </template>
    </template>

    <!--    :style="{ stroke: progress >= 100 ? RGBColors.Red : null }"-->
    <path
      v-if="progress"
      shape-rendering="geometricPrecision"
      color-rendering="optimizeQuality"
      color-interpolation="sRGB"
      :d="describeArc(sizeH + x, sizeH + y, sizeH + px, 0, (Math.min(progress, 100) / 100) * 360)"
      fill="none"
      class="x-progress"
      :stroke-width="3 * px" />
  </g>
</template>

<script lang="js">
import { JackLocation, JackType } from '../../lib/index.ts'
import { generateStarPath } from '@/utils/svg-star.js'
import { describeArc } from '@/utils/svg-arc.js'
import { getGeometricChar } from '@/utils/svg-symbols.js'

export default {
  props: {
    size: {
      type: Number,
      default: 16
    },
    type: {
      type: Number,
      default: null
    },
    location: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    input: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    },
    position: {
      type: Array,
      default: () => [0, 0]
    },
    px: {
      type: Number,
      default: 0
    },
    star :{
      type: Boolean
    },
    progress :{
      type: Number,
      default: null
    }
  },
  computed: {
    JackLocation () {
      return JackLocation
    },
    JackType () {
      return JackType
    },
    sizeH () {
      return this.size / 2
    },
    sizeP () {
      return this.size / 5
    },
    sizeD () {
      return this.size / 2.5
    },
    x () {
      return this.position[0]
    },
    y () {
      return this.position[1]
    }
  },
  methods: { getGeometricChar, describeArc, generateStarPath }
}
</script>

<style scoped lang="scss">
circle, rect, path {
  fill: rgba(128,128,128,.25);
}

text {
  user-select: none;
}

.x-active {
  .x-text {
    stroke: #000;
    stroke-opacity: .87;
  }

  line {
    stroke: #000;
  }

  circle, rect, path {
    fill: #fff;
    fill-opacity: .15;
    stroke: #000;
  }

  text {
    fill: #888;
    font-weight: lighter;
  }

  path.x-progress {
    stroke: #888;
    fill: none;
  }
}

.x-dark {
  circle, rect, path {
    fill: rgba(128,128,128,.25);
  }
}

.x-active.x-dark {
  .x-text {
    stroke: #fff;
    stroke-opacity: .87;
  }

  line {
    stroke: #fff;
  }

  circle, rect, path {
    fill: #000;
    fill-opacity: .15;
    stroke: #fff;
  }

  text {
    fill: #999;
  }

  path.x-progress {
    stroke: #ccc;
    fill: none;
  }
}
</style>
