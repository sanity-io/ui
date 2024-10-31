export interface Contract {
  [key: string]: string | Contract | null
}

export interface ContractProperties {
  [key: `--${string}`]: string
}

export type ContractVars<C extends Contract> = {
  [key in keyof C]: C[key] extends object ? ContractVars<C[key]> : `var(--${string})`
}

export type ContractVarNames<C extends Contract> = {
  [key in keyof C]: C[key] extends object ? ContractVarNames<C[key]> : `--${string}`
}
