[![NPM](https://nodei.co/npm/@expo/status-bar-height.png)](https://nodei.co/npm/@expo/status-bar-height/)

# @expo/status-bar-height

Listen to status bar changes during incoming calls and other multi-tasking events 💙

### Installation

```bash
yarn add @expo/status-bar-height
```

### Usage

Import the library into your JavaScript file:

```bash
import StatusBarHeight from '@expo/status-bar-height';
```

## Functions

### `StatusBarHeight.addEventListener( (height: number) => {} )`

Given a callback this will be invoked whenever the status bar height changes. The status bar height changes when another app is running a background activity.

* Phone Calls
* Navigating
* Facetime

### `StatusBarHeight.removeEventListener( (height: number) => {} )`

The provided function will stop receiving updates

### `StatusBarHeight.getAsync(): Promise<number>`

Get the current height of the status bar async.

```js
const height = await StatusBarHeight.getAsync();
```
