# lol-build-manager-electron-app
Cross platform application built with help of Electron framework for the League of Legends build manager. *Currently only works for OSX*.


### Challenges faced
TODO: registring a url protocol

Although writing all JavaScript in ES2015 need to write React class with ES5 syntax due to `react-router` dependency as it uses mixins which aren't supported in ES2015 React component classes.

Scrapping data, different naming conventions

### Developing
First things first, get yourself a League of Legends API key from [developer.riotgames.com](developer.riotgames.com).

```bash
# install all dependencies
npm install

# gulp watch that listen to file changes
API_KEY="<YOUR_API_KEY>" gulp

# in a another terminal tab to run the app without building and
# packaging the application
npm run start-app
```

### Testing
![Ain't nobody got time fo dat](http://images.akamai.steamusercontent.com/ugc/548633388689781205/C8FCD52B53C4D81510C5CE4DD8A8856890A714EB/)

But seriously, due to the tight time constraints for now there aren't any tests. Already feeling the pain of not having them.

### Publishing
```bash
API_KEY="<YOUR_API_KEY>" npm run package
```

### TODO
Check [TODO.md](https://github.com/renarsvilnis/lol-build-manager-electron-app/blob/master/TODO.md).