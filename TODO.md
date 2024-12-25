# TODO

## Parser

- [ ] 050 airport wind patch corrupted page names?
- [ ] [./lib/README.md](./lib/README.md) version of ADSR, Pitch Shifter and Clock Divider, check FW release notes

## Improvements

- [ ] try shorter gzip link // inputReadableStream.pipeThrough(new CompressionStream("gzip"))
- [ ] consolidate block condition types
- [ ] hide patch during loading
- [ ] connect HP jack to module
- [ ] revert patch num shift

## Ref

- [ ] connection v-keys

## Doc

- [ ] doc banner
- [ ] integration notes
- [ ] og:image
- [ ] test pages

## Features

- [ ] mouse over connections
- [ ] connection shape
- [ ] out vs in block
- [ ] modules info page?
- [ ] starred connection
- [ ] sticky connections
- [ ] audio vs cv vs midi vs star connection
- [ ] connection count?
- [ ] offline support
- [ ] disconnected modules list?
- [ ] embed view?
- [ ] highlight starred error

## Testing

- [ ] check cpu values
- [ ] check stared items
- [ ] add connection and starred validation to tests
- [ ] make test patch with all modules

## Done

- [x] amb set 3 / 029 029_zoia_Hvitserkur
- [x] migrate to model/view
- [x] hide unused block labels
- [x] add chrome note
- [x] consolidate colors
- [x] adjust green color
- [x] check hardcoded svg constants
- [x] translate3d() ~~move connection to separate svg + try canvasg~~
- [x] rename zebu to euro
- [x] drop info timing
- [x] fix jack connection order
- [x] error on slow load
- [x] dark highlight fix
- [x] doc included files
- [x] block abbreviations
- [x] connection - jack position
- [x] check colors
- [x] add color scales
- [x] check on GH pages
- [x] move modules abbreviations to standalone file?
- [x] measure text
- [x] get rid of google fonts tracking :(
- [x] fix prev/next not blocked on shared link?
- [x] default cols 3
- [x] fix doc share links
- [x] reorg grid vs graph
- [x] ~refactor sizes like moduleM -> M~
- [x] doc
- [x] check lib non-index imports
- [x] check trademarks https://duckduckgo.com/?q=site%3Aempresseffects.com+trademark
- [x] ~~add more factory banks?~~ no licence info
- [x] document source sources
- [x] add missing descriptions
- [x] make repo
- [x] change patch colors to enum
- [x] check modules with different versions
- [x] gitignore
- [x] remove offset handling
- [x] rename destination to target
- [x] zip drop support
- [x] document localStorage.menu = false, localStorage.debug='*'
- [x] headphones symbol
- [x] share hot key
- [x] add drop info about client side only processing
- [x] check offset occurrence
- [x] fix app tsc check
- [x] disable prev + next on single drop
- [x] svg jack text
- [x] try Noto font
- [x] cpu table
- [x] ~~hide tooltip on ctx menu~~
- [x] patch download
- [x] look for test patches in zoia-lib repo
- [x] check zoia-lib repo licence: GPL v3
- [x] remove mdi icons (if needed?)
- [x] doc links http://localhost:3000/?link=https%3A%2F%2Fpatchstorage.com%2Fapi%2Fbeta%2Fpatches%2F181743%2Ffiles%2F181739%2Fdownload%2F
