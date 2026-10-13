# Identifier collisions between @css-eval/ve-button 1.0.0 and 2.0.0

| mode | identifiers v1 | identifiers v2 | shared names | shared, same rules | shared, DIFFERENT rules |
| --- | ---: | ---: | ---: | ---: | ---: |
| `default` | 39 | 41 | 36 | 2 | **34** |
| `version` | 39 | 41 | 0 | 0 | **0** |
| `version+module` | 39 | 41 | 0 | 0 | **0** |

## Examples of the same name meaning different rules

- `default` `._1u1be65l`
  - 1.0.0: `._1u1be65l{--_1u1be650:3px;--_1u1be651:12px;--_1u1be652:8px;--_1u1be653:13px;--_1u1be654:600;--_1u1be655:#1b1d20;--_1u1be656:#f2f3f5;--_1u1be657:#3c4049;--_1u1be658:#3c8bff;--_1u1be659:#0b1a33;--_1u1be65a:#5f9fff;--_1u1be65b:#49c87a;--_1u1be65c:#0b2616;--_1u1be65d:#6ad291;--_1u1be65e:#f7c15c;--_1u1be65f:#2b1f05;--_1u1be65g:#f9cd7b;--_1u1be65h:#f66a5e;--_1u1be65i:#330a06;--_1u1be65j:#f88a80;}`
  - 2.0.0: `._1u1be65l{--_1u1be650:6px;--_1u1be651:12px;--_1u1be652:8px;--_1u1be653:8px;--_1u1be654:13px;--_1u1be655:600;--_1u1be656:#fff;--_1u1be657:#1f2126;--_1u1be658:#c6cbd6;--_1u1be659:#7d3cfc;--_1u1be65a:#fff;--_1u1be65b:#652bd6;--_1u1be65c:#3ab667;--_1u1be65d:#fff;--_1u1be65e:#2c9a54;--_1u1be65f:#f5b031;--_1u1be65g:#1f2126;--_1u1be65h:#d4931b;--_1u1be65i:#f03e2f;--_1u1be65j:#fff;--_1u1be65k:#c62d20;}`
- `default` `.lgqk174`
  - 1.0.0: `.lgqk174{z-index:1;border-radius:inherit;background-color:inherit;justify-content:center;align-items:center;display:flex;position:absolute;inset:0;}`
  - 2.0.0: `.lgqk174{appearance:none;box-sizing:border-box;font:inherit;font-size:var(--_1u1be654);font-weight:var(--_1u1be655);white-space:nowrap;-webkit-user-select:none;user-select:none;cursor:pointer;padding:var(--_1u1be652) var(--_1u1be651);border-radius:var(--_1u1be650);outline:2px solid var(--lgqk170,transparent);outline-offset:2px;border-style:solid;border-width:1px;align-items:center;gap:8px;margin:0;line-height:1.2;text-decoration:none;display:inline-flex;position:relative;}`
- `default` `.lgqk176`
  - 1.0.0: `.lgqk176{border:2px solid;border-right-color:#0000;border-radius:50%;width:14px;height:14px;animation:.7s linear infinite lgqk175;}`
  - 2.0.0: `.lgqk176{--lgqk171:var(--_1u1be659);--lgqk172:var(--_1u1be65a);--lgqk173:var(--_1u1be65b);}`
- `default` `.lgqk177`
  - 1.0.0: `.lgqk177{appearance:none;box-sizing:border-box;font:inherit;font-size:var(--_1u1be653);font-weight:var(--_1u1be654);white-space:nowrap;-webkit-user-select:none;user-select:none;cursor:pointer;padding:var(--_1u1be652) var(--_1u1be651);border-radius:var(--_1u1be650);outline:2px solid var(--lgqk170,transparent);outline-offset:2px;border-style:solid;border-width:1px;align-items:center;gap:8px;margin:0;line-height:1.2;text-decoration:none;display:inline-flex;position:relative;}`
  - 2.0.0: `.lgqk177{--lgqk171:var(--_1u1be65c);--lgqk172:var(--_1u1be65d);--lgqk173:var(--_1u1be65e);}`
