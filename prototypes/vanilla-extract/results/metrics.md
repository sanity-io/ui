# Metrics (2026-10-13, Node v22.14.0, 5 runs)

## Compile time — tsdown + @sanity/tsdown-config (@sanity/vanilla-extract-* plugins), per library build

| lib | identifiers mode | cold (first run, wall) | warm (median, wall) | tsdown-reported build |
| --- | --- | ---: | ---: | ---: |
| lib-v1 | `default` | 365 ms | 352 ms | 182 ms |
| lib-v2 | `default` | 370 ms | 351 ms | 183 ms |
| lib-v1 | `version` | 342 ms | 348 ms | 182 ms |
| lib-v2 | `version` | 339 ms | 355 ms | 187 ms |
| lib-v1 | `version+module` | 355 ms | 353 ms | 183 ms |
| lib-v2 | `version+module` | 345 ms | 348 ms | 175 ms |

Wall time includes Node + tsdown + rolldown start-up (~300 ms); the tsdown-reported figure is the build itself.

## Output size per naming mode

| lib | identifiers mode | CSS raw | CSS gzip | CSS brotli | JS raw | JS gzip | avg class name length |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| lib-v1 | `default` | 2,976 B | 890 B | 715 B | 2,464 B | 931 B | 7.27 |
| lib-v2 | `default` | 3,101 B | 920 B | 739 B | 2,634 B | 971 B | 7.25 |
| lib-v1 | `version` | 3,058 B | 893 B | 714 B | 2,496 B | 934 B | 9.00 |
| lib-v2 | `version` | 3,120 B | 920 B | 740 B | 2,647 B | 974 B | 8.88 |
| lib-v1 | `version+module` | 3,058 B | 891 B | 717 B | 2,496 B | 933 B | 9.00 |
| lib-v2 | `version+module` | 3,143 B | 918 B | 740 B | 2,652 B | 971 B | 8.13 |

## Runtime JS shipped to consumers (minified ESM bundle of everything vanilla-extract puts in the browser)

`@vanilla-extract/dynamic` (assignInlineVars, setElementVars) + `@vanilla-extract/recipes/createRuntimeFn`: **4,064 B raw, 1,562 B gzip, 1,383 B brotli**. `@vanilla-extract/css` itself is build-time only (0 B at runtime); a library that uses neither dynamic vars nor recipes ships 0 B.
