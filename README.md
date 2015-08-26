# lol-build-manager-electron-app
Cross platform application built with help of Electron framework for the League of Legends build manager


### Challenges
TODO: registring a url protocol

Although writing all JavaScript in ES2015 need to write React class with ES5 syntax due to `react-router` dependency as it uses mixins which aren't supported in ES2015 React component classes.


### Developing
First things first, get yourself a League of Legends API key from developer.riotgames.com

**Installing**
```bash
git clone git@github.com:renarsvilnis/lol-build-manager-electron-app.git
cd lol-build-manager-electron-app
npm install
```

**Development**
```bash
# gulp watch that listen to anyfile changes
API_KEY="<YOUR_API_KEY>" gulp

# in a another terminal tab to run the app without building
npm run start
```

**Production**
```bash
API_KEY="<YOUR_API_KEY>" npm run package
```


### Tests
![Ain't nobody got time fo dat](http://images.akamai.steamusercontent.com/ugc/548633388689781205/C8FCD52B53C4D81510C5CE4DD8A8856890A714EB/)

But seriously, due to the tight time constraints, didn't have any time to write tests.


### Render tree structure
```txt
.app
    .v_welcome

.app
    .v_home
        .c_nav
        .c_builds
            .c_sidebar
            .c_builds-body

.app
    .v_home
        .c_nav
        .c_build-add

.app
    .v_home
        .c_nav
        .c_settings

```