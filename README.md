
> 🚨 This package has been deprecated in favor of [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context/) which works in Expo Go and across iOS, Android, and web!

# [@expo/status-bar-height](https://snack.expo.io/@bacon/status-bar-height-example)

Listen to status bar changes during incoming calls and other multi-tasking events 💙

<img src="https://media.giphy.com/media/xThtarfKCyYcUllFQs/giphy.gif" width="281"  />


Test in a simulator with **(⌘ Y)** to toggle the status bar height.

Snack: https://snack.expo.io/@bacon/status-bar-height-example

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
