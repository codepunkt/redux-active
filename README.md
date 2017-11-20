<img title="redux-active" src="logo/redux-active.png" width="500" style="margin-top:20px;">

[![build status](https://img.shields.io/travis/reactjs/redux/master.svg)](https://travis-ci.org/codepunkt/redux-active)
[![npm version](https://img.shields.io/npm/v/redux-active.svg)](https://www.npmjs.com/package/redux-active)
[![Greenkeeper badge](https://badges.greenkeeper.io/codepunkt/redux-active.svg)](https://greenkeeper.io/)

[Redux](http://github.com/reactjs/redux) middleware & reducer to easily manage your users active/idle state

Tiny footprint: ~*0.5 kB* 

## Install

This has a peer dependency of `redux`, which will have to be installed as well.

```bash
npm install --save redux-active
```

## Setup

First, you must add the middleware to your `redux` store.

```javascript
// store.js

import { createStore, applyMiddleware } from 'redux'
import { createActiveMiddleware } from 'redux-active'
import rootReducer from './rootReducer'

const activeMiddleware = createActiveMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(activeMiddleware)
)
```

Second, add the reducer to the root of your reducer tree.

```javascript
// rootReducer.js

import { combineReducers } from 'redux'
import { activeReducer } from 'redux-active'

export default combineReducers({
  isActive: activeReducer,
})
```

## Usage

With this basic setup, `redux-active` adds event listeners to the window object to detect your users activity. Based on the events being triggered, the middleware dispatches `IS_IDLE` and `IS_ACTIVE` actions, based on which the reducer manages a `isActive` boolean in your state indicating if the user is active or not. 

### Example usecase

Imagine a dashboarding application where dashboards viewed on a large screen can be set to a fullscreen mode. Using the `isActive` flag provided by this module, various controls such as buttons or links could be hidden when the user is inactive whilst in fullscreen mode.

## Options

`createActiveMiddleware` accepts options to fine tune `redux-active` to your needs:

```javascript
import { throttle } from 'lodash'

const activeMiddleware = createActiveMiddleware({
  idleTimeout: 10000,
  stateSelector: state => state.user.isActive,
  throttle,
})
```

Available options are:
  - `eventTarget`<br>The target HTMLElement on which the middleware is listening for events.<br>Default: *window*<br><br>
  - `eventThrottleTimeout`<br>The internal event handler is throttled by this amount of miliseconds.<br>Default: *250*<br><br>
  - `eventTypes`<br>The events that are listened for on the `eventTarget`.<br>Default: *['click', 'focus', 'keydown', 'mousemove', 'resize', 'scroll', 'touchmove', 'wheel']*<br><br>
  - `idleCheckInterval`<br>Interval length for repeated user idle checks in miliseconds.<br>Default: *1000*<br><br>
  - `idleTimeout`<br>Amount of miliseconds before a user is considered idle.<br>Default: *60000*<br><br>
  - `stateSelector`<br>Method that returns the `isActive` boolean when given the state.<br>Default: *state => state.isActive*<br><br>
  - `throttle`<br>Method used to throttle event handlers. When none is given, dynamically requires lodash's throttle implementation.<br>Default: *require('lodash/throttle')*

## Setup troubleshooting

Note that if you are using additional middleware, custom enhancers or initialize the store with an initial state, the `createStore` call might look more like this:

```javascript
import { createStore, compose, applyMiddleware } from 'redux'
import { createActiveMiddleware } from 'redux-active'
import rootReducer from './rootReducer'

const activeMiddleware = createActiveMiddleware()

const store = createStore(
  rootReducer,
  initialState,
  compose(
    otherEnhancer,
    applyMiddleware(activeMiddleware, otherMiddleware)
  )
)
```

If you can't get this to work, be sure to consult the [redux documentation](https://redux.js.org/) and understand the difference between *middleware* and *enhancers* as well as the  API of the `createStore`, `compose` and `applyMiddleware` methods.
