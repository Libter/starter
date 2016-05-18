# Starter - simple to use MC launcher

## How to run (as a user)

1. Download from https://github.com/lvlup-pro/starter/releases/latest
2. Unpack .zip
3. Run starter.exe

## How to run (as a developer)

1. Go to http://nwjs.io/ and download nw.js for linux64 and win32. Version 0.12.3 is tested and it's working.
2. Unpack .zips to nw/linux64 and nw/win32.
3. For windows start run.bat, for linux run.sh
4. PROFIT!!!

## How to build

1. Go to http://nwjs.io/ and download nw.js for linux64 and win32. Version 0.12.3 is tested and it's working.
2. Unpack .zips to nw/linux64 and nw/win32.
3. Run npm install
4. Run build.sh
5. ????
6. PROFIT!!!

dev.sh script helps with autobuild on launcher close, after build launcher is started

## Tasks

### Done
 - online and offline auth
 - all currently available game versions are working fine

### Fixme
 - refresh mojang auth token
 - fix progress bar to show summary of overall process instead of current file process

### Todo
 - forge mods support
 - java JVM parameters set by user
 - java downloader
 - java versions manager
 - autoupdate function