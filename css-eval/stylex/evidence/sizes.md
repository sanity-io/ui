| CSS | raw | gzip | brotli |
|---|---:|---:|---:|
| v1 styles.css (as published, pretty) | 7.88 kB | 2.19 kB | 1.91 kB |
| v1 styles.css (minified) | 6.67 kB | 2.11 kB | 1.83 kB |
| v2 styles.css (as published, pretty) | 8.42 kB | 2.30 kB | 2.00 kB |
| v2 styles.css (minified) | 7.14 kB | 2.22 kB | 1.94 kB |
| app index.css (reset + app StyleX + consumer theme) | 2.12 kB | 0.61 kB | 0.54 kB |
| page total: v1 + v2 + app (minified) | 15.93 kB | 3.98 kB | 3.36 kB |
| v1 + v2 compiled as one sheet (deduplicated, minified) | 12.27 kB | 3.46 kB | 2.92 kB |

Rules: v1 65, v2 73, merged (dedup) 107

| JS | raw | gzip | brotli |
|---|---:|---:|---:|
| v1 dist/index.js + tokens.stylex.js (as published, not minified) | 6.15 kB | 2.31 kB | 2.05 kB |
| runtime: static styles only (compiled away) | 0.04 kB | 0.06 kB | 0.05 kB |
| runtime: props() for dynamic/conditional merging | 1.47 kB | 0.82 kB | 0.73 kB |
| runtime: whole @stylexjs/stylex namespace | 4.01 kB | 1.69 kB | 1.51 kB |
| v1 library + runtime, consumer bundle (react external) | 4.47 kB | 2.24 kB | 2.01 kB |
| app bundle incl. react-dom (context only) | 224.06 kB | 69.48 kB | 59.91 kB |
