# lol-build-manager-electron-app
Cross platform application built with help of Electron framework for the League of Legends build manager


### Challenges
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
# Get your development key from developer.riotgames.com
API_KEY="<YOUR_API_KEY>" gulp

# in a another terminal tab
npm run start
```

**Production**
```bash
# Get your development key from developer.riotgames.com
API_KEY="<YOUR_API_KEY>" node_env="production" gulp package
```


### Tests
![Ain't nobody got time fo dat](http://images.akamai.steamusercontent.com/ugc/548633388689781205/C8FCD52B53C4D81510C5CE4DD8A8856890A714EB/)

But seriously, due to the tight time constraints, didn't have any time to write tests.