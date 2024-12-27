## Derived work

Most of this folder is derived from https://github.com/meanmedianmoge/zoia_lib project released under GPL v3 license and authored by:

- Mike Moger - app owner, primary dev after Beta 3 release, initial Python implementation
- John Breton - primary dev, designer, and documentation creator up to Beta 3 release
- djigneo/apparent1 - C# binary decoding and testing
- Sranderley - binary encoding, editing, and UI
- Matthew Allen - initial UI frames and app planning

Primary reused sources:

- `parse_data` https://github.com/meanmedianmoge/zoia_lib/blob/75450c3c5fc622f908c8ead6c5d74284c6544812/zoia_lib/backend/patch_binary.py#L21
- `_calc_blocks` https://github.com/meanmedianmoge/zoia_lib/blob/75450c3c5fc622f908c8ead6c5d74284c6544812/zoia_lib/backend/patch_binary.py#L506
- `ModuleIndex.json` https://github.com/meanmedianmoge/zoia_lib/blob/master/zoia_lib/common/schemas/ModuleIndex.json#L1

Changes from original project

- Transpiled Python code and JSON data to TypeScript, especially:
  - parser [./parser/parse.ts](./parser/parse.ts)
  - modules specification [./spec/modules.ts](./spec/modules.ts)
- Restructured data structures, mainly:
  - added `slot` prop into `ModuleSpec.options` (as JS environment does not guarantee property order)
  - added `sort` prop into `ModuleSpec.block` (as the device shows the blocks in different order than `position` property value)
  - added `conditions` replacing the conditional blocks imperative calculation with declarative approach
  - added Euroburo support; Euroburo specific modules are moved to page `-1`

## Troubleshooting

Most issues will be like related to module specification in [./spec/modules.ts](./spec/modules.ts)

- **Different order of blocks**: add `sort` property to the block
- **Missing version specification**: ADSR, Pitch Shifter and Clock Divider have different versions (based on patches from patchstorage.com) and only ' Clock Divider has been addressed so far: investigation needed, note: [looks like](https://cdn.shopify.com/s/files/1/0028/5462/files/zoia_changelog_52792f30-e99b-4be7-919c-b1b7de6920ec.txt?v=1733847708) there was no change in blocks (likely in options, we do not show only), and we have the Clock Divider covered. 
- **Missing block**: likely missing `condition` or the block specification
- **Missing connection**: likely caused by missing or misplaced block
