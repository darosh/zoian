import type { ModuleSpec } from '../spec/types.ts'
import type { PatchModule } from './types.ts'

export function calculateCpu(modules: (PatchModule | ModuleSpec)[]) {
  return Math.round(modules.reduce((sum: number, m: PatchModule | ModuleSpec) => sum + m.cpu, 0) * 10) / 10
}
