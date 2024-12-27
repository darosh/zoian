# TODO

## Parser

- [ ] 050 airport wind patch corrupted page names?
- [ ] [./lib/README.md](./lib/README.md) version of ADSR, Pitch Shifter and Clock Divider, check FW release notes

## Improvements

- [ ] try shorter gzip link // inputReadableStream.pipeThrough(new CompressionStream("gzip"))
- [ ] verify alternative connections are hidden
- [ ] remove redundant props from Patch model
- [ ] [POSTPONED] consolidate block condition types
- [ ] [POSTPONED] cable bundling?

## Ref

- [ ] [POSTPONED] lib / grid reorg

## Doc

- [ ] doc banner
- [ ] integration notes
- [ ] og:image

## Features

- [ ] connection count?
- [ ] [POSTPONED] straight lines option
- [ ] [POSTPONED] disconnected modules list?
- [ ] [POSTPONED] starred connection
- [ ] [POSTPONED] embed view?
- [ ] [POSTPONED] offline support
- [ ] [POSTPONED?] audio vs cv vs midi vs star connection

## Testing

- [ ] check module overflow to another page
- [ ] check cpu values
- [ ] check stared items
- [ ] add connection and starred validation to tests
- [ ] make test patch with all modules
- [ ] check corrupted names and starred items 105255.bin
- [ ] check memleaks

## Bugs

- [ ] zero loaded fixes
- [ ] mixed connections in demo 9. non linear

## Done

- [x] connection v-keys
- [x] hidden connected blocks count / list
- [x] mouse over connections
- [x] connection shape
- [x] out vs in block
- [x] modules ~~info~~ test page?
- [x] ~~sticky connections~~
- [x] keep tooltip on next/prev (for tool row)
- [x] dotted arrow for outgoing to hidden
- [x] trim module names
- [x] user select none on tip
- [x] click to hide tip
- [x] esc cancel highlights
- [x] mi note out abbr
- [x] io should not affect Euro module state
- [x] test pages
- [x] modules test page
- [x] connection counts?
- [x] hide patch during loading
- [x] round connected highlights
- [x] highlight starred error
- [x] round io hover highlight
- [x] ~revert~ smaller patch num shift
- [x] round SVG values
- [x] connect HP jack to module
- [x] list MIDI channels
- [x] update on window resize
- [x] hide tooltip on drop
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
