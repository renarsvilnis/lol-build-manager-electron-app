# lol-build-manager-electron-app
Cross platform application built with help of Electron framework for the League of Legends build manager


### Issues
Although writing all JavaScript in ES2015 need to write React class with ES5 syntax due to `react-router` dependency as it uses mixins which aren't supported in ES2015 React component classes.


### Developing

**Installing**
```bash
git clone git@github.com:renarsvilnis/lol-build-manager-electron-app.git
cd lol-build-manager-electron-app
npm install
```

**Development**
```bash
# gulp watch that listen to anyfile changes
gulp

# in a another terminal tab
npm run start
```

**Production**
```bash
# Get your development key from developer.riotgames.com
API_KEY="<YOUR_API_KEY>" node_env="production" gulp package
```