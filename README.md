> ⚠️ WORK IN PROGRESS
>
> This application is under active development. Some features may be incomplete or not working as intended.

# ZOIA/Euroburo Patch Explorer

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## About

ZOIA and ZOIA Euroburo are modular digital effect pedals and Eurorack modules manufactured by Empress Effects. This application allows users to explore their .BIN patch files.

### Features

*(Some features are still under development and may not work as intended)*

- Drop .BIN patch files or a folder containing them, .ZIP files work as well, you can also drop whole `~/Library/Application Support/.ZoiaLibraryApp` folder
- All processing happens in your browser &mdash; no data is sent to any server
- Contains old Euroburo factory demo set [patchstorage.com/zoia-euroburo-factory-patches/](https://patchstorage.com/zoia-euroburo-factory-patches/) (you can drag & drop other sets your self)
- Highlights IO connections
- Highlights starred modules
- Switch between ZOIA and Euroburo layout
- CPU utilization overview
- Share patches via link
  - Factory [github.com/darosh/zoian/?factory=42](https://github.com/darosh/zoian/?factory=42)
  - User file [github.com/darosh/zoian/?file=%2BQcAAFNwZWN0cnVtAAAAAAAAAABJAA,,,](https://github.com/darosh/zoian/?file=%2BQcAAFNwZWN0cnVtAAAAAAAAAABJAAAADwAAAFEAAAAAAAAAAAAAAAMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAAEAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAAGAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAMAAAAHAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAIAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAKAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAALAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAMAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAANAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAOAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAQAAAAPAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAQAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAARAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAASAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAATAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAUAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAVAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAWAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAXAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAYAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAZAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAaAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAbAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAcAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAdAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAeAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAfAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAgAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAhAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAiAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAjAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAkAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAlAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAmAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAFEAAAAAAAAAAAAAAAIAAAAnAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAQAAAAQAAAAAAAAAAgAAAAAAAAAAAQAAAAAAAK4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAMAAAAAAAAAAEAAAAFAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADIAAAAAAAAAAQAAAAcAAAAQAAAAAgAAAAAAAAAAAAAAAAAAAAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAAAAAAAEAAAACAAAAGAAAAAIAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAACAAAABAAAAAAAAAACAAAAAAAAAAABAAAAAAAASEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAwAAAAAAAAAAgAAAAUAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMgAAAAAAAAACAAAABwAAABAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAAAAAAAgAAAAIAAAAYAAAAAgAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAMAAAAEAAAAAAAAAAIAAAAAAAAAAAEAAAAAAAAgawAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADAAAAAAAAAADAAAABQAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAyAAAAAAAAAAMAAAAHAAAAEAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAADAAAAAgAAABgAAAACAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAgAAAAAAAAAAAQAAAAAAALqEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAMAAAAAAAAAAQAAAAFAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADIAAAAAAAAABAAAAAcAAAAQAAAAAgAAAAAAAAAAAAAAAAAAAAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAAAAAAAQAAAACAAAAGAAAAAIAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFAAAABAAAAAAAAAACAAAAAAAAAAABAAAAAAAAVJ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAwAAAAAAAAABQAAAAUAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMgAAAAAAAAAFAAAABwAAABAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAAAAAABQAAAAIAAAAYAAAAAgAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAYAAAAEAAAAAAAAAAIAAAAAAAAAAAEAAAAAAAAqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADAAAAAAAAAAGAAAABQAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAyAAAAAAAAAAYAAAAHAAAAEAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAGAAAAAgAAABgAAAACAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABwAAAAQAAAAAAAAAAgAAAAAAAAAAAQAAAAAAAMTZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAMAAAAAAAAAAcAAAAFAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADIAAAAAAAAABwAAAAcAAAAQAAAAAgAAAAAAAAAAAAAAAAAAAAAAAABAAQAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAAAAAAAcAAAACAAAAGAAAAAIAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADAAAAAAAAAAIAAAABQAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAyAAAAAAAAAAgAAAAHAAAAEAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAIAAAAAgAAABgAAAACAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAEAAAAAAAAACQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAgAAAAAAAAAJAAAABAAAAAUAAAABAAAAAAAAAAEAAAAAAAAAV9UAAAAAAAAAAAAAAAAAAAAAAACiAAAAKAAAAAMAAAApAAAAAAAAABAnAAAoAAAABAAAACwAAAAAAAAAECcAACkAAAADAAAAKgAAAAAAAAAQJwAAKQAAAAMAAAArAAAAAQAAABAnAAAqAAAAAgAAACsAAAAAAAAAECcAACsAAAACAAAAIAAAAAAAAAAQJwAAKwAAAAMAAAAYAAAAAAAAABAnAAArAAAAAwAAACAAAAAAAAAAECcAACsAAAAEAAAAEAAAAAAAAAAQJwAAKwAAAAQAAAAYAAAAAAAAABAnAAArAAAABAAAACAAAAAAAAAAECcAACsAAAAFAAAACAAAAAAAAAAQJwAAKwAAAAUAAAAQAAAAAAAAABAnAAArAAAABQAAABgAAAAAAAAAECcAACsAAAAFAAAAIAAAAAAAAAAQJwAAKwAAAAYAAAAAAAAAAAAAABAnAAArAAAABgAAAAgAAAAAAAAAECcAACsAAAAGAAAAEAAAAAAAAAAQJwAAKwAAAAYAAAAYAAAAAAAAABAnAAArAAAABgAAACAAAAAAAAAAECcAACwAAAADAAAALQAAAAAAAAAQJwAALAAAAAQAAAAwAAAAAAAAABAnAAAtAAAAAwAAAC4AAAAAAAAAECcAAC0AAAADAAAALwAAAAEAAAAQJwAALgAAAAIAAAAvAAAAAAAAABAnAAAvAAAAAgAAACEAAAAAAAAAECcAAC8AAAADAAAAGQAAAAAAAAAQJwAALwAAAAMAAAAhAAAAAAAAABAnAAAvAAAABAAAABEAAAAAAAAAECcAAC8AAAAEAAAAGQAAAAAAAAAQJwAALwAAAAQAAAAhAAAAAAAAABAnAAAvAAAABQAAAAkAAAAAAAAAECcAAC8AAAAFAAAAEQAAAAAAAAAQJwAALwAAAAUAAAAZAAAAAAAAABAnAAAvAAAABQAAACEAAAAAAAAAECcAAC8AAAAGAAAAAQAAAAAAAAAQJwAALwAAAAYAAAAJAAAAAAAAABAnAAAvAAAABgAAABEAAAAAAAAAECcAAC8AAAAGAAAAGQAAAAAAAAAQJwAALwAAAAYAAAAhAAAAAAAAABAnAAAwAAAAAwAAADEAAAAAAAAAECcAADAAAAAEAAAANAAAAAAAAAAQJwAAMQAAAAMAAAAyAAAAAAAAABAnAAAxAAAAAwAAADMAAAABAAAAECcAADIAAAACAAAAMwAAAAAAAAAQJwAAMwAAAAIAAAAiAAAAAAAAABAnAAAzAAAAAwAAABoAAAAAAAAAECcAADMAAAADAAAAIgAAAAAAAAAQJwAAMwAAAAQAAAASAAAAAAAAABAnAAAzAAAABAAAABoAAAAAAAAAECcAADMAAAAEAAAAIgAAAAAAAAAQJwAAMwAAAAUAAAAKAAAAAAAAABAnAAAzAAAABQAAABIAAAAAAAAAECcAADMAAAAFAAAAGgAAAAAAAAAQJwAAMwAAAAUAAAAiAAAAAAAAABAnAAAzAAAABgAAAAIAAAAAAAAAECcAADMAAAAGAAAACgAAAAAAAAAQJwAAMwAAAAYAAAASAAAAAAAAABAnAAAzAAAABgAAABoAAAAAAAAAECcAADMAAAAGAAAAIgAAAAAAAAAQJwAANAAAAAMAAAA1AAAAAAAAABAnAAA0AAAABAAAADgAAAAAAAAAECcAADUAAAADAAAANgAAAAAAAAAQJwAANQAAAAMAAAA3AAAAAQAAABAnAAA2AAAAAgAAADcAAAAAAAAAECcAADcAAAACAAAAIwAAAAAAAAAQJwAANwAAAAMAAAAbAAAAAAAAABAnAAA3AAAAAwAAACMAAAAAAAAAECcAADcAAAAEAAAAEwAAAAAAAAAQJwAANwAAAAQAAAAbAAAAAAAAABAnAAA3AAAABAAAACMAAAAAAAAAECcAADcAAAAFAAAACwAAAAAAAAAQJwAANwAAAAUAAAATAAAAAAAAABAnAAA3AAAABQAAABsAAAAAAAAAECcAADcAAAAFAAAAIwAAAAAAAAAQJwAANwAAAAYAAAADAAAAAAAAABAnAAA3AAAABgAAAAsAAAAAAAAAECcAADcAAAAGAAAAEwAAAAAAAAAQJwAANwAAAAYAAAAbAAAAAAAAABAnAAA3AAAABgAAACMAAAAAAAAAECcAADgAAAADAAAAOQAAAAAAAAAQJwAAOAAAAAQAAAA8AAAAAAAAABAnAAA5AAAAAwAAADoAAAAAAAAAECcAADkAAAADAAAAOwAAAAEAAAAQJwAAOgAAAAIAAAA7AAAAAAAAABAnAAA7AAAAAgAAACQAAAAAAAAAECcAADsAAAADAAAAHAAAAAAAAAAQJwAAOwAAAAMAAAAkAAAAAAAAABAnAAA7AAAABAAAABQAAAAAAAAAECcAADsAAAAEAAAAHAAAAAAAAAAQJwAAOwAAAAQAAAAkAAAAAAAAABAnAAA7AAAABQAAAAwAAAAAAAAAECcAADsAAAAFAAAAFAAAAAAAAAAQJwAAOwAAAAUAAAAcAAAAAAAAABAnAAA7AAAABQAAACQAAAAAAAAAECcAADsAAAAGAAAABAAAAAAAAAAQJwAAOwAAAAYAAAAMAAAAAAAAABAnAAA7AAAABgAAABQAAAAAAAAAECcAADsAAAAGAAAAHAAAAAAAAAAQJwAAOwAAAAYAAAAkAAAAAAAAABAnAAA8AAAAAwAAAD0AAAAAAAAAECcAADwAAAAEAAAAQAAAAAAAAAAQJwAAPQAAAAMAAAA%2BAAAAAAAAABAnAAA9AAAAAwAAAD8AAAABAAAAECcAAD4AAAACAAAAPwAAAAAAAAAQJwAAPwAAAAIAAAAlAAAAAAAAABAnAAA%2FAAAAAwAAAB0AAAAAAAAAECcAAD8AAAADAAAAJQAAAAAAAAAQJwAAPwAAAAQAAAAVAAAAAAAAABAnAAA%2FAAAABAAAAB0AAAAAAAAAECcAAD8AAAAEAAAAJQAAAAAAAAAQJwAAPwAAAAUAAAANAAAAAAAAABAnAAA%2FAAAABQAAABUAAAAAAAAAECcAAD8AAAAFAAAAHQAAAAAAAAAQJwAAPwAAAAUAAAAlAAAAAAAAABAnAAA%2FAAAABgAAAAUAAAAAAAAAECcAAD8AAAAGAAAADQAAAAAAAAAQJwAAPwAAAAYAAAAVAAAAAAAAABAnAAA%2FAAAABgAAAB0AAAAAAAAAECcAAD8AAAAGAAAAJQAAAAAAAAAQJwAAQAAAAAMAAABBAAAAAAAAABAnAABAAAAABAAAAEQAAAAAAAAAECcAAEEAAAADAAAAQgAAAAAAAAAQJwAAQQAAAAMAAABDAAAAAQAAABAnAABCAAAAAgAAAEMAAAAAAAAAECcAAEMAAAACAAAAJgAAAAAAAAAQJwAAQwAAAAMAAAAeAAAAAAAAABAnAABDAAAAAwAAACYAAAAAAAAAECcAAEMAAAAEAAAAFgAAAAAAAAAQJwAAQwAAAAQAAAAeAAAAAAAAABAnAABDAAAABAAAACYAAAAAAAAAECcAAEMAAAAFAAAADgAAAAAAAAAQJwAAQwAAAAUAAAAWAAAAAAAAABAnAABDAAAABQAAAB4AAAAAAAAAECcAAEMAAAAFAAAAJgAAAAAAAAAQJwAAQwAAAAYAAAAGAAAAAAAAABAnAABDAAAABgAAAA4AAAAAAAAAECcAAEMAAAAGAAAAFgAAAAAAAAAQJwAAQwAAAAYAAAAeAAAAAAAAABAnAABDAAAABgAAACYAAAAAAAAAECcAAEQAAAADAAAARQAAAAAAAAAQJwAARAAAAAMAAABGAAAAAQAAABAnAABFAAAAAgAAAEYAAAAAAAAAECcAAEYAAAACAAAAJwAAAAAAAAAQJwAARgAAAAMAAAAfAAAAAAAAABAnAABGAAAAAwAAACcAAAAAAAAAECcAAEYAAAAEAAAAFwAAAAAAAAAQJwAARgAAAAQAAAAfAAAAAAAAABAnAABGAAAABAAAACcAAAAAAAAAECcAAEYAAAAFAAAADwAAAAAAAAAQJwAARgAAAAUAAAAXAAAAAAAAABAnAABGAAAABQAAAB8AAAAAAAAAECcAAEYAAAAFAAAAJwAAAAAAAAAQJwAARgAAAAYAAAAHAAAAAAAAABAnAABGAAAABgAAAA8AAAAAAAAAECcAAEYAAAAGAAAAFwAAAAAAAAAQJwAARgAAAAYAAAAfAAAAAAAAABAnAABGAAAABgAAACcAAAAAAAAAECcAAEcAAAAAAAAAKAAAAAAAAAAQJwAARwAAAAAAAABIAAAAAAAAABAnAABHAAAAAQAAACgAAAAAAAAAECcAAEcAAAABAAAASAAAAAEAAAAQJwAACgAAAFNwZWN0cnZtAAAAAAAAAABCYW5kIDEAAAAAAAAAAAAAQmFuZCAyAAAAAAAAAAAAAEJhbmQgMwAAAAAAAAAAAABCYW5kIDQAAAAAAAAAAAAAQmFuZCA1AAAAAAAAAAAAAEJhbmQgNgAAAAAAAAAAAABCYW5kIDcAAAAAAAAAAAAAQmFuZCA4AAAAAAAAAAAAAEF1ZGlvIGluLW91dAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAAFAAAABwAAAAIAAAAEAAAABQAAAAcAAAACAAAABAAAAAUAAAAHAAAAAgAAAAQAAAAFAAAABwAAAAIAAAAEAAAABQAAAAcAAAACAAAABAAAAAUAAAAHAAAAAgAAAAQAAAAFAAAABwAAAAIAAAAFAAAABwAAAAIAAAADAAAABAAAAA)
  - User link [github.com/darosh/zoian/?link=https%3A%2F%2Fpatchstorage.com%2Fapi%2Fbeta%2Fpatches%2F181743%2Ffiles%2F181739%2Fdownload%2F](https://github.com/darosh/zoian/?link=https%3A%2F%2Fpatchstorage.com%2Fapi%2Fbeta%2Fpatches%2F181743%2Ffiles%2F181739%2Fdownload%2F)
- Download shared user .BIN files
- Hotkeys
  - <kbd>N</kbd> Previous patch
  - <kbd>M</kbd> Next patch
  - <kbd>S</kbd> Share patch
  - <kbd>D</kbd> Dark theme
  - <kbd>C</kbd> Show connection
  - <kbd>A</kbd> Animations
  - <kbd>E</kbd> Euroburo layout
  - <kbd>2...6</kbd> Max columns

### Disclaimer

Blocks and their connections may be displayed incorrectly (incorrect blocks and/or their incorrect order, see [./lib/README.md](./lib/README.md) for more information)

## Development

### Prerequisites

- [Deno](https://deno.com/) (v2.1.4 or higher)

### Scripts

#### Install dependencies

```bash
deno task deno:install
```
#### Dev server

```bash
deno task dev
```
#### Build

```bash
deno task build
```
#### Publishing the build to GitHub pages

Rename the build [./dist](./dist) folder to [./doc](./doc) and push to repo.

### Tips

- both /lib and /src app are using [debug](https://www.npmjs.com/package/debug) package, the log can be turned on with ```localStorage.debug='*'```
- disable app context menu (to restore native one) with ```localStorage.menu = false```

## Licence

Released under [GPL v3 license](LICENSE), see also notes about derived work in [./lib/README.md](./lib/README.md).
