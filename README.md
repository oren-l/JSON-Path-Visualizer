# JSON Path Visualizer

Webapp that enables querying JSON files using jsonpath.\
Uses a webworker to keep main thread from being blocked during query execution.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Using the app

When the app is running the following operations are available:

### Load JSON file

Drag&Drop a json file from your OS onto any part of the app. Yes it's that simple!

### Query a loaded JSON file

Use the text input labeled `Path` under the appbar to input any [jsonpath] to start a new query, a new query will be executed right after you're done typing (300ms debounced delay).

### Aborting a long query

While a query is being executed an abort button will be available under the path input, clicking it will abort the query and show a warning indicating only partial results are being shown.

### Navigating between multiple results

Pagination buttons are available above the results.\
A maximum of 10 results are shown per page.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will [hot-reload] if you make edits.\
State is preserved between [hot-reload]s
so no need to reload the file and re-type the query on each change (Yay!)\
[*Note on hot-reload](#note-on-hot-reload)

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run serve`

Runs a static webserver that serves the build products.\
Used to test the app in production mode.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Currently there are no tests implemented.

### `npm run lint`

Verify code standards using eslint, outputs errors and warnings without any modifications to the source.

### `npm run lint:fix`

The same as `lint` command, only this one modifies the source to try and fix any eslint issues.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Note on hot-reload

### When changes won't hot-reload

* Changes in the worker - unfortunately they are not detected at all by webpack so you'll have to reload manually.
* Changes to files that are not imported by `src/features/App` or `src/store` (recursively) - full page reload will happen in those cases.

Fortunately, most of the app code is imported either by `src/features/App` or `src/store` so you'll have hot-reload available for most changes.


### What state is being preserved

In general, state that resides in mobx models is being preserved.\
Any local state used by react is **NOT** preserved (nor it should).

In finer detail, that parts that are being preserved in mobx models are the snapshots - each model has a `getSnapshot` static method that is responsible to serialize an instance of that model.

When a model file or one of it's imports (recursively) is being changed the app will try to instantiate an updated store using a snapshot of the old store, for most changes this saves the hassle of getting the app to the same state to check changes effects, for the few changes that are not compatible with the old state, you'll have to do full page reload in the worst case scenario.


## Interesting sources for JSON files

[jdorfman/awesome-json-datasets](https://github.com/jdorfman/awesome-json-datasets#movies) is a grate source for fun (BIG) JSON files to explore using this app.

Just use `wget` or whatever you use on you're machine to download them first.

To save you the trouble here are some of them:

* Movies https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json
* Southpark http://api.tvmaze.com/singlesearch/shows?q=south-park&embed=episodes
* Rick and Morty characters https://rickandmortyapi.com/api/character/
* Airline delays in the US https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json

[hot-reload]: https://webpack.js.org/concepts/hot-module-replacement/
[jsonpath]: https://restfulapi.net/json-jsonpath/
