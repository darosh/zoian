# TODO

## Doc

- [ ] document hidden links

## Testing

- [ ] cross-browser/device testing
- [ ] check memleaks
- [ ] check cpu values? could we just apply the [Improved the overall CPU performance by 14%](https://cdn.shopify.com/s/files/1/0028/5462/files/zoia_changelog_52792f30-e99b-4be7-919c-b1b7de6920ec.txt?v=1733847708)?
- [ ] check stared items
- [ ] add connection and starred validation to tests
- [ ] review module tooltips copywriting

## Improvements

- [ ] add file selection for touch devices
- [ ] weird thin lines between blocks, non-retina? svg widths rounding?
- [ ] add second dot if hidden link has opposite directions?
- [ ] midi connections to 1st block
- [ ] [POSTPONED] consolidate block condition types
- [ ] [POSTPONED] check with Empress v5 factory set licence

## Features

- [ ] [POSTPONED] disconnected modules list? or highlight?
- [ ] [POSTPONED] starred connection
- [ ] [POSTPONED] embed view?
- [ ] [POSTPONED] offline support
- [ ] [POSTPONED] hidden connection count

## Done

- [x] ~~straight lines option~~
- [x] ~~url shortener? free + non-tracking?~~
- [x] ~~favorites stored in browser?~~
- [x] ~~cable bundling?~~
- [x] shared binary patch should not display number
- [x] ~~check corrupted names and starred items 105255.bin~~
- [x] cv filter conditional blocks fix
- [x] make test patch with all modules
- [x] audio vs cv ~~vs midi vs star~~ connection
- [x] improve touch timing / detect scrolling
- [x] basic touch support
- [x] prepare & test writer
- [x] shared ?file should support zip with multiple files like drop
- [x] check 80% vs 10% connection strength parsing https://patchstorage.com/the-pilule/
- [x] 050 airport wind patch corrupted page names?
- [x] connection count?
- [x] [./lib/README.md](./lib/README.md) version of ADSR, Pitch Shifter and Clock Divider, check FW release notes
- [x] mixed connections in demo 9. non linear
- [x] verify alternative connections are hidden
- [x] zero loaded fixes
- [x] integration notes
- [x] doc banner
- [x] og:image
- [x] doc click and esc
- [x] lib / grid reorg
- [x] check module overflow to another page
- [x] remove redundant props from Patch model
- [x] euro audio dots
- [x] recalc connected on euro switch
- [x] always show lines on hover
- [x] try shorter gzip link // inputReadableStream.pipeThrough(new CompressionStream("gzip"))
- [x] connection v-keys
- [x] hidden connected blocks count / list
- [x] mouse over connections
- [x] connection shape
- [x] out vs in block
- [x] modules ~~info~~ test page?
- [x] ~~sticky connections~~ lazy/clicky mode
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
