    


### Base
- [ ] windows url protocol
- [ ] build system for getting installations for win and osx
- [x] Check if League of Legends directory legit
- [x] Clear cache function / Reset
- [x] Download item and champion images
- [x] Scrape URL check if supported - same logic across extensions and app
- [ ] ~~Re-download item and champion images~~
- [?] Buffer that stores one url from specified protocol and parses it when app is ready a.k.a in home screen
- [ ] ~~Add gulp-cache for js files~~
- [?] take network status into consideration
- [ ] [automate CDN version update](https://developer.riotgames.com/api/methods#!/968/3325)
- [ ] Check if downloaded image isn't succcesfully downloaded, then do something about it
- [ ] Update db search by name to look for enchantments

### Welcome
- [ ] Accardion guide on how it works

### Builds
- [x] Load existing builds
- [x] Match existing builds with cached data about them
- [ ] Render build sidebar
- [?] Open single build
- [ ] Add build through extension
- [?] Add build through app manualy
- [ ] Delete build
- [ ] View build file in explorer or finder
- [ ] Link to author
- [ ] Link to guide
- [ ] Update guide - will promt if has multiple builds related to that guide
- [ ] Reload guide list

```javascript
import shell from 'shell';
shell.showItemInFolder(path);
```

### Settings
- [ ] Change directory
- [ ] Change region
- [ ] Force redownlaod app
**[Saving forces app restart](https://github.com/atom/electron/issues/539)**

### Design
- [ ] [App icons](http://google.github.io/material-design-icons/#icon-images-for-the-web)
- [ ] Chrome extension store images 
- [ ] Navigation icons
- [ ] Scrollbars

### Extension
- [ ] Fix correct name for pageAction button

### Misc
- [ ] Write about project

### Future features
- [ ] Map specific guides
- [ ] [Autoupdate app](https://github.com/atom/electron/blob/master/docs/api/auto-updater.md)
- [ ] Windows progress when in loader view downlaoding assets
- [ ] Add more website support
- [ ] Better loader messages
- [ ] Map specific builds
- [ ] Global builds
- [ ] Sort build order
- [ ] Add check for reserved filelist words within `cache.loadBuilds` method