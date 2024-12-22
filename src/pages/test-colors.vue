<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-table class="flex-shrink-1">
        <thead>
          <tr>
            <th />
            <th>
              RGB
            </th>
            <th>
              RGB <br>50%
            </th>
            <th>
              AI
            </th>
            <th>
              AI <br>50%
            </th>
            <th>
              Doc
            </th>
            <th>
              Doc <br>50%
            </th>
            <th>
              Adj.
            </th>
            <th>
              Lig.
            </th>
            <th>
              <b>Desa <br>Lig.</b>
            </th>
            <th>
              Dark
            </th>
            <th>
              <b>Desa <br>Dark</b>
            </th>
          </tr>
        </thead>
        <tbody class="x-table">
          <tr
            v-for="(c, i) of COLOR_ORDER"
            :key="i">
            <td style="padding: 0 16px !important;">
              {{ Colors[c] }}
            </td>
            <td>
              <div
                :style="{backgroundColor: RGBColors[c]}"
                class="x-c" />
            </td>
            <td>
              <div
                style="opacity: .5;"
                :style="{backgroundColor: RGBColors[c]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: ColorScales[c][400]}"
                class="x-c" />
            </td>
            <td>
              <div
                style="opacity: .5;"
                :style="{backgroundColor: ColorScales[c][400]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: DocColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                style="opacity: .5;"
                :style="{backgroundColor: DocColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: AdjustedColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: LightColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: DesaColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: DarkColors[i]}"
                class="x-c" />
            </td>
            <td>
              <div
                :style="{backgroundColor: DesaDarkColors[i]}"
                class="x-c" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>

import { defineComponent } from 'vue'
import {
  COLOR_ORDER,
  Colors,
  RGBColors,
  ColorScales,
  DocColors,
  AdjustedColors,
  LightColors,
  DesaColors,
  DarkColors,
  DesaDarkColors
} from '../../lib/index.ts'

export default defineComponent({
  computed: {
    ColorScales () {
      return ColorScales
    },
    RGBColors () {
      return RGBColors
    },
    COLOR_ORDER () {
      return COLOR_ORDER
    },
    Colors () {
      return Colors
    },
    DocColors () {
      return DocColors
    },
    LightColors () {
      return LightColors
    },
    AdjustedColors () {
      return AdjustedColors
    },
    DesaColors () {
      return DesaColors
    },
    DarkColors () {
      return DarkColors
    },
    DesaDarkColors () {
      return DesaDarkColors
    }
  }
})
</script>

<style scoped>
.x-c {
  width: 68px;
  height: 48px;
}

.x-table {
  td {
    padding: 0 !important;
  }
}
</style>
