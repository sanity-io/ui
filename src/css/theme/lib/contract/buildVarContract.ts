import {_hash} from '../../../_hash'
import type {Contract, ContractProperties, ContractVarNames, ContractVars} from './types'

export function buildVarContract<C extends Contract, P extends string>(
  contract: C,
  options: {layer: string; prefix: P},
) {
  return {
    vars: buildVars(contract, options),
    varNames: buildVarNames(contract, options),
    properties: buildProperties(contract, options),
  }
}

function buildProperties<C extends Contract, P extends string>(
  contract: C,
  options: {layer: string; prefix: P},
) {
  const _properties: ContractProperties = {}

  function walk(c: Contract) {
    for (const key in c) {
      if (typeof c[key] === 'string') {
        _properties[`--${options.prefix}${_hash(`${options.layer}.${c[key]}`)}`] = c[key]
      } else if (c[key] === null) {
        // ignore
      } else {
        walk(c[key])
      }
    }
  }

  walk(contract)

  return Object.freeze(_properties)
}

function buildVars<C extends Contract, P extends string>(
  contract: C,
  options: {layer: string; prefix: P},
  path: string = '',
) {
  const _vars = {} as Record<string, unknown>

  for (const key in contract) {
    if (typeof contract[key] === 'string') {
      _vars[key] = `var(--${options.prefix}${_hash(`${options.layer}.${contract[key]}`)})`
    } else if (contract[key] === null) {
      _vars[key] = `var(--${options.prefix}${_hash(`${options.layer}.${path}.${key}`)})`
    } else {
      _vars[key] = buildVars(contract[key], options, [path, key].join('.'))
    }
  }

  return Object.freeze(_vars) as ContractVars<C>
}

function buildVarNames<C extends Contract, P extends string>(
  contract: C,
  options: {layer: string; prefix: P},
  path: string = '',
) {
  const _varNames = {} as Record<string, unknown>

  for (const key in contract) {
    if (typeof contract[key] === 'string') {
      _varNames[key] = `--${options.prefix}${_hash(`${options.layer}.${contract[key]}`)}`
    } else if (contract[key] === null) {
      _varNames[key] = `--${options.prefix}${_hash(`${options.layer}.${path}.${key}`)}`
    } else {
      _varNames[key] = buildVarNames(contract[key], options, [path, key].join('.'))
    }
  }

  return Object.freeze(_varNames) as ContractVarNames<C>
}
