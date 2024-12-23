import type { Jack, JackModule } from '../spec/types.ts'
import type { ModuleView } from '../graph/types.ts'

export function getActive(j: Jack, modules: ModuleView[]) {
  return j.modules.some((m) => {
    if (Number.isInteger(m)) {
      return modules.some((v) => v.module.id === m)
    }

    const ms = modules.filter((v) => v.module.id === (<JackModule> m).id)

    if ((<JackModule> m).prop && (<JackModule> m).value) {
      return ms.some((v) => v.module.options[<string> (<JackModule> m).prop] === (<JackModule> m).value)
    }

    // else if (m.block)
    return ms.some((v) => v.module.blocks[<string> (<JackModule> m).block])
  })
}
