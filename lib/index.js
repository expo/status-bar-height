// Based on this ol' library https://github.com/jgkim/react-native-status-bar-size
// This lib is in response to this inquiry: https://forums.expo.io/t/incoming-call-phone-or-skype-or-a-connection-sharing-when-the-app-is-loaded/7086/5
import { NativeEventEmitter, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

class StatusBarHeight {
  static events = {
    // This one returns the next height
    willChange: 'statusBarFrameWillChange',
    // This one seems to report the wrong height - maybe these are swapped on the native side O.o
    didChange: 'statusBarFrameDidChange',
  };

  handlers = {};
  height;
  emitter;

  constructor() {
    // Not checking OS just in case android gets support or shim.
    if (StatusBarManager && StatusBarManager.getHeight) {
      this.emitter = new NativeEventEmitter(StatusBarManager);
      this.getAsync();
    }

    /*
      Support different event configurations
    */
    this.on = this.addListener = this.addEventListener;
    this.off = this.removeListener = this.removeEventListener;
  }

  getAsync = () =>
    new Promise((res, rej) =>
      StatusBarManager.getHeight(({ height }) => {
        this.height = height;
        res(height);
      }),
    );

  getHandlers = type => {
    if (!this.handlers[type]) {
      this.handlers[type] = new Map();
    }
    return this.handlers[type];
  };

  addEventListener = (handler: (height: number) => mixed) => {
    const type = StatusBarHeight.events.willChange;
    this.getHandlers(type).set(
      handler,
      this.emitter.addListener(type, ({ frame: { height } }) => {
        this.height = height;
        handler(height);
      }),
    );
  };

  removeEventListener = (handler: (height: number) => mixed) => {
    const type = StatusBarHeight.events.willChange;
    const handlers = this.getHandlers(type);
    const listener = handlers.get(handler);

    if (listener) {
      listener.remove();
      handlers.delete(handler);
    }
  };
}

// Create a single instance
StatusBarHeight.shared = new StatusBarHeight();
// Export the instance as default
export default StatusBarHeight.shared;

export { StatusBarHeight };
