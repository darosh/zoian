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
        v-for="{m, bes} of MODULES"
        :key="m.id">
        <tr>
          <td
            :rowspan="bes.length"
            class="text-no-wrap g-bolder">
            {{ m.name }}
          </td>
          <td :rowspan="bes.length">
            {{ m.category }}
          </td>
          <td :rowspan="bes.length">
            {{ m.euro }}
          </td>
          <td :rowspan="bes.length">
            {{ m.in }}
          </td>
          <td :rowspan="bes.length">
            {{ !!m.conditions || undefined }}
          </td>
          <td
            :rowspan="bes.length"
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
          <td>{{ bes[0][1].param }}</td>
          <td>{{ bes[0][1].initial }}</td>
        </tr>
        <tr
          v-for="[bn, be, bt] of bes.slice(1)"
          :key="bn">
          <td class="text-right">
            {{ be.position }}.
          </td>
          <td>{{ DISPLAY_BLOCK[bn] }}</td>
          <td class="g-bold">
            {{ bn }}
          </td>
          <td>{{ bt }}</td>
          <td>{{ be.param }}</td>
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
import { getConnectionType } from '../../lib/graph/table-connection.ts'
import { ConnectionType } from '../../lib/graph/types.ts'

export default {
  computed: {
    DISPLAY_BLOCK () {
      return DISPLAY_BLOCK
    },
    MODULES () {
      return MODULES.map(m => ({
        m,
        bes: blockEntries(m.blocks).map(x => [...x, ConnectionType[getConnectionType(x, m.id)]])
      }))
    }
  }
}
</script>
