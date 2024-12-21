import type { Jack, JackModule } from '../spec/types.ts'
import type { PatchModule } from '../parser/types.ts'

export function getActive(j: Jack, modules: PatchModule[]) {
  return j.modules.some((m) => {
    if (Number.isInteger(m)) {
      return modules.some((v) => v.id === m)
    }

    const ms = modules.filter((v) => v.id === (<JackModule> m).id)

    if ((<JackModule> m).prop && (<JackModule> m).value) {
      return ms.some((v) => v.options[<string> (<JackModule> m).prop] === (<JackModule> m).value)
    }

    // else if (m.block)
    return ms.some((v) => v.blocks[<string> (<JackModule> m).block])
  })
}
