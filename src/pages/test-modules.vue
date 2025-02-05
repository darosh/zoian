<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th>Module</th>
        <th>Category</th>
        <th>Euro</th>
        <th>Input</th>
        <th>Conditional</th>
        <th class="text-right">
          CPU
        </th>
        <th class="text-right">
          Position
        </th>
        <th>Display</th>
        <th>Block</th>
        <th>Type</th>
        <th>Param</th>
        <th>Initial</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="{m, category, description, tip, bes} of MODULES"
        :key="m.id">
        <tr>
          <td
            class="text-no-wrap g-bolder">
            {{ m.name }}
          </td>
          <td>
            {{ category }}
          </td>
          <td>
            {{ m.euro }}
          </td>
          <td>
            {{ m.in }}
          </td>
          <td>
            {{ !!m.conditions || undefined }}
          </td>
          <td
            class="text-right">
            {{ m.cpu }}
          </td>
          <td class="text-right">
            {{ bes[0][1].position }}.
          </td>
          <td>{{ DISPLAY_BLOCK[bes[0][0]] }}</td>
          <td class="g-bold">
            {{ bes[0][0] }}
          </td>
          <td>{{ bes[0][2] }}</td>
          <!--          <td>{{ bes[0][1].param }}</td>-->
          <td>
            {{ bes[0][3] }}
          </td>
          <td>{{ bes[0][1].initial }}</td>
        </tr>
        <tr v-if="bes.slice(1).length === 0">
          <td
            class="pt-2 pl-8 pb-2"
            style="vertical-align: top"
            colspan="2">
            {{ tip }}
            <v-divider class="my-2" />
            {{ description || '[UNDEFINED]' }}
          </td>
          <td colspan="10" />
        </tr>
        <tr
          v-for="([bn, be, bt, bp], ii) of bes.slice(1)"
          :key="bn">
          <td
            v-if="!ii"
            class="pt-2 pl-8 pb-2"
            style="vertical-align: top"
            :rowspan="bes.length - 1"
            colspan="6">
            {{ tip }}
            <v-divider class="my-2" />
            {{ description || '[UNDEFINED]' }}
          </td>
          <td class="text-right">
            {{ be.position }}.
          </td>
          <td>{{ DISPLAY_BLOCK[bn] }}</td>
          <td class="g-bold">
            {{ bn }}
          </td>
          <td>{{ bt }}</td>
          <!--          <td>{{ be.param }}</td>-->
          <td>
            {{ bp }}
          </td>
          <td>{{ be.initial }}</td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script>

import { MODULES } from '../../lib/spec/modules.ts'
import { blockEntries } from '../../lib/index.ts'
import { DISPLAY_BLOCK } from '../../lib/spec/display-blocks.ts'
import { DESCRIPTIONS } from '../../lib/spec/display-descriptions.ts'
import { TIPS } from '../../lib/spec/display-tips.ts'
import { getConnectionType } from '../../lib/view/table-connection.ts'
import { ConnectionType } from '../../lib/view/types.ts'
import { getParamInfo } from '../../lib/grid/param-types.ts'
import { Category } from '../../lib/spec/types.ts'

export default {
  computed: {
    DISPLAY_BLOCK () {
      return DISPLAY_BLOCK
    },
    MODULES () {
      return MODULES
        .map((m, i) => ({
          m,
          category: Category[m.category],
          tip: TIPS[i],
          description: DESCRIPTIONS[i],
          bes: blockEntries(m.blocks)
            .map(x => {
              const { param } = x[1]

              return [
                ...x,
                ConnectionType[getConnectionType(x, m.id)],
                param ? getParamInfo(x[0], m) : undefined
              ]
            })
        }))
        .sort((a, b) => a.m.category - b.m.category)
    }
  }
}
</script>
