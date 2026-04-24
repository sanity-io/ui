import {describe, expect, test} from 'vitest'

import {createStateTokenSetsFromPath} from './transformStateLayer'

describe('createStateTokenSetsFromPath', () => {
  test('hoists children at path into state token sets', () => {
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        selectable: {
          color: {
            $type: 'color',
            enabled: {
              bg: {$value: '{color.tinted.bg.0}'},
              fg: {$value: '{color.tinted.fg.0}'},
            },
            hovered: {
              bg: {$value: '{color.tinted.bg.1}'},
              fg: {$value: '{color.tinted.fg.0}'},
            },
          },
        },
      },
      path: ['selectable', 'color'],
    })

    expect(Object.keys(result)).toEqual(['enabled', 'hovered'])

    expect(result['enabled']).toEqual({
      selectable: {
        color: {
          $type: 'color',
          bg: {$value: '{color.tinted.bg.0}'},
          fg: {$value: '{color.tinted.fg.0}'},
        },
      },
    })

    expect(result['hovered']).toEqual({
      selectable: {
        color: {
          $type: 'color',
          bg: {$value: '{color.tinted.bg.1}'},
          fg: {$value: '{color.tinted.fg.0}'},
        },
      },
    })
  })

  test('throws when state shapes do not match', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {
          selectable: {
            color: {
              $type: 'color',
              enabled: {
                bg: {$value: '{color.tinted.bg.0}'},
                fg: {$value: '{color.tinted.fg.0}'},
              },
              hovered: {
                bg: {$value: '{color.tinted.bg.1}'},
              },
            },
          },
        },
        path: ['selectable', 'color'],
      }),
    ).toThrow(/State token shape mismatch/)
  })

  test('uses object key order for state order', () => {
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        selectable: {
          color: {
            $type: 'color',
            hovered: {
              bg: {$value: '{color.tinted.bg.1}'},
            },
            enabled: {
              bg: {$value: '{color.tinted.bg.0}'},
            },
          },
        },
      },
      path: ['selectable', 'color'],
    })

    // Order matches object key order
    expect(Object.keys(result)).toEqual(['hovered', 'enabled'])
  })

  test('ignores token metadata when detecting states', () => {
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        selectable: {
          color: {
            $type: 'color',
            $description: 'Selectable colors',
            $extensions: {
              'com.example': {
                foo: 'bar',
              },
            },
            enabled: {
              bg: {$value: '{color.tinted.bg.0}'},
            },
            hovered: {
              bg: {$value: '{color.tinted.bg.1}'},
            },
          },
        },
      },
      path: ['selectable', 'color'],
    })

    expect(Object.keys(result)).toEqual(['enabled', 'hovered'])

    // Metadata should be preserved in projected tokens
    expect(result['enabled']).toEqual({
      selectable: {
        color: {
          $type: 'color',
          $description: 'Selectable colors',
          $extensions: {
            'com.example': {
              foo: 'bar',
            },
          },
          bg: {$value: '{color.tinted.bg.0}'},
        },
      },
    })
  })

  test('preserves group metadata in projected tokens', () => {
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        selectable: {
          color: {
            $type: 'color',
            $description: 'State-specific colors',
            enabled: {
              bg: {$value: '{color.tinted.bg.0}'},
            },
            hovered: {
              bg: {$value: '{color.tinted.bg.1}'},
            },
          },
        },
      },
      path: ['selectable', 'color'],
    })

    // Both states should have the metadata
    const enabledColor = (result['enabled'] as {
      selectable: {
        color: Record<string, unknown>
      }
    }).selectable.color

    const hoveredColor = (result['hovered'] as {
      selectable: {
        color: Record<string, unknown>
      }
    }).selectable.color

    expect(enabledColor).toHaveProperty('$type', 'color')
    expect(enabledColor).toHaveProperty('$description', 'State-specific colors')
    expect(hoveredColor).toHaveProperty('$type', 'color')
    expect(hoveredColor).toHaveProperty('$description', 'State-specific colors')
  })

  test('throws when state path is empty', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {},
        path: [],
      }),
    ).toThrow(/state path cannot be empty/)
  })

  test('throws when path is not found', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {selectable: {}},
        path: ['selectable', 'color'],
      }),
    ).toThrow(/path not found/)
  })

  test('throws when no state keys are found', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {
          selectable: {
            color: {
              $type: 'color',
              $description: 'No states here',
            },
          },
        },
        path: ['selectable', 'color'],
      }),
    ).toThrow(/no state keys found/)
  })

  test('throws when a state value is not an object', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {
          selectable: {
            color: {
              $type: 'color',
              enabled: '{color.tinted.bg.0}',
              hovered: {
                bg: {$value: '{color.tinted.bg.1}'},
              },
            },
          },
        },
        path: ['selectable', 'color'],
      }),
    ).toThrow(/expected state "enabled".*to be an object/)
  })

  test('throws when state contains no token leaves', () => {
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {
          selectable: {
            color: {
              $type: 'color',
              enabled: {
                $description: 'Only metadata, no tokens',
              },
              hovered: {
                $description: 'Only metadata, no tokens',
              },
            },
          },
        },
        path: ['selectable', 'color'],
      }),
    ).toThrow(/contains no token leaves/)
  })

  test('handles primitive token leaves with direct $value', () => {
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        primitive: {
          value: {
            $type: 'number',
            enabled: {$value: 10},
            hovered: {$value: 20},
          },
        },
      },
      path: ['primitive', 'value'],
    })

    expect(Object.keys(result)).toEqual(['enabled', 'hovered'])

    const enabledTokens = result['enabled'] as {
      primitive?: {
        value?: {
          $value?: unknown
        }
      }
    }

    expect(enabledTokens.primitive?.value?.$value).toBe(10)
  })

  test('primitive non-object leaves participate in shape validation', () => {
    // This should throw because 'hovered' is missing the 'opacity' primitive
    expect(() =>
      createStateTokenSetsFromPath({
        tokenSet: {
          element: {
            style: {
              enabled: {
                color: '#ff0000',
                opacity: 1.0,
              },
              hovered: {
                color: '#00ff00',
                // Missing opacity primitive
              },
            },
          },
        },
        path: ['element', 'style'],
      }),
    ).toThrow(/State token shape mismatch/)
  })

  test('primitive non-object leaves are counted in shape validation', () => {
    // This should succeed - both states have the same primitive leaves
    const result = createStateTokenSetsFromPath({
      tokenSet: {
        element: {
          style: {
            enabled: {
              color: '#ff0000',
              opacity: 1.0,
              size: 16,
            },
            hovered: {
              color: '#00ff00',
              opacity: 0.8,
              size: 18,
            },
          },
        },
      },
      path: ['element', 'style'],
    })

    expect(Object.keys(result)).toEqual(['enabled', 'hovered'])

    const enabledTokens = result['enabled'] as {
      element?: {
        style?: {
          color?: unknown
          opacity?: unknown
          size?: unknown
        }
      }
    }

    expect(enabledTokens.element?.style?.color).toBe('#ff0000')
    expect(enabledTokens.element?.style?.opacity).toBe(1.0)
    expect(enabledTokens.element?.style?.size).toBe(16)
  })
})
