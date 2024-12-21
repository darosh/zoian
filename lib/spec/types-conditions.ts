// First, we need to make condition types that can reference each other
export type BaseCondition =
  | SimpleToggleCondition
  | ValueMatchCondition
  | NumericRangeCondition
  | VersionCondition

// Simple on/off toggle based on an option
export interface SimpleToggleCondition {
  type: 'toggle'
  option: string
  enableValue?: string
}

// Match specific option value
export interface ValueMatchCondition {
  type: 'value'
  option: string
  value: string | number
}

// Numeric range condition
export interface NumericRangeCondition {
  type: 'range'
  option: string
  min?: number
  max?: number
  position: number
}

// Sequential block addition
export interface SequentialCondition {
  type: 'sequential'
  option: string
  startPosition: number
  nameTemplate: string
  blockCount?: number
  condition?: BaseCondition
}

export interface VersionCondition {
  type: 'version'
  version: [string, number]
}

// Multiple options must match - now can include any condition type
export interface MultiOptionCondition {
  type: 'multi'
  operator: 'and' | 'or'
  conditions: Array<BaseCondition | MultiOptionCondition> // Can include other MultiOptionConditions
}

// Final union type that includes everything
export type BlockCondition = BaseCondition | MultiOptionCondition | SequentialCondition

export interface ModuleSpecConditions {
  [key: string]: BlockCondition
}
