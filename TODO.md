    
### General
- [ ] windows url protocol
- [ ] build system for packaging app for win and osx
- [x] Check if League of Legends directory legit
- [x] Clear cache function / Reset
- [x] Download item and champion images
- [x] Scrape URL check if supported - same logic across extensions and app
- [?] Buffer that stores one url from specified protocol and parses it when app is ready a.k.a in home screen
- [?] take network status into consideration
- [ ] [automate CDN version update](https://developer.riotgames.com/api/methods#!/968/3325)
- [ ] Check if downloaded image isn't succcesfully downloaded, then do something about it
- [x] Update db search by name to look for enchantments
- [x] Gulp watch node_module by package json
- [ ] Add check for reserved filelist words within `cache.loadBuilds` method with use of `lolConstants.RESERVED_SUFFFIXES` and `champion.key`
- [ ] When fresh installation of League of Legends, there isn't `LOL_ITEM_SET_PATH` yet. Only the path to the `Config` exists

### View Welcome
- [ ] Accardion guide on how it works

### View Builds
- [x] Load existing builds
- [x] Match existing builds with cached data about them
- [ ] Render build sidebar
- [?] Open single build
- [?] Add build through extension
- [?] Add build through app manualy
- [ ] Delete build
- [ ] View build file in explorer or finder
- [ ] Link to author
- [ ] Link to guide
- [ ] Update guide - will promt if has multiple builds related to that guide
- [ ] Reload guide list

```javascript
// open path in finder or explorer
import shell from 'shell';
shell.showItemInFolder(path);
```

### Settings
- [ ] Change directory
- [ ] Change region
- [ ] Force clean app cache and redownload

Maybe add that on settings save it forces the app to [restart](https://github.com/atom/electron/issues/539).

### Design
- [ ] Redesign with cute kittens
- [x] [App icons](http://google.github.io/material-design-icons/#icon-images-for-the-web)
- [ ] Chrome extension store images 
- [ ] Navigation icons
- [ ] Scrollbars

### Future features
- [ ] Handle 3rd party item-set file renames for files that where created through app. *not sure we even need to handle them explicitly*
- [ ] Map specific guides
- [ ] [Autoupdate app](https://github.com/atom/electron/blob/master/docs/api/auto-updater.md)
- [ ] Windows progress when in loader view downlaoding assets
- [ ] Add more website support
- [ ] Better loader messages
- [ ] Map specific builds
- [ ] Global builds
- [ ] Sort build order
- [ ] Consider serverside api requests, thus not exposing api-key  when built
- [ ] Consider serverside webpage scraping
- [ ] Consider Imagesprites